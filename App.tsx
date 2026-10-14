import './global.css';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { NewRocker_400Regular } from '@expo-google-fonts/new-rocker';
import { Cookie_400Regular } from '@expo-google-fonts/cookie';
import LoginScreen from './src/screens/LoginScreen';
import MenuScreen from './src/screens/menu';
import SellsScreen from './src/screens/sells';
import OrdersScreen from './src/screens/orders';
import PaidScreen from './src/screens/paid';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'login' | 'menu' | 'sells' | 'orders' | 'paid'>('paid');
  const [selectedOrderTitle, setSelectedOrderTitle] = useState('Orden');
  const [orderTotal, setOrderTotal] = useState(50.0);
  const [fontsLoaded] = useFonts({
    MedievalSharp: require('./assets/fonts/MedievalSharp.ttf'),
    NewRocker: NewRocker_400Regular,
    Cookie: Cookie_400Regular,
  });

  if (!fontsLoaded) {
    return <View className="flex-1 bg-shaka-bg" />;
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      {currentScreen === 'login' ? (
        <LoginScreen onLoginSuccess={() => setCurrentScreen('menu')} />
      ) : currentScreen === 'paid' ? (
        <PaidScreen
          totalAmount={orderTotal}
          onBack={() => setCurrentScreen('orders')}
          onFinishSale={() => setCurrentScreen('sells')}
        />
      ) : currentScreen === 'orders' ? (
        <OrdersScreen
          orderTitle={selectedOrderTitle}
          onBack={() => setCurrentScreen('sells')}
          onPay={(total) => {
            setOrderTotal(total);
            setCurrentScreen('paid');
          }}
        />
      ) : currentScreen === 'sells' ? (
        <SellsScreen
          onBack={() => setCurrentScreen('menu')}
          onSelectSale={(_name) => {
            setSelectedOrderTitle('Orden');
            setCurrentScreen('orders');
          }}
        />
      ) : (
        <MenuScreen
          onSettingsPress={() => setCurrentScreen('login')}
          onNavigate={(screen) => {
            if (screen === 'ventas' || screen === 'ventas-hoy') {
              setCurrentScreen('sells');
            }
          }}
        />
      )}
    </SafeAreaProvider>
  );
}
