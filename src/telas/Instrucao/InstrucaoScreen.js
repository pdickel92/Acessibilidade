import React, { Component } from 'react';
import { View, Button } from 'react-native';
import { Audio } from 'expo-av';

export default class AudioPlayer extends Component {
  constructor(props) {
    super(props);
    this.soundObject = new Audio.Sound();
    this.state = {
      isPlaying: false
    };
  }

  async componentDidMount() {
    try {
      await this.soundObject.loadAsync(require('../../../assets/audio1.mp3'));
    } catch (error) {
      console.log('Erro ao carregar o áudio:', error);
    }
  }

  playAudio = async () => {
    try {
      await this.soundObject.playAsync();
      this.setState({ isPlaying: true });
    } catch (error) {
      console.log('Erro ao reproduzir o áudio:', error);
    }
  };

  pauseAudio = async () => {
    try {
      await this.soundObject.pauseAsync();
      this.setState({ isPlaying: false });
    } catch (error) {
      console.log('Erro ao pausar o áudio:', error);
    }
  };

  render() {
    const { isPlaying } = this.state;

    return (
      <View>
        <Button title={isPlaying ? 'Pausar' : 'Reproduzir'} onPress={isPlaying ? this.pauseAudio : this.playAudio} />
      </View>
    );
  }
}
