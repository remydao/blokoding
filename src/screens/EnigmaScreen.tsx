import React, {useState, useEffect, useReducer} from 'react';
import {Text, View, StatusBar, StyleSheet, FlatList, Pressable, Animated, AppState} from 'react-native';
import uuid from 'react-native-uuid';
import EnigmaButton from '../components/EnigmaButton';
import Colors from '../constants/Colors';
import { useLanguage } from '../datas/contextHooks';
import {enigmaInfo} from '../constants/EnigmaDetails'
import {Themes} from '../constants/Themes';
import Sound from 'react-native-sound';

import {loadSound} from '../scripts/sound/sound'

const DiscoverColors = [
  Colors.dark_pink,
  Colors.turquoise,
  Colors.dark_red,
  Colors.primary,
  Colors.dark_purple,
]


interface IProps {
  navigation: any,
  route: any
}

interface IState {
  id: string,
  value: string
}
//extends React.Component<IProps, IState>
const EnigmaScreen = ({navigation, route}: IProps) => {
    const [buttons, setButtons] = useState<IState[]>([]);
    const language = useLanguage();

    const _handleAppStateChange2 = (currentAppState: any) => {
      if(currentAppState == "background") {
        console.log("ENIGMA: Stop sound because appState background");
        soundRef.current?.stop();
        //soundRef.current?.release();
      }
      if(currentAppState == "active") {
        if (soundRef.current?.isPlaying())
          return;
        
        console.log("ENIGMA: play sound because currentAppState is active");
        soundRef.current?.play((success: any) => {
          if (success) {
            console.log('ENIGMA: successfully finished playing');
          } else {
            console.log('ENIGMA: playback failed due to audio decoding errors');
          }
        });
      }
    }

    const soundRef = React.useRef<Sound>();

    const sounds = {
      [Themes.FOREST]: "forest.mp3",
      [Themes.BEACH]: "beach.mp3",
      [Themes.CITY]: "city.mp3"
    };
    const theme = route.params.theme;


    React.useEffect(() => {
      soundRef.current = loadSound(sounds[theme], true, 1);
      AppState.addEventListener('change', (state) => _handleAppStateChange2(state));
      return () => {
        AppState.removeEventListener('change', (state) => {_handleAppStateChange2(state)});
        soundRef.current?.stop();
        soundRef.current?.release();
      }
    }, [])


    const setLevel = () => {
      let btns = [...buttons];
      const numberOfLevels = enigmaInfo[theme].length;
      //numberOfLevels
      for (let i = 0; i < numberOfLevels; i++)
      {
          const levelTitle = language.enigma + ' ' + (i + 1);
          btns.push({id:uuid.v4().toString(), value:levelTitle})
      }
      setButtons(btns);
    }

    useEffect(() => {
      setLevel();
    }, [])

    const onPress = (index: number) => {
      loadSound("buttonclick.mp3", false);
      navigation.navigate('LevelScreen', {
        theme: route.params.theme,
        levelNumber: index,
        levelType: 'enigma',
        language: route.params.language
      })
    }

    const selectBgColor = (index: number) => {
      return DiscoverColors[index % DiscoverColors.length];
    }


      const y = new Animated.Value(0);
      const onScroll = Animated.event([{nativeEvent: {contentOffset: { y } } }], {
        useNativeDriver: true
      })
      return (
        <View style={styles.container}>
            <View>
              <Animated.FlatList
                  scrollEventThrottle={16}
                  data={buttons}
                  renderItem={({item, index}) => 
                    (  
                        //<View style={{backgroundColor: this.selectBgColor(index)}}>
                        <EnigmaButton bgColor={selectBgColor(index)} index={index} y={y} text={item.value} onPress={() => onPress(index)} pressColor={'red'}/>
                        //</View>
                      )}
                  keyExtractor={item => item.id}
                  {...{onScroll}}
              />
            </View>
            <StatusBar backgroundColor={'purple'}/>
        </View>
      );
  };

export default EnigmaScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'purple'
    },
})
