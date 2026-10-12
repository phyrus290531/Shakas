import { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import LogoShakas from '../../assets/svg/logo_shakas.svg';

const PLACEHOLDER_COLOR = '#B0B3B8';

type Feedback = { type: 'error' | 'success'; message: string } | null;

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>(null);

  const handleLogin = () => {
    if (!username.trim() || !password.trim()) {
      setFeedback({
        type: 'error',
        message: 'Por favor, ingresa tu usuario y contraseña',
      });
      return;
    }

    setFeedback(null);
    setLoading(true);

    // Simulación de inicio de sesión
    setTimeout(() => {
      setLoading(false);
      setFeedback({ type: 'success', message: `¡Bienvenido ${username.trim()}!` });
    }, 1000);
  };

  return (
    <View className="flex-1 bg-shaka-bg">
      {/* Fondo */}
      <Image
        source={require('../../assets/images/background.jpg')}
        contentFit="cover"
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      />
      {/* Capa oscura para contraste */}
      <View className="absolute inset-0 bg-black/65" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1"
      >
        <ScrollView
          contentContainerClassName="flex-grow items-center justify-center px-6 py-8"
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo */}
          <View className="mb-4 h-[170px] w-[230px]">
            <LogoShakas width="100%" height="100%" />
          </View>

          {/* Tarjeta de inicio de sesión */}
          <View className="w-full max-w-[390px] rounded-2xl border border-white/10 bg-shaka-card/95 px-7 py-8 shadow-2xl shadow-black">
            <Text className="mb-6 text-center font-medieval text-[28px] tracking-wider text-white">
              Iniciar Sesión
            </Text>

            {/* Usuario */}
            <View className="mb-4 flex-row items-center rounded-[10px] bg-shaka-input px-4">
              <Ionicons name="person" size={20} color="#FFFFFF" />
              <TextInput
                value={username}
                onChangeText={setUsername}
                placeholder="Usuario"
                placeholderTextColor={PLACEHOLDER_COLOR}
                autoCapitalize="none"
                autoCorrect={false}
                className="ml-3 flex-1 py-3.5 text-[15px] text-white outline-none"
              />
            </View>

            {/* Contraseña */}
            <View className="mb-6 flex-row items-center rounded-[10px] bg-shaka-input px-4">
              <Ionicons name="lock-closed" size={20} color="#FFFFFF" />
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Contraseña"
                placeholderTextColor={PLACEHOLDER_COLOR}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
                onSubmitEditing={handleLogin}
                className="ml-3 flex-1 py-3.5 text-[15px] text-white outline-none"
              />
              <Pressable
                onPress={() => setShowPassword((v) => !v)}
                hitSlop={8}
                accessibilityLabel={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                <Ionicons
                  name={showPassword ? 'eye' : 'eye-off'}
                  size={19}
                  color="rgba(255,255,255,0.54)"
                />
              </Pressable>
            </View>

            {/* Botón INICIAR */}
            <Pressable
              onPress={handleLogin}
              disabled={loading}
              className="h-12 items-center justify-center rounded-[10px] bg-shaka-wine active:bg-shaka-wine-dark"
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text className="text-[15px] font-bold tracking-widest text-white">
                  INICIAR
                </Text>
              )}
            </Pressable>

            {feedback && (
              <Text
                className={`mt-4 text-center text-sm ${
                  feedback.type === 'error' ? 'text-red-400' : 'text-green-400'
                }`}
              >
                {feedback.message}
              </Text>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
