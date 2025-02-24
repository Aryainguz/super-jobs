import { Hono } from "hono";
import axios from "axios";
import * as cheerio from "cheerio";

// Define your TypeScript interfaces
interface job {
  id: number;
  name: string;
  link: string;
  description: string;
  company: string;
  location: string;
  datePosted: string;
  // additional fields can be added here (e.g., salary, skills, etc.)
}

interface site {
  name: string;
  link: string;
  jobsLink: string;
  location: string; // CSS selector to extract job link/title on the search page
  jobs: job[];
}

// Helper to normalize job fields; if a field is empty, replace it with "N/A"
function normalizeJob(jobData: job): job {
  return {
    ...jobData,
    company: jobData.company.trim() ? jobData.company : "N/A",
    location: jobData.location.trim() ? jobData.location : "N/A",
    datePosted: jobData.datePosted.trim() ? jobData.datePosted : "N/A"
  };
}

// Helper: Scrape job details from Hire Lebanese
async function scrapeHireLebaneseJob(link: string, id: number): Promise<job> {
  try {
    const { data } = await axios.get(link);
    const $ = cheerio.load(data);
    const name = $("div.col-sm-12 > h3 > span.h2").text().trim();
    const description = $("div.white-div > div.padding-top > div.col-sm-12 > #description").text().trim();
    const company = $("#company").text().trim();
    const location = $("#location").text().trim();
    const datePosted = $("#date").text().trim();
    return normalizeJob({ id, name, link, description, company, location, datePosted });
  } catch (error) {
    console.error(`Error scraping Hire Lebanese job at ${link}:`, error);
    throw error;
  }
}

// Helper: Scrape job details from Bayt
async function scrapeBaytJob(link: string, id: number): Promise<job> {
  try {
    const { data } = await axios.get(link);
    const $ = cheerio.load(data);
    const name = $("div.media-d > div > div > h1.h3").text().trim();
    const description = $("div.t-break > p").text().trim();
    const company = $("div.p0 > ul.p0t > li > a.t-default").text().trim();
    let location = "";
    $("div > ul > li > span > a.t-mute").each((_:any, el:any) => {
      location += $(el).text().trim() + " ";
    });
    const datePosted = $("div.m10y > span.u-none").text().trim();
    return normalizeJob({ id, name, link, description, company, location: location.trim(), datePosted });
  } catch (error) {
    console.error(`Error scraping Bayt job at ${link}:`, error);
    throw error;
  }
}

// Site configurations – update selectors as needed
const sitesData: site[] = [
  {
    name: "Hire Lebanese",
    link: "https://hirelebanese.com/",
    jobsLink:
      "https://hirelebanese.com/searchresults.aspx?order=date&keywords=#&category=&type=&duration=&country=117,241,258,259,260&state=&city=&emp=&pg=1&s=-1&top=0",
    location: "div.panel-title > h4 > a",
    jobs: []
  },
  {
    name: "Bayt",
    link: "https://www.bayt.com",
    jobsLink: "https://www.bayt.com/en/lebanon/jobs/",
    location: "div > ul > li > div > h2 > a",
    jobs: []
  }
];

// Aggregate job postings for a default job title (here "software developer")
async function getLatestJobs(): Promise<job[]> {
  const defaultTitle = "software developer";
  let aggregatedJobs: job[] = [];
  let jobsCounter = 0;

  for (const site of sitesData) {
    let jobLinks: string[] = [];

    // Build search URL and collect job links for the given title
    for (const title of [defaultTitle]) {
      let searchLink = "";
      switch (site.name) {
        case "Hire Lebanese":
          searchLink = site.jobsLink.replace("#", title);
          break;
        case "Bayt":
          searchLink = site.jobsLink + title.replace(/\s+/g, "-") + "-jobs";
          break;
      }
      try {
        const { data } = await axios.get(searchLink);
        const $ = cheerio.load(data);
        $(site.location).each((_:any, el:any) => {
          const link = $(el).attr("href");
          if (link) {
            const fullLink = site.link + link;
            if (!jobLinks.includes(fullLink)) {
              jobLinks.push(fullLink);
            }
          }
        });
      } catch (error) {
        console.error(`Error fetching search page for ${site.name} with title "${title}":`, error);
      }
    }

    // Fetch individual job details in parallel using Promise.all
    const detailPromises: Promise<job>[] = jobLinks.map((link) => {
      const currentId = jobsCounter++;
      if (site.name === "Bayt") {
        return scrapeBaytJob(link, currentId);
      } else if (site.name === "Hire Lebanese") {
        return scrapeHireLebaneseJob(link, currentId);
      } else {
        return Promise.reject(new Error(`No scraper defined for site ${site.name}`));
      }
    });

    try {
      const siteJobs = await Promise.all(detailPromises);
      aggregatedJobs = aggregatedJobs.concat(siteJobs);
    } catch (error) {
      console.error(`Error fetching job details for ${site.name}:`, error);
    }
  }
  return aggregatedJobs;
}

const app = new Hono();

// GET /jobs route returns the latest scraped jobs as JSON
app.get("/jobs", async (c) => {
  try {
    const jobs = await getLatestJobs();
    return c.json(jobs);
  } catch (error: any) {
    console.error("Error in GET /jobs:", error);
    return c.json({ error: error.message }, 500);
  }
});

export default app