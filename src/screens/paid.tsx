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

type PaidProps = {
  totalAmount?: number;
  onBack?: () => void;
  onFinishSale?: () => void;
};

const EXCHANGE_RATE = 16.5;

export default function PaidScreen({
  totalAmount = 50.0,
  onBack,
  onFinishSale,
}: PaidProps) {
  const insets = useSafeAreaInsets();
  const topPadding = Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0) : insets.top;

  const [currency, setCurrency] = useState<'MXN' | 'USD'>('MXN');
  const [selectedMethod, setSelectedMethod] = useState<'pesos' | 'dolares' | 'tarjeta'>('pesos');
  const [totalPagado, setTotalPagado] = useState<number>(0);

  const amountInUSD = totalAmount / EXCHANGE_RATE;
  const deuda = Math.max(totalAmount - totalPagado, 0);
  const cambio = Math.max(totalPagado - totalAmount, 0);

  const handleExactCash = () => {
    setTotalPagado(totalAmount);
    setSelectedMethod('pesos');
  };

  const handleExactCard = () => {
    setTotalPagado(totalAmount);
    setSelectedMethod('tarjeta');
  };

  const handleRegisterSale = () => {
    if (deuda > 0) {
      Alert.alert(
        'Pago incompleto',
        `Aún existe una deuda pendiente de $${deuda.toFixed(2)}. ¿Deseas liquidar el total exacto?`,
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Liquidar y Registrar',
            onPress: () => {
              setTotalPagado(totalAmount);
              setTimeout(() => {
                Alert.alert('¡Venta Exitosa!', 'La venta ha sido registrada con éxito.', [
                  { text: 'Aceptar', onPress: () => onFinishSale?.() },
                ]);
              }, 200);
            },
          },
        ]
      );
      return;
    }

    Alert.alert('¡Venta Exitosa!', 'La venta ha sido registrada con éxito.', [
      { text: 'Aceptar', onPress: () => onFinishSale?.() },
    ]);
  };

  return (
    <View className="flex-1 bg-shaka-bg">
      <StatusBar barStyle="light-content" backgroundColor="#781B1E" />

      {/* Header superior color vino unificado y centrado */}
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
              accessibilityLabel="Volver a la orden"
            >
              <Ionicons name="arrow-back" size={32} color="#FFFFFF" />
            </Pressable>
          ) : (
            <View className="h-16 w-16" />
          )}

          {/* Título "Pagar" matemáticamente centrado */}
          <View
            pointerEvents="none"
            className="absolute inset-0 items-center justify-center"
          >
            <Text className="font-rocker text-[42px] tracking-wider text-white text-center">
              Pagar
            </Text>
          </View>

          {/* Badge derecho */}
          <View className="z-10 rounded-full border border-white/15 bg-black/25 px-4 py-2 shadow-sm">
            <Text className="font-rocker text-[17px] tracking-widest text-white/90">
              COBRO
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

        {/* Contenedor unificado al mismo tamaño que las demás pantallas */}
        <ScrollView
          contentContainerClassName="items-center px-6 py-8"
          showsVerticalScrollIndicator={false}
        >
          <View className="w-full max-w-[780px]">
            {/* Tarjeta 1: Resumen de cobro */}
            <View
              className="mb-6 rounded-3xl bg-white p-6 shadow-xl shadow-black/60"
              style={{ elevation: 8 }}
            >
              {/* Selector de moneda MXN / USD y tasa de cambio */}
              <View className="flex-row items-center gap-3">
                <View className="flex-row overflow-hidden rounded-xl border border-neutral-700 bg-[#3A3F45]">
                  <Pressable
                    onPress={() => setCurrency('MXN')}
                    className={`px-4 py-1.5 ${currency === 'MXN' ? 'bg-white' : 'bg-transparent'}`}
                  >
                    <Text
                      className={`text-[15px] font-bold ${
                        currency === 'MXN' ? 'text-neutral-900' : 'text-neutral-300'
                      }`}
                    >
                      MXN
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={() => setCurrency('USD')}
                    className={`px-4 py-1.5 ${currency === 'USD' ? 'bg-white' : 'bg-transparent'}`}
                  >
                    <Text
                      className={`text-[15px] font-bold ${
                        currency === 'USD' ? 'text-neutral-900' : 'text-neutral-300'
                      }`}
                    >
                      USD
                    </Text>
                  </Pressable>
                </View>

                <Text className="text-[14px] font-semibold text-neutral-700">
                  1 USD = ${EXCHANGE_RATE.toFixed(2)}
                </Text>
              </View>

              {/* Total a pagar */}
              <View className="mt-5 flex-row items-baseline justify-between border-b border-neutral-200 pb-4">
                <Text className="text-[20px] font-bold text-neutral-900">
                  Total a pagar
                </Text>
                <Text className="font-rocker text-[40px] tracking-wider text-neutral-900">
                  ${totalAmount.toFixed(0)}
                </Text>
              </View>

              {/* Desglose de importes */}
              <View className="mt-4 gap-2.5">
                <View className="flex-row items-center justify-between">
                  <Text className="text-[16px] font-medium text-neutral-800">
                    = USD
                  </Text>
                  <Text className="text-[16px] font-semibold text-neutral-900">
                    ${amountInUSD.toFixed(2)}
                  </Text>
                </View>

                <View className="flex-row items-center justify-between">
                  <Text className="text-[16px] font-medium text-neutral-800">
                    Total pagado
                  </Text>
                  <Text className="text-[16px] font-semibold text-neutral-900">
                    ${totalPagado.toFixed(0)}
                  </Text>
                </View>

                <View className="flex-row items-center justify-between">
                  <Text className="text-[16px] font-bold text-neutral-800">
                    Deuda
                  </Text>
                  <Text className="text-[17px] font-bold text-red-600">
                    ${deuda.toFixed(0)}
                  </Text>
                </View>

                <View className="flex-row items-center justify-between">
                  <Text className="text-[16px] font-medium text-neutral-800">
                    Cambio
                  </Text>
                  <Text className="text-[16px] font-semibold text-neutral-900">
                    ${cambio.toFixed(0)}
                  </Text>
                </View>
              </View>
            </View>

            {/* Tarjeta 2: Métodos de pago y botones de acción */}
            <View
              className="rounded-3xl bg-white p-6 shadow-xl shadow-black/60"
              style={{ elevation: 8 }}
            >
              {/* Fila 1: Métodos de pago (Pesos, Dólares, Tarjeta) */}
              <View className="flex-row gap-3">
                <Pressable
                  onPress={() => setSelectedMethod('pesos')}
                  className={`min-h-[68px] flex-1 items-center justify-center rounded-2xl ${
                    selectedMethod === 'pesos'
                      ? 'bg-neutral-950 border-2 border-shaka-wine'
                      : 'bg-[#22252A]'
                  } shadow-md active:scale-95`}
                >
                  <Text className="font-rocker text-[20px] text-white">
                    Pesos
                  </Text>
                </Pressable>

                <Pressable
                  onPress={() => setSelectedMethod('dolares')}
                  className={`min-h-[68px] flex-1 items-center justify-center rounded-2xl ${
                    selectedMethod === 'dolares'
                      ? 'bg-neutral-950 border-2 border-shaka-wine'
                      : 'bg-[#22252A]'
                  } shadow-md active:scale-95`}
                >
                  <Text className="font-rocker text-[20px] text-white">
                    Dolares
                  </Text>
                </Pressable>

                <Pressable
                  onPress={() => setSelectedMethod('tarjeta')}
                  className={`min-h-[68px] flex-1 items-center justify-center rounded-2xl ${
                    selectedMethod === 'tarjeta'
                      ? 'bg-neutral-950 border-2 border-shaka-wine'
                      : 'bg-[#22252A]'
                  } shadow-md active:scale-95`}
                >
                  <Text className="font-rocker text-[20px] text-white">
                    Tarjeta
                  </Text>
                </Pressable>
              </View>

              {/* Fila 2: Exacto en efectivo / Exacto en tarjeta */}
              <View className="mt-4 flex-row gap-3">
                <Pressable
                  onPress={handleExactCash}
                  className="min-h-[76px] flex-1 items-center justify-center rounded-2xl bg-[#22252A] px-2 py-3 shadow-md active:scale-95 active:bg-neutral-950"
                >
                  <Text
                    className="text-center font-rocker text-[18px] text-white"
                    numberOfLines={2}
                  >
                    Exacto en{'\n'}efectivo
                  </Text>
                </Pressable>

                <Pressable
                  onPress={handleExactCard}
                  className="min-h-[76px] flex-1 items-center justify-center rounded-2xl bg-[#22252A] px-2 py-3 shadow-md active:scale-95 active:bg-neutral-950"
                >
                  <Text
                    className="text-center font-rocker text-[18px] text-white"
                    numberOfLines={2}
                  >
                    Exacto en{'\n'}tarjeta
                  </Text>
                </Pressable>
              </View>

              {/* Fila 3: Botón Registrar Venta */}
              <View className="mt-6 items-center">
                <Pressable
                  onPress={handleRegisterSale}
                  className="h-16 w-full max-w-[340px] items-center justify-center rounded-2xl bg-shaka-wine shadow-xl shadow-black/60 active:scale-95 active:bg-shaka-wine-dark"
                  style={{ elevation: 8 }}
                >
                  <Text className="font-rocker text-[24px] tracking-wider text-white">
                    Registrar venta
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

