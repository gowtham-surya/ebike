import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import ItemCarDontainer from './ItemCarDontainer';
import { View, Text, Image } from 'react-native';
import Bicycle from '../assets/bicycle.png';

const DisplayData = (bleData) => {
  console.log(`Data: ${JSON.stringify(bleData)}`);

  return (
    <View className="flex-1 flex-col sm:flex-row">
      <View className="flex-1 sm:w-1/3 p-2 items-center justify-center relative">
        <Image source={Bicycle} resizeMode="center" style={{ width: '100%' }} />
        <View className="w-12 h-12 rounded-full top-5 left-10 z-50 absolute shadow-sm flex-1 items-center justify-center flex-row">
          <Text className="text-white px-2 text-lg font-bold">
            {bleData.m == 1 ? 'M' : ''}
          </Text>
          <Text className="text-white px-2 text-lg font-bold">
            {bleData.n == 1 ? 'A' : ''}
          </Text>
        </View>
        <View className="w-12 h-12 rounded-full bottom-5 left-10 z-50 absolute shadow-sm flex-1 items-center justify-center">
          <Ionicons
            name="arrow-back"
            size={30}
            color={bleData.i == 1 ? 'orange' : 'gray'}
          />
        </View>
        <View className="w-12 h-12 rounded-full bottom-5 left-[45%] z-50 absolute shadow-sm flex-1 items-center justify-center">
          <Ionicons
            name="sunny"
            size={28}
            color={bleData.k == 1 ? 'blue' : 'gray'}
          />
        </View>
        <View className="w-12 h-12 rounded-full bottom-5 right-10 z-50 absolute shadow-sm flex-1 items-center justify-center">
          <Ionicons
            name="arrow-forward"
            size={30}
            color={bleData.j == 1 ? 'orange' : 'gray'}
          />
        </View>
      </View>
      <View className="w-full sm:w-2/3 px-4 mb-6 flex-row sm:flex-col items-center justify-evenly flex-wrap">
        <ItemCarDontainer name="(Km) Speed" value={bleData.speed || 0} />
        <ItemCarDontainer name="(Km) Range" value="87" />
        <ItemCarDontainer name="(V) Voltage" value={69} />
        <ItemCarDontainer name="(A) Current" value={6} />
        <ItemCarDontainer name="(°C) Temp" value={34} />
        <ItemCarDontainer name="% Battery" value="84" />
      </View>
    </View>
  );
};

export default DisplayData;
