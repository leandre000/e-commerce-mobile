import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About</Text>
      <Text style={styles.subtitle}>Simple Shopping App</Text>
      <Text style={styles.description}>
        A minimal shopping application with drawer and tab navigation.
        Features include cart management and simple product browsing.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 16,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    color: '#ccc',
    fontSize: 18,
    marginBottom: 16,
  },
  description: {
    color: '#999',
    fontSize: 16,
    lineHeight: 24,
  },
});
