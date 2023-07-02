import React, { useState, useEffect } from 'react';
import { Text, View, Vibration, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { Audio } from 'expo-av';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Speech from 'expo-speech';

export default function App() {
  const [hasPermission, setHasPermission] = useState(true); // Definido como true para evitar a solicitação de permissão
  const [scanned, setScanned] = useState(false);
  const [audioExecutado, setAudioExecutado] = useState(false);
  const [soundObject, setSoundObject] = useState(null);
  const [qrCodeInvalido, setQRCodeInvalido] = useState(false);

  useEffect(() => {
    Speech.speak('Câmera aberta', { language: 'pt-BR' });
  }, []);

  useEffect(() => {
    return () => {
      if (soundObject) {
        soundObject.unloadAsync();
      }
    };
  }, [soundObject]);

  useEffect(() => {
    if (qrCodeInvalido) {
      const timeout = setTimeout(() => {
        setQRCodeInvalido(false);
        setScanned(false);
      }, 1000);
      Speech.speak('Código inválido', { language: 'pt-BR' });
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [qrCodeInvalido]);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);

    if (data === 'http://audio1') {
      try {
        if (!audioExecutado) {
          const audio1 = require('../../../assets/audio1.mp3');
          const { sound } = await Audio.Sound.createAsync(audio1);
          setSoundObject(sound);
          await sound.playAsync();
          setAudioExecutado(true);

          sound.setOnPlaybackStatusUpdate((status) => {
            if (status.didJustFinish) {
              setScanned(false);
              setAudioExecutado(false);
            }
          });
        }
      } catch (error) {
        console.log(error);
      }

      Vibration.vibrate(35);
    } else if (data === 'http://audio2') {
      try {
        if (!audioExecutado) {
          const audio2 = require('../../../assets/audio2.mp3');
          const { sound } = await Audio.Sound.createAsync(audio2);
          setSoundObject(sound);
          await sound.playAsync();
          setAudioExecutado(true);

          sound.setOnPlaybackStatusUpdate((status) => {
            if (status.didJustFinish) {
              setScanned(false);
              setAudioExecutado(false);
            }
          });
        }
      } catch (error) {
        console.log(error);
      }

      Vibration.vibrate(35);
    } else if (data === 'http://audio3') {
      try {
        if (!audioExecutado) {
          const audio3 = require('../../../assets/audio3.mp3');
          const { sound } = await Audio.Sound.createAsync(audio3);
          setSoundObject(sound);
          await sound.playAsync();
          setAudioExecutado(true);

          sound.setOnPlaybackStatusUpdate((status) => {
            if (status.didJustFinish) {
              setScanned(false);
              setAudioExecutado(false);
            }
          });
        }
      } catch (error) {
        console.log(error);
      }

      Vibration.vibrate(35);
    } else {
      setQRCodeInvalido(true);
      Vibration.vibrate([50, 50, 50, 50]);
    }
  };

  const stopAudio = async () => {
    if (soundObject && audioExecutado) {
      await soundObject.stopAsync();
      setAudioExecutado(false);
      setScanned(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={Camera.Constants.Type.back} onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}>
        <TouchableOpacity style={{ flex: 1 }} onPress={stopAudio} activeOpacity={1}>
          <View style={{ flex: 1, backgroundColor: 'transparent', flexDirection: 'row' }}></View>
        </TouchableOpacity>
      </Camera>
    </View>
  );
}
