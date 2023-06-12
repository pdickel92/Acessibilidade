import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Audio } from 'expo-av';
import HapticFeedback from 'react-native-haptic-feedback';
import { useNavigation } from '@react-navigation/native';

const CameraScreen = () => {
  const [permissao, setPermissao] = useState(null);
  const [cameraVisivel, setCameraVisivel] = useState(false);
  const [qrCodeData, setQRCodeData] = useState('');
  const [qrCodeInvalido, setQRCodeInvalido] = useState(false);
  const navigation = useNavigation();
  const [audioExecutado, setAudioExecutado] = useState(false);


  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setPermissao(status === 'granted');
    })();
  }, []);

  const abrirCamera = () => {
    setCameraVisivel(true);
  };

  const lerQRCode = async ({ data }) => {
    setQRCodeData(data);
  
    if (data === 'http://audio1') {    //Executa audio1 se o qrcode for igual a http://audio1
      try {
        if (!audioExecutado) {
          const soundObject = new Audio.Sound();
          await soundObject.loadAsync(require('../../../assets/audio1.mp3'));
          await soundObject.playAsync();
          setAudioExecutado(true);
        }
      } catch (error) {
        console.log(error);
      }
  
      HapticFeedback.trigger('impactMedium');
    } else if (data === 'http://audio2') {    //Executa audio2 se o qrcode for igual a http://audio2
      try {
        if (!audioExecutado) {
          const soundObject = new Audio.Sound();
          await soundObject.loadAsync(require('../../../assets/audio2.mp3'));
          await soundObject.playAsync();
          setAudioExecutado(true);
        }
      } catch (error) {
        console.log(error);
      }
  
      HapticFeedback.trigger('impactMedium');
    } else if (data === 'http://audio3') {    //Executa audio3 se o qrcode for igual a http://audio3
      try {
        if (!audioExecutado) {
          const soundObject = new Audio.Sound();
          await soundObject.loadAsync(require('../../../assets/audio3.mp3'));
          await soundObject.playAsync();
          setAudioExecutado(true);
        }
      } catch (error) {
        console.log(error);
      }
      
      HapticFeedback.trigger('impactMedium');
    } else {
      setQRCodeInvalido(true);
    }
  
    // Retornar para a tela HomeScreen quando um QR code for lido
    navigation.navigate('HomeScreen');
  };
  

  const handleBarCodeScanned = ({ type, data }) => {
    try {
      if (!cameraRef.current) {
        return;
      }

      lerQRCode({ data });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      {!cameraVisivel ? (
        <TouchableOpacity style={styles.button} onPress={abrirCamera}>
          <Text style={styles.buttonText}>Abrir Câmera</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.cameraContainer}>
          <BarCodeScanner
            ref={cameraRef}
            onBarCodeScanned={handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
          {qrCodeInvalido && (
            <View style={styles.errorMessageContainer}>
              <Text style={styles.errorMessage}>QR Code inválido para este app</Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#5f9ea0',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  cameraContainer: {
    flex: 1,
    position: 'relative',
    width: '100%',
  },
  errorMessageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  errorMessage: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CameraScreen;
