import { useSafeAreaInsets } from 'react-native-safe-area-context';
import OnboardingScreen from './onboarding';

export default function Index() {
  const insets = useSafeAreaInsets();

  return (
   <OnboardingScreen/>
  );
}
