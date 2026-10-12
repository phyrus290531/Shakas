import './global.css';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { useFonts } from 'expo-font';
import LoginScreen from './src/screens/LoginScreen';

export default function App() {
  const [fontsLoaded] = useFonts({
    MedievalSharp: require('./assets/fonts/MedievalSharp.ttf'),
  });

  if (!fontsLoaded) {
    return <View className="flex-1 bg-shaka-bg" />;
  }

  return (
    <>
      <StatusBar style="light" />
      <LoginScreen />
    </>
  );
}
