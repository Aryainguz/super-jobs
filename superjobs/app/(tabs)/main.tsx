// MainScreen.tsx
import React, { useState } from 'react';
import { Dimensions, Image, ImageBackground, Linking, StyleSheet, Text, View } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

interface Job {
  id: number;
  title: string;
  company: string;
  description: string;
  logo: string;
  backgroundImage: string;
  website: string;
}

const dummyJobs: Job[] = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    company: 'Innovative Solutions Inc.',
    description: 'Design and implement cutting-edge web applications using React.',
    logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    backgroundImage: 'https://images.unsplash.com/photo-1574100004472-e536d3b6bacc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    website: 'https://example.com/frontend-job',
  },
  {
    id: 2,
    title: 'Backend Engineer',
    company: 'Tech Enterprise',
    description: 'Develop and maintain robust APIs using Node.js and Express.',
    logo: 'https://images.unsplash.com/photo-1496200186974-4293800e2c20?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    backgroundImage: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    website: 'https://example.com/backend-job',
  },
  {
    id: 3,
    title: 'UI/UX Designer',
    company: 'Creative Minds',
    description: 'Craft user-centric designs for mobile and web applications.',
    logo: 'https://plus.unsplash.com/premium_photo-1675083923190-387d05e8fe12?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    backgroundImage: 'https://images.unsplash.com/photo-1668554245893-2430d0077217?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    website: 'https://example.com/uiux-job',
  },
];

const MainScreen: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>(dummyJobs);

  const onSwipedRight = (cardIndex: number) => {
    const job = jobs[cardIndex];
    Toast.show({
      type: 'success',
      text1: 'Liked!',
      text2: `Opening ${job.title} job listing at ${job.company}`,
      position: 'top',
      topOffset: 70,
      visibilityTime: 1500,
    });
    Linking.openURL(job.website).catch(err =>
      console.error('Failed to open URL:', err)
    );
    console.log(`Liked: ${job.title} at ${job.company}`);
  };

  const onSwipedLeft = (cardIndex: number) => {
    const job = jobs[cardIndex];
    Toast.show({
      type: 'error',
      text1: 'Nope!',
      text2: `${job.title} at ${job.company}`,
      position: 'top',
      topOffset: 70,
      visibilityTime: 1500,
    });
    console.log(`Nope: ${job.title} at ${job.company}`);
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>
          Super <Text style={styles.headerHighlight}>Jobs.</Text>
        </Text>
        <Text style={styles.instruction}>
          Swipe right to apply | Swipe left to pass
        </Text>
      </View>
      <View style={styles.swiperContainer}>
        {jobs.length > 0 ? (
          <Swiper
            cards={jobs}
            renderCard={(job: Job) => (
              <ImageBackground
                source={{ uri: job.backgroundImage }}
                style={styles.card}
                imageStyle={styles.cardImage}
              >
                <View style={styles.overlay} />
                <View style={styles.cardContent}>
                  <Image source={{ uri: job.logo }} style={styles.logo} />
                  <Text style={styles.jobTitle}>{job.title}</Text>
                  <Text style={styles.company}>{job.company}</Text>
                  <Text style={styles.description}>{job.description}</Text>
                </View>
              </ImageBackground>
            )}
            onSwipedRight={onSwipedRight}
            onSwipedLeft={onSwipedLeft}
            onSwipedAll={() => setJobs([])}
            cardIndex={0}
            backgroundColor="transparent"
            stackSize={3}
            overlayLabels={{
              left: {
                title: 'NOPE',
                style: {
                  label: {
                    backgroundColor: 'transparent',
                    borderColor: '#ff3b30',
                    borderWidth: 4,
                    color: '#ff3b30',
                    fontSize: 40,
                    fontWeight: '900',
                  },
                  wrapper: {
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    justifyContent: 'flex-start',
                    marginTop: 30,
                    marginRight: 30,
                  },
                },
              },
              right: {
                title: 'LIKE',
                style: {
                  label: {
                    backgroundColor: 'transparent',
                    borderColor: '#4cd964',
                    borderWidth: 4,
                    color: '#4cd964',
                    fontSize: 40,
                    fontWeight: '900',
                  },
                  wrapper: {
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    marginTop: 30,
                    marginLeft: 30,
                  },
                },
              },
            }}
            animateOverlayLabelsOpacity
            animateCardOpacity
            disableTopSwipe
            disableBottomSwipe
          />
        ) : (
          <View style={styles.defaultBanner}>
            <Text style={styles.defaultText}>No job listings available.</Text>
          </View>
        )}
      </View>
      <Toast topOffset={70} position="top" />
    </SafeAreaView>
  );
};

export default MainScreen;

const { width, height } = Dimensions.get('window');
const CARD_WIDTH = width * 0.9;
const CARD_HEIGHT = height * 0.6;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  headerContainer: {
    marginTop: height * 0.04,
    alignItems: 'center',
    marginBottom: 20,
  },
  header: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  headerHighlight: {
    color: '#8A2BE2', // Purple color for "Jobs."
  },
  instruction: {
    color: '#ccc',
    fontSize: 16,
    marginTop: 5,
  },
  swiperContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  cardImage: {
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  cardContent: {
    padding: 20,
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#fff',
    marginBottom: 15,
  },
  jobTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
  },
  company: {
    fontSize: 22,
    color: '#bbb',
    marginBottom: 12,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    lineHeight: 22,
  },
  defaultBanner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  defaultText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  },
});