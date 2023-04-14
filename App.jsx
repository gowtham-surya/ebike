import useBLE from './useBLE';
import { LogBox } from 'react-native';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import DisplayData from './components/DisplayData';
import * as Animatable from 'react-native-animatable';
import { Text, TouchableOpacity, View } from 'react-native';
import { TailwindProvider } from 'tailwindcss-react-native';

LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const App = () => {
  const [bleData, setBleData] = useState({});
  const [pairedDevice, setPairedDevice] = useState(null);
  const [status, setStatus] = useState('Scanning');

  const {
    requestPermissions,
    scanForPeripherals,
    connectToDevice,
    disconnectFromDevice,
  } = useBLE({ pairedDevice, setBleData, setPairedDevice, setStatus });

  if (!pairedDevice) {
    const scanForDevices = async () => {
      const isPermissionsEnabled = await requestPermissions();
      if (isPermissionsEnabled) {
        scanForPeripherals();
      }
    };
    scanForDevices();
  }

  return (
    <TailwindProvider>
      <View className="flex-1 items-center justify-center bg-[#f2f2f2]">
        <StatusBar backgroundColor="#f2f2f2" className="text-black" />

        {true ? (
          <DisplayData {...bleData} />
        ) : (
          <TouchableOpacity className="w-32 h-32 border-l-2 border-r-2 border-t-4 border-[#00BCC9] rounded-full items-center justify-center">
            <Animatable.View
              animation={'pulse'}
              easing="ease-in-out"
              iterationCount={'infinite'}
              className="w-28 h-28 items-center justify-center rounded-full bg-[#00BCC9]"
            >
              <Text className="text-gray-50 text-[20px] mb-1 font-semibold">
                {status}
              </Text>
            </Animatable.View>
          </TouchableOpacity>
        )}
      </View>
    </TailwindProvider>
  );
};

export default App;
