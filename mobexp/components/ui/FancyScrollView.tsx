import React, { useCallback, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import * as Haptics from "expo-haptics";
import { useCart } from "@/context/CartContext";
import { useRouter } from "expo-router";

export default function FancyScrollView() {
  const cart = useCart();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  // Simplified items - only 3 items
  const [items] = useState([
    {
      id: "item-1",
      title: "Simple Item 1",
      subtitle: "Basic product",
      price: "$10",
    },
    {
      id: "item-2",
      title: "Simple Item 2",
      subtitle: "Basic product",
      price: "$15",
    },
    {
      id: "item-3",
      title: "Simple Item 3",
      subtitle: "Basic product",
      price: "$20",
    },
  ]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Simple Store</Text>
          <Text style={styles.headerSubtitle}>Minimal products, maximum value</Text>
        </View>

        {/* Items List */}
        <View style={styles.itemsContainer}>
          {items.map((item) => {
            const cartItem = cart.items.find((c) => c.id === item.id);
            return (
              <View key={item.id} style={styles.itemCard}>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
                  <Text style={styles.itemPrice}>{item.price}</Text>
                </View>

                {!cartItem ? (
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                      cart.add(item.id, item.title);
                    }}
                  >
                    <Text style={styles.addButtonText}>Add to Cart</Text>
                  </TouchableOpacity>
                ) : (
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => {
                        Haptics.selectionAsync();
                        cart.dec(item.id);
                      }}
                    >
                      <Text style={styles.quantityButtonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{cartItem.qty}</Text>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => {
                        Haptics.selectionAsync();
                        cart.inc(item.id);
                      }}
                    >
                      <Text style={styles.quantityButtonText}>+</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            );
          })}
        </View>

        {/* Cart Summary */}
        {cart.items.length > 0 && (
          <TouchableOpacity
            style={styles.cartButton}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              router.push('/cart');
            }}
          >
            <Text style={styles.cartButtonText}>
              View Cart ({cart.count} items)
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    marginBottom: 24,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#ccc",
  },
  itemsContainer: {
    gap: 16,
  },
  itemCard: {
    backgroundColor: "#111",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#333",
  },
  itemInfo: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  itemSubtitle: {
    fontSize: 14,
    color: "#999",
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  addButton: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 14,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  quantityButton: {
    width: 32,
    height: 32,
    backgroundColor: "#333",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  quantityButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  quantityText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    minWidth: 24,
    textAlign: "center",
  },
  cartButton: {
    backgroundColor: "#fff",
    marginTop: 24,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  cartButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
});
