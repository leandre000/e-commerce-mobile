import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useRouter } from 'expo-router';

export default function SplashScreen() {
  const router = useRouter();
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.8);

  useEffect(() => {
    // Fade in and scale animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();

    // Navigate to login after 3 seconds
    const timer = setTimeout(() => {
      router.replace('/login');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Text style={styles.appName}>Simple Store</Text>
        <Text style={styles.tagline}>Shop Smart, Live Simple</Text>
        <View style={styles.divider} />
        <Text style={styles.welcome}>Welcome</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
  },
  appName: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
    letterSpacing: 1,
  },
  tagline: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 24,
  },
  divider: {
    width: 60,
    height: 2,
    backgroundColor: '#fff',
    marginBottom: 24,
  },
  welcome: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '600',
  },
});
