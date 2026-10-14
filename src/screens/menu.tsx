import React from 'react';
import {
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type MenuProps = {
  onSettingsPress?: () => void;
  onNavigate?: (screen: string) => void;
};

type MenuButtonProps = {
  title: string;
  onPress?: () => void;
  className?: string;
  textSize?: string;
};

function MenuButton({
  title,
  onPress,
  className = '',
  textSize = 'text-[20px]',
}: MenuButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      className={`min-h-[82px] items-center justify-center rounded-2xl bg-white px-4 py-4 shadow-xl shadow-black/60 active:scale-95 active:opacity-85 ${className}`}
      style={{
        elevation: 8,
      }}
    >
      <Text
        className={`text-center font-bold text-neutral-900 ${textSize}`}
        numberOfLines={2}
      >
        {title}
      </Text>
    </Pressable>
  );
}

export default function MenuScreen({ onSettingsPress, onNavigate }: MenuProps) {
  const insets = useSafeAreaInsets();
  const topPadding = Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0) : insets.top;

  return (
    <View className="flex-1 bg-shaka-bg">
      <StatusBar barStyle="light-content" backgroundColor="#781B1E" />

      {/* Header superior color vino más imponente y detallado */}
      <View
        style={{
          paddingTop: Math.max(topPadding, 16),
          minHeight: 140,
        }}
        className="justify-center bg-shaka-wine px-6 pb-4 border-b-2 border-black/40 shadow-2xl shadow-black"
      >
        <View className="flex-row items-center justify-between">
          {/* Logo superior izquierdo grande y nítido (proporción 1:1) */}
          <View className="h-32 w-32">
            <Image
              source={require('../../assets/images/shakas-logo-removebg-preview.png')}
              contentFit="contain"
              style={{ width: '100%', height: '100%' }}
            />
          </View>

          {/* Sección derecha con detalle y botón de ajustes */}
          <View className="flex-row items-center gap-3">
            {/* Badge sutil de estatus / menú */}
            <View className="rounded-full border border-white/15 bg-black/25 px-4 py-2 shadow-sm">
              <Text className="font-rocker text-[17px] tracking-widest text-white/90">
                MENÚ
              </Text>
            </View>

            {/* Botón de configuración / engrane en botón estilizado */}
            <Pressable
              onPress={onSettingsPress}
              hitSlop={14}
              className="h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-black/35 shadow-lg shadow-black/60 active:scale-95 active:bg-black/50"
              accessibilityLabel="Configuración"
            >
              <Ionicons name="settings-sharp" size={36} color="#FFFFFF" />
            </Pressable>
          </View>
        </View>
      </View>

      {/* Contenido principal con fondo oscuro y marca de agua */}
      <View className="relative flex-1">
        {/* Marca de agua centrada en el fondo */}
        <View
          pointerEvents="none"
          className="absolute inset-0 items-center justify-center opacity-25"
        >
          <Image
            source={require('../../assets/images/shakas-logo-removebg-preview.png')}
            contentFit="contain"
            style={{ width: '96%', height: '85%', maxWidth: 750 }}
          />
        </View>

        {/* Secciones y botones distribuidos ocupando el espacio vertical y horizontal */}
        <ScrollView
          contentContainerClassName="flex-grow justify-evenly items-center px-6 py-6"
          showsVerticalScrollIndicator={false}
        >
          <View className="w-full max-w-[780px] items-center">
            {/* Sección 1: Ventas */}
            <View className="my-4 w-full items-center">
              <Text className="mb-4 font-rocker text-[42px] tracking-wider text-white">
                Ventas
              </Text>
              <View className="w-full flex-row justify-center gap-4">
                <MenuButton
                  title="Ventas"
                  className="flex-1"
                  textSize="text-[21px]"
                  onPress={() => onNavigate?.('ventas')}
                />
                <MenuButton
                  title="Ventas de hoy"
                  className="flex-1"
                  textSize="text-[21px]"
                  onPress={() => onNavigate?.('ventas-hoy')}
                />
              </View>
            </View>

            {/* Sección 2: Caja */}
            <View className="my-6 w-full items-center">
              <Text className="mb-4 font-rocker text-[42px] tracking-wider text-white">
                Caja
              </Text>
              <View className="w-full flex-row justify-center gap-3">
                <MenuButton
                  title="Corte x"
                  className="flex-1"
                  textSize="text-[17px]"
                  onPress={() => onNavigate?.('corte-x')}
                />
                <MenuButton
                  title="Corte z"
                  className="flex-1"
                  textSize="text-[17px]"
                  onPress={() => onNavigate?.('corte-z')}
                />
                <MenuButton
                  title="Cambio de turno"
                  className="flex-1"
                  textSize="text-[16px]"
                  onPress={() => onNavigate?.('cambio-turno')}
                />
              </View>
            </View>

            {/* Sección 3: Inventario */}
            <View className="my-4 w-full items-center">
              <Text className="mb-4 font-rocker text-[42px] tracking-wider text-white">
                Inventario
              </Text>
              <View className="w-full flex-row justify-center gap-4">
                <MenuButton
                  title="Inventario diario"
                  className="flex-1"
                  textSize="text-[20px]"
                  onPress={() => onNavigate?.('inventario-diario')}
                />
                <MenuButton
                  title="Mermas"
                  className="flex-1"
                  textSize="text-[20px]"
                  onPress={() => onNavigate?.('mermas')}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

