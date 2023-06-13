import React, { useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Vibration } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Speech from 'expo-speech';
import { BarCodeScanner } from 'react-native-camera';


const HomeScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const falarEmVozAlta = async () => {
      await Speech.speak('Clique no centro da tela para abrir a câmera e ler o QR Code', { language: 'pt' });
    };

    falarEmVozAlta();
  }, []);

  const handlePress = () => {
    Vibration.vibrate();
    navigation.navigate('CameraScreen');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.touchArea}
        onPress={handlePress}
      >
        <Text style={styles.text}>
          Clique no centro da tela para abrir a câmera e ler o QR Code
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchArea: {
    width: windowWidth,
    height: windowHeight,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
  },
  text: {
    fontSize: 20,
  },
});

export default HomeScreen;