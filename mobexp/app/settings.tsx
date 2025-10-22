import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.subtitle}>App Configuration</Text>
      <Text style={styles.description}>
        Configure your app preferences here. This is a simplified settings page
        with minimal options for easy navigation.
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
