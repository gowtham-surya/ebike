/* eslint-disable no-bitwise */
import base64 from 'react-native-base64';
import { useMemo, useState } from 'react';
import * as ExpoDevice from 'expo-device';
import { PermissionsAndroid, Platform } from 'react-native';
import {
  BleError,
  BleManager,
  Characteristic,
  Device,
} from 'react-native-ble-plx';

const HEART_RATE_UUID = '0000FFE0-0000-1000-8000-00805F9B34FB';
const HEART_RATE_CHARACTERISTIC = '0000FFE1-0000-1000-8000-00805F9B34FB';

function useBLE({ pairedDevice, setBleData, setPairedDevice, setStatus }) {
  const bleManager = useMemo(() => new BleManager(), []);

  const [allDevices, setAllDevices] = useState([]);

  const requestAndroid31Permissions = async () => {
    const bluetoothScanPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      {
        title: 'Bluetooth Permission',
        message: 'Bluetooth Low Energy requires Bluetooth',
        buttonPositive: 'OK',
      }
    );
    const bluetoothConnectPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      {
        title: 'Bluetooth Permission',
        message: 'Bluetooth Low Energy requires Bluetooth',
        buttonPositive: 'OK',
      }
    );
    const fineLocationPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
        message: 'Bluetooth Low Energy requires Location',
        buttonPositive: 'OK',
      }
    );

    return (
      bluetoothScanPermission === 'granted' &&
      bluetoothConnectPermission === 'granted' &&
      fineLocationPermission === 'granted'
    );
  };

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      if ((ExpoDevice.platformApiLevel ?? -1) < 31) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'Bluetooth Low Energy requires Location',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        const isAndroid31PermissionsGranted =
          await requestAndroid31Permissions();

        return isAndroid31PermissionsGranted;
      }
    } else {
      return true;
    }
  };

  const scanForPeripherals = () =>
    bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.log(error);
      }

      if (device && device.name === 'HMSoft') {
        bleManager.stopDeviceScan();
        setStatus('Pairing');
        connectToDevice(device);
      }
    });

  const connectToDevice = async (device) => {
    try {
      const deviceConnection = await bleManager.connectToDevice(device.id);
      setPairedDevice(device);
      setStatus('Paired');

      await deviceConnection.discoverAllServicesAndCharacteristics();
      startStreamingData(deviceConnection);
    } catch (e) {
      console.log('FAILED TO CONNECT', e);
    }
  };

  const disconnectFromDevice = () => {
    if (pairedDevice) {
      bleManager.cancelDeviceConnection(pairedDevice.id);
      setPairedDevice(null);
      setStatus('scanning');
    }
  };

  let jsonChunks = [];

  const onHeartRateUpdate = (error, characteristic) => {
    if (error) {
      console.log(error);
      return -1;
    } else if (!characteristic?.value) {
      console.log('No Data was recieved');
      return -1;
    }

    const rawData = base64.decode(characteristic.value);
    // console.log(rawData);
    jsonChunks.push(rawData);

    // Check if all packets have been received
    if (jsonChunks.length === 5) {
      const jsonString = jsonChunks.join('');
      const jsonData = JSON.parse(jsonString);

      jsonChunks = [];

      setBleData(jsonData);
    }
  };

  const startStreamingData = async (device) => {
    if (device) {
      device.monitorCharacteristicForService(
        HEART_RATE_UUID,
        HEART_RATE_CHARACTERISTIC,
        onHeartRateUpdate
      );
    } else {
      console.log('No Device Connected');
    }
  };

  return {
    scanForPeripherals,
    requestPermissions,
    connectToDevice,
    disconnectFromDevice,
  };
}

export default useBLE;
