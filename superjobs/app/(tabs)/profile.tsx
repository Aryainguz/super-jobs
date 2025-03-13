import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, {
  FadeInDown,
  withSpring,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const StatCard = ({ icon, value, label }: {
  icon: keyof typeof Ionicons.glyphMap;
  value: string;
  label: string;
}) => (
  <AnimatedPressable
    style={({ pressed }) => [
      styles.statCard,
      { transform: [{ scale: withSpring(pressed ? 0.98 : 1) }] }
    ]}
    entering={FadeInDown.delay(200)}
  >
    <Ionicons name={icon} size={24} color="#4C6FFF" />
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </AnimatedPressable>
);

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <Link href="/jobs" asChild style={styles.headerButton}>
        <Pressable style={styles.headerButton}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </Pressable>
        </Link>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <Animated.View
            style={styles.avatarContainer}
            entering={FadeInDown.delay(100)}
          >
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop' }}
              style={styles.avatar}
            />
            <Pressable style={styles.editAvatarButton}>
              <Ionicons name="camera" size={20} color="#fff" />
            </Pressable>
          </Animated.View>
          <Animated.Text
            style={styles.name}
            entering={FadeInDown.delay(200)}
          >
            Sarah Johnson
          </Animated.Text>
          <Animated.Text
            style={styles.jobTitle}
            entering={FadeInDown.delay(300)}
          >
            Senior Product Designer
          </Animated.Text>
          <Animated.View
            style={styles.locationContainer}
            entering={FadeInDown.delay(400)}
          >
            <Ionicons name="location" size={16} color="#999" />
            <Text style={styles.location}>San Francisco, CA</Text>
          </Animated.View>
        </View>

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <StatCard
            icon="briefcase"
            value="24"
            label="Applications"
          />
          <StatCard
            icon="people"
            value="8"
            label="Interviews"
          />
          <StatCard
            icon="trending-up"
            value="92%"
            label="ATS Score"
          />
        </View>

        {/* Bio Section */}
        {/* <Animated.View
          style={styles.bioCard}
          entering={FadeInDown.delay(500)}
        >
          <View style={styles.bioHeader}>
            <Text style={styles.bioTitle}>About Me</Text>
            <Pressable style={styles.editButton}>
              <Ionicons name="pencil" size={16} color="#4C6FFF" />
              <Text style={styles.editButtonText}>Edit</Text>
            </Pressable>
          </View>
          <Text style={styles.bioText}>
            Passionate product designer with 8+ years of experience in creating user-centered digital experiences. Specialized in mobile app design and design systems.
          </Text>
        </Animated.View> */}

        {/* Resume Section */}
        <Animated.View
          style={styles.resumeCard}
          entering={FadeInDown.delay(600)}
        >
          <View style={styles.resumeContent}>
            <View style={styles.resumeIcon}>
              <Ionicons name="document-text" size={32} color="#4C6FFF" />
            </View>
            <View style={styles.resumeInfo}>
              <Text style={styles.resumeTitle}>My Resume</Text>
              <Text style={styles.resumeSubtitle}>Aryan_Resume.pdf</Text>
            </View>
          </View>
          <Pressable style={styles.viewResumeButton}>
            <Text style={styles.viewResumeButtonText}>View Resume</Text>

          </Pressable>
          <Pressable style={styles.viewResumeButton}>
            <Text style={styles.viewResumeButtonText}>Update Resume</Text>

          </Pressable>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#4C6FFF',
  },
  editAvatarButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#4C6FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  jobTitle: {
    fontSize: 16,
    color: '#999',
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  location: {
    fontSize: 14,
    color: '#999',
  },
  statsSection: {
    flexDirection: 'row',
    margin:"auto",
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 16,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  bioCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 20,
    marginBottom: 24,
  },
  bioHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  bioTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  editButtonText: {
    fontSize: 14,
    color: '#4C6FFF',
    fontWeight: '600',
  },
  bioText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  resumeCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 20,
  },
  resumeContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  resumeIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(76, 111, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  resumeInfo: {
    flex: 1,
  },
  resumeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  resumeSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  viewResumeButton: {
    marginVertical: 12,
    backgroundColor: '#4C6FFF',
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: 'center',
  },
  viewResumeButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});