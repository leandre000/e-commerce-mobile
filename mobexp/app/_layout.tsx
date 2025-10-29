import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Drawer } from 'expo-router/drawer';
import { StatusBar } from 'expo-status-bar';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';

export const unstable_settings = {
  initialRouteName: '(drawer)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AuthProvider>
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
              drawerItemStyle: { display: 'none' }
            }}
          />
          <Drawer.Screen
            name="login"
            options={{
              drawerLabel: 'Login',
              title: 'Login',
              drawerItemStyle: { display: 'none' }
            }}
          />
          <Drawer.Screen
            name="register"
            options={{
              drawerLabel: 'Register',
              title: 'Register',
              drawerItemStyle: { display: 'none' }
            }}
          />
          <Drawer.Screen
            name="forgot-password"
            options={{
              drawerLabel: 'Forgot Password',
              title: 'Forgot Password',
              drawerItemStyle: { display: 'none' }
            }}
          />
          </Drawer>
          <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
