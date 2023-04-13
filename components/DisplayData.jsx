import React from 'react';
import ItemCarDontainer from './ItemCarDontainer';
import { View, Text, Image } from 'react-native';
import Bicycle from '../assets/bicycle.png';

const DisplayData = (bleData) => {
  console.log(`Data: ${JSON.stringify(bleData)}`);

  return (
    <View className="flex-1 flex-col sm:flex-row">
      <View className="flex-1 sm:w-1/3 p-2 items-center justify-center">
        <Image source={Bicycle} resizeMode="center" style={{ width: '100%' }} />
      </View>
      <View className="w-full sm:w-2/3 px-4 mb-6 flex-row sm:flex-col items-center justify-evenly flex-wrap">
        <ItemCarDontainer name="Km Speed" value={bleData.speed || 0} />
        <ItemCarDontainer name="Km Range" value="0" />
        <ItemCarDontainer name="kV Voltage" value={bleData.voltage || 0} />
        <ItemCarDontainer name="(A) Current" value={bleData.current || 0} />
        <ItemCarDontainer name="°C Temp" value={bleData.temp || 0} />
        <ItemCarDontainer name="% Battery" value="0" />
      </View>
    </View>
  );
};

export default DisplayData;
