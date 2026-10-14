import React, { useState } from 'react';
import {
  Alert,
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

type OrderItem = {
  id: string;
  name: string;
  description: string;
  price: number;
};

type OrdersProps = {
  orderTitle?: string;
  onBack?: () => void;
  onPay?: (total: number) => void;
  onAddProduct?: () => void;
};

const INITIAL_ORDER_ITEMS: OrderItem[] = [
  {
    id: '1',
    name: 'Nombre de comida',
    description: 'Pequeña descripcion',
    price: 85.0,
  },
  {
    id: '2',
    name: 'Nombre de comida',
    description: 'Pequeña descripcion',
    price: 120.0,
  },
  {
    id: '3',
    name: 'Nombre de comida',
    description: 'Pequeña descripcion',
    price: 95.0,
  },
  {
    id: '4',
    name: 'Nombre de comida',
    description: 'Pequeña descripcion',
    price: 110.0,
  },
  {
    id: '5',
    name: 'Nombre de comida',
    description: 'Pequeña descripcion',
    price: 75.0,
  },
];

export default function OrdersScreen({
  orderTitle = 'Orden',
  onBack,
  onPay,
  onAddProduct,
}: OrdersProps) {
  const insets = useSafeAreaInsets();
  const topPadding = Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0) : insets.top;
  const bottomPadding = insets.bottom;

  const [items, setItems] = useState<OrderItem[]>(INITIAL_ORDER_ITEMS);

  const handleDeleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAddItem = () => {
    if (onAddProduct) {
      onAddProduct();
    } else {
      const nextId = String(Date.now());
      setItems((prev) => [
        ...prev,
        {
          id: nextId,
          name: 'Nuevo Platillo',
          description: 'Porción individual',
          price: 90.0,
        },
      ]);
    }
  };

  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);

  const handlePayPress = () => {
    if (onPay) {
      onPay(totalPrice);
    } else {
      Alert.alert(
        'Pagar Orden',
        `Total a cobrar: $${totalPrice.toFixed(2)}\n¿Deseas procesar el pago?`,
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Confirmar', onPress: () => Alert.alert('Éxito', 'Pago procesado correctamente') },
        ]
      );
    }
  };

  return (
    <View className="flex-1 bg-shaka-bg">
      <StatusBar barStyle="light-content" backgroundColor="#781B1E" />

      {/* Header superior color vino idéntico en escala y centrado */}
      <View
        style={{
          paddingTop: Math.max(topPadding, 16),
          minHeight: 140,
        }}
        className="justify-center bg-shaka-wine px-6 pb-4 border-b-2 border-black/40 shadow-2xl shadow-black"
      >
        <View className="relative flex-row items-center justify-between">
          {/* Botón de volver */}
          {onBack ? (
            <Pressable
              onPress={onBack}
              hitSlop={14}
              className="z-10 h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-black/35 shadow-lg shadow-black/60 active:scale-95 active:bg-black/50"
              accessibilityLabel="Volver"
            >
              <Ionicons name="arrow-back" size={32} color="#FFFFFF" />
            </Pressable>
          ) : (
            <View className="h-16 w-16" />
          )}

          {/* Título de la pestaña ("Orden") matemáticamente centrado */}
          <View
            pointerEvents="none"
            className="absolute inset-0 items-center justify-center"
          >
            <Text className="font-rocker text-[42px] tracking-wider text-white text-center">
              {orderTitle}
            </Text>
          </View>

          {/* Badge derecho para mantener balance simétrico */}
          <View className="z-10 rounded-full border border-white/15 bg-black/25 px-4 py-2 shadow-sm">
            <Text className="font-rocker text-[17px] tracking-widest text-white/90">
              DETALLE
            </Text>
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

        {/* Lista de platillos en el mismo contenedor que el resto de pestañas */}
        <ScrollView
          contentContainerClassName="items-center px-6 pt-8 pb-12"
          showsVerticalScrollIndicator={false}
        >
          <View className="w-full max-w-[780px]">
            {items.map((item) => (
              <View
                key={item.id}
                className="mb-4 flex-row items-center justify-between rounded-2xl bg-white p-3.5 shadow-xl shadow-black/60"
                style={{
                  elevation: 8,
                  minHeight: 82,
                }}
              >
                {/* Lado izquierdo: Miniatura + Nombre y descripción */}
                <View className="flex-1 flex-row items-center pr-3">
                  {/* Miniatura del platillo con icono estilizado */}
                  <View className="h-14 w-14 items-center justify-center rounded-xl bg-neutral-900 border border-neutral-700 shadow-sm">
                    <Ionicons name="fast-food" size={28} color="#E5A65E" />
                  </View>

                  <View className="ml-3.5 flex-1">
                    <Text
                      className="font-rocker text-[19px] tracking-wide text-neutral-900"
                      numberOfLines={1}
                    >
                      {item.name}
                    </Text>
                    <Text
                      className="text-[13px] font-medium text-neutral-500"
                      numberOfLines={1}
                    >
                      {item.description}
                    </Text>
                  </View>
                </View>

                {/* Lado derecho: Precio + Acciones (Editar y Eliminar) */}
                <View className="flex-row items-center gap-2">
                  <Text className="font-rocker text-[20px] tracking-wider text-neutral-900">
                    ${item.price.toFixed(2)}
                  </Text>

                  {/* Botón editar */}
                  <Pressable
                    hitSlop={8}
                    className="p-1.5 active:opacity-60"
                    accessibilityLabel="Editar platillo"
                  >
                    <Ionicons name="pencil" size={22} color="#1F2937" />
                  </Pressable>

                  {/* Separador vertical */}
                  <View className="h-6 w-[1.5px] bg-neutral-300" />

                  {/* Botón borrar */}
                  <Pressable
                    onPress={() => handleDeleteItem(item.id)}
                    hitSlop={8}
                    className="p-1.5 active:opacity-60"
                    accessibilityLabel="Eliminar platillo"
                  >
                    <Ionicons name="trash-outline" size={24} color="#781B1E" />
                  </Pressable>
                </View>
              </View>
            ))}

            {/* Botones inferiores: Agregar y Pagar */}
            <View className="mt-8 w-full items-center">
              {/* Botón Agregar */}
              <Pressable
                onPress={handleAddItem}
                className="h-16 w-full max-w-[360px] items-center justify-center rounded-2xl bg-shaka-wine shadow-xl shadow-black/60 active:scale-95 active:bg-shaka-wine-dark"
                style={{
                  elevation: 8,
                }}
              >
                <Text className="font-rocker text-[26px] tracking-wider text-white">
                  Agregar
                </Text>
              </Pressable>

              {/* Botón Pagar */}
              <Pressable
                onPress={handlePayPress}
                className="mt-3.5 h-16 w-full max-w-[360px] items-center justify-center rounded-2xl bg-shaka-wine shadow-xl shadow-black/60 active:scale-95 active:bg-shaka-wine-dark"
                style={{
                  elevation: 8,
                }}
              >
                <Text className="font-rocker text-[26px] tracking-wider text-white">
                  Pagar
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

