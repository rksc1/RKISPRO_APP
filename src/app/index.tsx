import { useEffect } from 'react';
import { View } from 'react-native';
import { router } from 'expo-router';
import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { useAuth } from '@/providers/AuthProvider';

export default function RootIndex() {
  const { session, isLoading } = useAuth();

  useEffect(() => {
    // Wait for the splash screen animation to finish (approx 2.5s)
    const timer = setTimeout(() => {
      if (!isLoading) {
        if (session) {
          router.replace('/(tabs)');
        } else {
          router.replace('/(auth)/login');
        }
      }
    }, 2600);

    return () => clearTimeout(timer);
  }, [session, isLoading]);

  return (
    <View style={{ flex: 1, backgroundColor: '#001620' }}>
      <AnimatedSplashOverlay />
    </View>
  );
}
