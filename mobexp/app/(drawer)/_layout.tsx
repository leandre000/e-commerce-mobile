import { Tabs } from 'expo-router/tabs';

export default function DrawerLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarLabel: 'Home'
        }}
      />
      <Tabs.Screen
        name="products"
        options={{
          title: 'Products',
          tabBarLabel: 'Products'
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarLabel: 'Favorites'
        }}
      />
    </Tabs>
  );
}
