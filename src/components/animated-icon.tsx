import { Image } from 'expo-image';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { Easing, Keyframe, useSharedValue, useAnimatedStyle, withTiming, withDelay } from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import { LinearGradient } from 'expo-linear-gradient';

export function AnimatedSplashOverlay() {
  const [visible, setVisible] = useState(true);
  const opacity = useSharedValue(1);
  const scale = useSharedValue(0.9);

  useEffect(() => {
    // Run entrance animation
    scale.value = withTiming(1, { duration: 1000, easing: Easing.out(Easing.exp) });
    
    // Hold for 2 seconds, then fade out
    setTimeout(() => {
      opacity.value = withTiming(0, { duration: 600, easing: Easing.inOut(Easing.ease) }, (finished) => {
        if (finished) {
          scheduleOnRN(setVisible, false);
        }
      });
    }, 2000);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const logoStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  if (!visible) return null;

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      {/* Ambient Mesh Background */}
      <View style={StyleSheet.absoluteFill}>
        <LinearGradient
          colors={['rgba(69, 224, 232, 0.15)', 'transparent']}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 500 }}
        />
        <LinearGradient
          colors={['transparent', 'rgba(0, 196, 204, 0.1)']}
          style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 500 }}
        />
      </View>

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Animated.View style={[{ alignItems: 'center' }, logoStyle]}>
          <View style={{ position: 'relative', alignItems: 'center', justifyContent: 'center', marginBottom: 32 }}>
            <View style={{ position: 'absolute', width: 120, height: 120, backgroundColor: 'rgba(69, 224, 232, 0.2)', borderRadius: 60, shadowColor: '#45e0e8', shadowOpacity: 0.5, shadowRadius: 40 }} />
            <Image 
              source={require('@/assets/images/rkispro-logo.svg')} // Ensure this exists, or use a text fallback if missing
              style={{ width: 100, height: 100 }}
              contentFit="contain"
            />
          </View>
          
          <Text style={{ fontFamily: 'PlusJakartaSans_700Bold', fontSize: 28, color: '#cce6f7', letterSpacing: -0.5, marginBottom: 8 }}>
            Build Smarter. Source Faster.
          </Text>
          <Text style={{ fontFamily: 'Inter_500Medium', fontSize: 12, color: '#bbc9ca', textTransform: 'uppercase', letterSpacing: 2, opacity: 0.6 }}>
            Enterprise Marketplace
          </Text>
        </Animated.View>
      </View>

      <View style={{ paddingBottom: 64, alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', opacity: 0.4, marginBottom: 8 }}>
          <Text style={{ fontSize: 14, marginRight: 4 }}>🛡️</Text>
          <Text style={{ fontFamily: 'Inter_500Medium', fontSize: 11, color: '#bbc9ca' }}>Secure B2B Environment</Text>
        </View>
        <Text style={{ fontFamily: 'Inter_500Medium', fontSize: 11, color: '#bbc9ca', opacity: 0.3 }}>v2.4.0-stable</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill as any,
    backgroundColor: '#001620',
    zIndex: 1000,
  },
});
