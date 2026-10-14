import React, { useState } from 'react';
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

type SellsProps = {
  onBack?: () => void;
  onSelectSale?: (saleName: string) => void;
  onAddSale?: () => void;
};

type SaleItem = {
  id: string;
  name: string;
};

const DEFAULT_SALES: SaleItem[] = [
  { id: '1', name: 'Ventas 1' },
  { id: '2', name: 'Ventas 2' },
  { id: '3', name: 'Ventas 3' },
  { id: '4', name: 'Ventas 4' },
  { id: '5', name: 'Ventas 5' },
  { id: '6', name: 'Ventas 6' },
  { id: '7', name: 'Ventas 7' },
  { id: '8', name: 'Ventas 8' },
  { id: '9', name: 'Ventas 9' },
];

export default function SellsScreen({ onBack, onSelectSale, onAddSale }: SellsProps) {
  const insets = useSafeAreaInsets();
  const topPadding = Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0) : insets.top;
  const bottomPadding = insets.bottom;

  const [salesList, setSalesList] = useState<SaleItem[]>(DEFAULT_SALES);

  const handleAddSale = () => {
    if (onAddSale) {
      onAddSale();
    } else {
      const nextNumber = salesList.length + 1;
      setSalesList((prev) => [
        ...prev,
        { id: String(nextNumber), name: `Ventas ${nextNumber}` },
      ]);
    }
  };

  // Agrupamos en filas de 3 para la cuadrícula
  const rows: SaleItem[][] = [];
  for (let i = 0; i < salesList.length; i += 3) {
    rows.push(salesList.slice(i, i + 3));
  }

  return (
    <View className="flex-1 bg-shaka-bg">
      <StatusBar barStyle="light-content" backgroundColor="#781B1E" />

      {/* Header superior color vino centrado vertical y horizontalmente */}
      <View
        style={{
          paddingTop: Math.max(topPadding, 16),
          minHeight: 140,
        }}
        className="justify-center bg-shaka-wine px-6 pb-4 border-b-2 border-black/40 shadow-2xl shadow-black"
      >
        <View className="relative flex-row items-center justify-between">
          {/* Botón de volver en tarjeta estilizada */}
          {onBack ? (
            <Pressable
              onPress={onBack}
              hitSlop={14}
              className="z-10 h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-black/35 shadow-lg shadow-black/60 active:scale-95 active:bg-black/50"
              accessibilityLabel="Volver al menú"
            >
              <Ionicons name="arrow-back" size={32} color="#FFFFFF" />
            </Pressable>
          ) : (
            <View className="h-16 w-16" />
          )}

          {/* Título principal matemáticamente centrado */}
          <View
            pointerEvents="none"
            className="absolute inset-0 items-center justify-center"
          >
            <Text className="font-rocker text-[42px] tracking-wider text-white text-center">
              Ventas
            </Text>
          </View>

          {/* Badge derecho para mantener balance simétrico */}
          <View className="z-10 rounded-full border border-white/15 bg-black/25 px-4 py-2 shadow-sm">
            <Text className="font-rocker text-[17px] tracking-widest text-white/90">
              VENTAS
            </Text>
          </View>
        </View>
      </View>

      {/* Contenido principal con fondo oscuro y marca de agua */}
      <View className="relative flex-1">
        {/* Marca de agua centrada en el fondo con mismo tamaño */}
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

        {/* Cuadrícula de botones de ventas en contenedor idéntico al menú */}
        <ScrollView
          contentContainerClassName="flex-grow justify-center items-center px-6 py-6 pb-36"
          showsVerticalScrollIndicator={false}
        >
          <View className="w-full max-w-[780px]">
            {rows.map((row, rowIndex) => (
              <View key={`row-${rowIndex}`} className="mb-4 flex-row gap-4">
                {row.map((item) => (
                  <Pressable
                    key={item.id}
                    onPress={() => onSelectSale?.(item.name)}
                    className="min-h-[82px] flex-1 items-center justify-center rounded-2xl bg-white px-3 py-4 shadow-xl shadow-black/60 active:scale-95 active:opacity-85"
                    style={{
                      elevation: 8,
                    }}
                  >
                    <Text
                      className="text-center text-[19px] font-bold text-neutral-900"
                      numberOfLines={2}
                    >
                      {item.name}
                    </Text>
                  </Pressable>
                ))}
                {/* Relleno transparente si la última fila tiene menos de 3 botones */}
                {row.length < 3 &&
                  Array.from({ length: 3 - row.length }).map((_, emptyIndex) => (
                    <View key={`empty-${emptyIndex}`} className="flex-1" />
                  ))}
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Botón flotante (+) en la esquina inferior derecha */}
        <View
          style={{
            position: 'absolute',
            bottom: Math.max(bottomPadding + 20, 28),
            right: 28,
          }}
        >
          <Pressable
            onPress={handleAddSale}
            hitSlop={10}
            className="h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-shaka-wine shadow-2xl shadow-black active:scale-90 active:bg-shaka-wine-dark"
            style={{
              elevation: 10,
            }}
            accessibilityLabel="Agregar nueva venta"
          >
            <Ionicons name="add" size={38} color="#FFFFFF" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

