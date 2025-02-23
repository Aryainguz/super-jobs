import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, StyleProp, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp, withSpring } from 'react-native-reanimated';

type BentoBoxProps = {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  description: string;
  gradientColors: [string, string, ...string[]];
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const BentoBox = ({ title, icon, description, gradientColors, onPress, style }: BentoBoxProps) => {
  return (
    <AnimatedPressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.bentoBox,
        style,
        { transform: [{ scale: withSpring(pressed ? 0.98 : 1) }] }
      ]}
      entering={FadeInUp.delay(200)}
    >
      <LinearGradient
        colors={gradientColors}
        style={[StyleSheet.absoluteFill, { borderRadius: 32 }]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <Ionicons name={icon} size={32} color="#fff" style={styles.boxIcon} />
      <Text style={styles.boxTitle}>{title}</Text>
      <Text style={styles.boxDescription}>{description}</Text>
    </AnimatedPressable>
  );
};

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView 
      style={[styles.container, { paddingTop: insets.top }]}
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <Text style={styles.greeting}>Welcome back!</Text>
        <Text style={styles.subtitle}>Let's boost your career today</Text>
      </View>

      <View style={styles.statsSection}>
        <View style={styles.statsGrid}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>24</Text>
            <Text style={styles.statLabel}>Applied</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>8</Text>
            <Text style={styles.statLabel}>Interviews</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>92%</Text>
            <Text style={styles.statLabel}>ATS Score</Text>
          </View>
        </View>
      </View>

      <View style={styles.bentoGrid}>
        <BentoBox
          title="ATS Checker"
          icon="document-text"
          description="Check how well your resume scores"
          gradientColors={['#4C6FFF', '#6B8CFF']}
          onPress={() => {}}
          style={[styles.fullWidthBento, { marginBottom: 16 }]}
        />
        <BentoBox
          title="Build Resume"
          icon="create"
          description="Create an ATS-optimized resume"
          gradientColors={['#FF4C83', '#FF6B9C']}
          onPress={() => {}}
          style={[styles.fullWidthBento, { marginBottom: 16 }]}
        />
        <BentoBox
          title="Upgrade to Premium"
          icon="star"
          description="Get unlimited access to all features"
          gradientColors={['#7C4CFF', '#9B6BFF']}
          onPress={() => {}}
          style={styles.fullWidthBento}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  content: {
    padding: 20,
  },
  header: {
    marginBottom: 24,
  },
  greeting: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#ccc',
  },
  statsSection: {
    marginTop: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statBox: {
    flex: 1,
    backgroundColor: '#111',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#ccc',
  },
  bentoGrid: {
    marginTop: 24,
    gap: 16,
  },
  fullWidthBento: {
    width: '100%',
    height: 250,
  },
  bentoBox: {
    borderRadius: 32,
    padding: 32,
    height: '100%',
    width: '100%',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    overflow: 'hidden',
    // iOS shadow
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    // Android elevation
    elevation: 8,
  },
  boxIcon: {
    marginBottom: 16,
    paddingHorizontal: 10,
    paddingTop: 8,
  },
  boxTitle: {
    fontSize: 20,
    paddingHorizontal: 8,
    paddingTop: 4,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  boxDescription: {
    fontSize: 14,
    paddingTop: 8,
    paddingHorizontal: 10,
    paddingBottom: 16,
    color: '#fff',
    opacity: 0.8,
  },
});