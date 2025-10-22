import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Drawer } from 'expo-router/drawer';
import { StatusBar } from 'expo-status-bar';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { CartProvider } from '@/context/CartContext';

export const unstable_settings = {
  initialRouteName: '(drawer)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <CartProvider>
        <Drawer>
          <Drawer.Screen
            name="(drawer)"
            options={{
              drawerLabel: 'Home',
              title: 'Home',
              headerShown: false
            }}
          />
          <Drawer.Screen
            name="about"
            options={{
              drawerLabel: 'About',
              title: 'About'
            }}
          />
          <Drawer.Screen
            name="settings"
            options={{
              drawerLabel: 'Settings',
              title: 'Settings'
            }}
          />
          <Drawer.Screen
            name="cart"
            options={{
              drawerLabel: 'Cart',
              title: 'Cart',
              drawerItemStyle: { display: 'none' } // Hide cart from drawer, accessible via navigation
            }}
          />
        </Drawer>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      </CartProvider>
    </ThemeProvider>
  );
}
