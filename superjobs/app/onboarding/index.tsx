import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const ONBOARDING_DATA = [
  {
    title: 'SuperJobs!',
    description: 'Only AI powered job search platform that you need in your next job search.',
    image: 'https://images.unsplash.com/photo-1549692520-acc6669e2f0c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    title: 'Win over ATS!',
    description: 'Get instant feedback and optimization tips from our AI to make your resume stand out.',
    image: 'https://plus.unsplash.com/premium_photo-1661288470388-c5006797bdff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    title: 'Daily Jobs Feed!',
    description: 'AI-driven job search engine that gets you the best jobs up to date.',
    image: 'https://images.unsplash.com/photo-1508780709619-79562169bc64?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    title: 'Apply in One Click!',
    description: 'Use AI to auto-fill applications and boost your chances of getting hired faster.',
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2400&auto=format&fit=crop',
  },
];

const OnboardingScreen = () => {
  const scrollRef = useRef<Animated.ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const translateX = useSharedValue(0);
  const insets = useSafeAreaInsets();

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      translateX.value = event.contentOffset.x;
    },
  });

  const onMomentumScrollEnd = useCallback((event: any) => {
    const newIndex = Math.round(event.nativeEvent.contentOffset.x / SCREEN_WIDTH);
    setCurrentIndex(newIndex);
  }, []);

  const renderItem = (item: typeof ONBOARDING_DATA[0], index: number) => {
    const inputRange = [
      (index - 1) * SCREEN_WIDTH,
      index * SCREEN_WIDTH,
      (index + 1) * SCREEN_WIDTH,
    ];

    const animatedStyle = useAnimatedStyle(() => {
      const scale = interpolate(
        translateX.value,
        inputRange,
        [0.8, 1, 0.8],
      );

      const opacity = interpolate(
        translateX.value,
        inputRange,
        [0.4, 1, 0.4],
      );

      return {
        transform: [{ scale: withSpring(scale) }],
        opacity: withSpring(opacity),
      };
    });

    return (
      <View key={index} style={[styles.slide]}>
        <Animated.View style={[styles.imageContainer, animatedStyle]}>
          <Image
            source={{ uri: item.image }}
            style={styles.image}
            resizeMode="cover"
          />
          <LinearGradient
            colors={['rgba(0,0,0,0.3)', 'transparent']}
            style={StyleSheet.absoluteFill}
          />
        </Animated.View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </View>
    );
  };

  const renderDots = () => {
    return (
      <View style={styles.pagination}>
        {ONBOARDING_DATA.map((_, index) => {
          const animatedDotStyle = useAnimatedStyle(() => {
            const width = interpolate(
              translateX.value,
              [(index - 1) * SCREEN_WIDTH, index * SCREEN_WIDTH, (index + 1) * SCREEN_WIDTH],
              [8, 20, 8],
            );

            const opacity = interpolate(
              translateX.value,
              [(index - 1) * SCREEN_WIDTH, index * SCREEN_WIDTH, (index + 1) * SCREEN_WIDTH],
              [0.5, 1, 0.5],
            );

            return {
              width: withSpring(width),
              opacity: withSpring(opacity),
            };
          });

          return (
            <Animated.View
              key={index}
              style={[styles.dot, animatedDotStyle]}
            />
          );
        })}
      </View>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar style="light" />
      <Animated.ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        onMomentumScrollEnd={onMomentumScrollEnd}
      >
        {ONBOARDING_DATA.map(renderItem)}
      </Animated.ScrollView>

      {renderDots()}

      <View style={[styles.bottomContainer, { paddingBottom: insets.bottom + 20 }]}>
        {currentIndex < ONBOARDING_DATA.length - 1 ? (
          <>
            <Link href="/main" asChild>
              <TouchableOpacity style={styles.skipButton}>
                <Text style={styles.skipText}>Skip</Text>
              </TouchableOpacity>
            </Link>
            <TouchableOpacity
              style={styles.nextButton}
              onPress={() => {
                const nextIndex = currentIndex + 1;
                scrollRef.current?.scrollTo({
                  x: nextIndex * SCREEN_WIDTH,
                  animated: true,
                });
                setCurrentIndex(nextIndex);
              }}
            >
              <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Link href="/main" asChild>
            <TouchableOpacity style={styles.getStartedButton}>
              <Text style={styles.getStartedText}>Get Started</Text>
            </TouchableOpacity>
          </Link>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  slide: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.6,
    position: 'absolute',
    top: 0,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    position: 'absolute',
    bottom: SCREEN_HEIGHT * 0.25,
    left: 0,
    right: 0,
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 24,
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 120,
    alignSelf: 'center',
    gap: 8,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skipButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  skipText: {
    color: '#fff',
    fontSize: 16,
    opacity: 0.8,
  },
  nextButton: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 24,
  },
  nextButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
  getStartedButton: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 24,
    marginHorizontal:'auto',
  },
  getStartedText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default OnboardingScreen;