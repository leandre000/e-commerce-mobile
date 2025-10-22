import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ProductsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Products</Text>
      <Text style={styles.subtitle}>Browse our simple products</Text>
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
    fontSize: 16,
  },
});
