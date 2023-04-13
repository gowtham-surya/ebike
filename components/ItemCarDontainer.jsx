import React from 'react';
import { View, Text } from 'react-native';

const ItemCarDontainer = ({ name, value }) => {
  return (
    <View className="space-y-2 px-3 py-2 bg-[#f2f2f2] w-[150px] my-2 items-center">
      <Text className="text-[#00BCC9] text-[36px] font-bold">{value}</Text>
      <Text className="text-gray-400 text-[16px]">{name}</Text>
    </View>
  );
};

export default ItemCarDontainer;
