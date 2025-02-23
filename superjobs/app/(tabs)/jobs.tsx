import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable, ScrollView, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp, withSpring } from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const JOBS = [
  {
    id: '1',
    title: 'Senior React Native Developer',
    company: 'TechCorp',
    location: 'Remote',
    salary: '$120k - $150k',
    logo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&h=100&fit=crop',
  },
  {
    id: '2',
    title: 'Full Stack Engineer',
    company: 'StartupX',
    location: 'San Francisco, CA',
    salary: '$130k - $160k',
    logo: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=100&h=100&fit=crop',
  },
  {
    id: '3',
    title: 'Product Designer',
    company: 'DesignLabs',
    location: 'New York, NY',
    salary: '$90k - $120k',
    logo: 'https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?w=100&h=100&fit=crop',
  },
  {
    id: '4',
    title: 'Senior Software Engineer',
    company: 'TechCorp',
    location: 'Remote',
    salary: '$140k - $170k',
    logo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&h=100&fit=crop',
  },
  {
    id: '5',
    title: 'Product Manager',
    company: 'StartupX',
    location: 'San Francisco, CA',
    salary: '$120k - $150k',
    logo: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=100&h=100&fit=crop',
  },
  {
    id: '6',
    title: 'UI/UX Designer',
    company: 'DesignLabs',
    location: 'New York, NY',
    salary: '$90k - $120k',
    logo: 'https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?w=100&h=100&fit=crop',
  },
];

const JobCard = ({ job, index }: { job: typeof JOBS[0]; index: number }) => {
  return (
    <AnimatedPressable
      style={({ pressed }) => [
        styles.jobCard,
        { transform: [{ scale: withSpring(pressed ? 0.98 : 1) }] },
      ]}
      entering={FadeInUp.delay(index * 100)}
    >
      {/* Inner container with white background */}
      <View style={styles.cardContent}>
        {/* Top Row: Logo, Job Info, and Apply Button */}
        <View style={styles.topRow}>
          <Image source={{ uri: job.logo }} style={styles.companyLogo} />
          <View style={styles.jobInfo}>
            <Text style={styles.jobTitle}>{job.title}</Text>
            <Text style={styles.companyName}>{job.company}</Text>
          </View>
          <Pressable style={styles.applyButton}>
            <Text style={styles.applyButtonText}>Apply</Text>
          </Pressable>
        </View>
        {/* Bottom Row: Meta Information */}
        <View style={styles.jobMeta}>
          <View style={styles.metaItem}>
            <Ionicons name="location" size={14} color="#777" />
            <Text style={styles.metaText}>{job.location}</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="cash" size={14} color="#777" />
            <Text style={styles.metaText}>{job.salary}</Text>
          </View>
        </View>
      </View>
    </AnimatedPressable>
  );
};

const FilterChip = ({ label, active, onPress }: { 
  label: string;
  active: boolean;
  onPress: () => void;
}) => (
  <Pressable
    style={[styles.filterChip, active && styles.activeFilterChip]}
    onPress={onPress}
  >
    <Text style={[styles.filterChipText, active && styles.activeFilterChipText]}>
      {label}
    </Text>
  </Pressable>
);

export default function JobsScreen() {
  const insets = useSafeAreaInsets();
  const [activeFilter, setActiveFilter] = useState('All');

  const handleFilterButtonPress = () => {
    Alert.alert('Filter Button Pressed', 'Filter button pressed');
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Find Your Next Role</Text>
        <Pressable style={styles.filterButton} onPress={handleFilterButtonPress}>
          <Ionicons name="options" size={24} color="#fff" />
        </Pressable>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtersContainer}
        contentContainerStyle={styles.filters}
      >
        {['All', 'Remote', 'Full-time', 'Contract', 'Part-time'].map((filter) => (
          <FilterChip
            key={filter}
            label={filter}
            active={activeFilter === filter}
            onPress={() => setActiveFilter(filter)}
          />
        ))}
      </ScrollView>

      <ScrollView style={styles.jobsList} contentContainerStyle={styles.jobsListContent}>
        {JOBS.map((job, index) => (
          <JobCard key={job.id} job={job} index={index} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Overall dark background for contrast
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filtersContainer: {
    maxHeight: 50,
  },
  filters: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
  },
  activeFilterChip: {
    backgroundColor: '#4C6FFF',
  },
  filterChipText: {
    color: '#555',
    fontSize: 14,
    fontWeight: '600',
  },
  activeFilterChipText: {
    color: '#fff',
  },
  jobsList: {
    flex: 1,
  },
  jobsListContent: {
    padding: 20,
    gap: 18,
  },
  jobCard: {
    marginBottom: 16,
  },
  cardContent: {
    backgroundColor: '#fff', // White card background
    borderRadius: 24, // Smooth, modern curves
    paddingVertical: 16,
    paddingHorizontal: 16, // Symmetric padding
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  companyLogo: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  jobInfo: {
    flex: 1,
    marginHorizontal: 16,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  companyName: {
    fontSize: 14,
    color: '#777',
    marginTop: 4,
  },
  applyButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#4C6FFF',
    borderRadius: 20,
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  jobMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  metaText: {
    fontSize: 12,
    color: '#777',
    marginLeft: 4,
  },
});
