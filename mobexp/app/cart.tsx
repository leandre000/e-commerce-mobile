import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import * as Haptics from 'expo-haptics';
import { useCart } from '@/context/CartContext';

export default function CartScreen() {
  const cart = useCart();

  const hasItems = cart.items.length > 0;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shopping Cart</Text>

      {!hasItems ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>Your cart is empty</Text>
          <Text style={styles.emptySub}>Add items from the Home page</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.content}>
          {cart.items.map((it) => (
            <View key={it.id} style={styles.row}>
              <View style={styles.itemInfo}>
                <Text style={styles.itemTitle}>{it.title}</Text>
                <Text style={styles.itemSub}>Qty: {it.qty}</Text>
              </View>
              <View style={styles.controls}>
                <TouchableOpacity
                  style={styles.qtyBtn}
                  onPress={() => {
                    Haptics.selectionAsync();
                    cart.dec(it.id);
                  }}
                >
                  <Text style={styles.qtyBtnText}>-</Text>
                </TouchableOpacity>
                <View style={styles.qtyBadge}>
                  <Text style={styles.qtyText}>{it.qty}</Text>
                </View>
                <TouchableOpacity
                  style={styles.qtyBtn}
                  onPress={() => {
                    Haptics.selectionAsync();
                    cart.inc(it.id);
                  }}
                >
                  <Text style={styles.qtyBtnText}>+</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.removeBtn}
                onPress={() => {
                  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
                  cart.remove(it.id);
                }}
              >
                <Text style={styles.removeBtnText}>Remove</Text>
              </TouchableOpacity>
            </View>
          ))}
          <TouchableOpacity
            style={styles.clearBtn}
            onPress={() => {
              Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
              cart.clear();
            }}
          >
            <Text style={styles.clearText}>Clear Cart</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 8,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '900',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
  },
  emptySub: {
    color: '#ccc',
    marginTop: 6,
  },
  content: {
    paddingBottom: 24,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#333',
  },
  itemInfo: {
    flex: 1,
  },
  itemTitle: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 16,
  },
  itemSub: {
    color: '#999',
    marginTop: 2,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginRight: 12,
  },
  qtyBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#111',
    borderWidth: 1,
    borderColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '900',
  },
  qtyBadge: {
    minWidth: 36,
    height: 36,
    paddingHorizontal: 8,
    borderRadius: 10,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  qtyText: {
    color: '#fff',
    fontWeight: '800',
  },
  removeBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#333',
    borderWidth: 1,
    borderColor: '#555',
  },
  removeBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
  },
  clearBtn: {
    alignSelf: 'center',
    marginTop: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  clearText: {
    color: '#000',
    fontWeight: '900',
  },
});
