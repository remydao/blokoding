import React, {useState, useEffect, useReducer} from 'react';
import {Text, View, StatusBar, StyleSheet, FlatList, Pressable, Animated} from 'react-native';
import {default as UUID} from "uuid"; 
import EnigmaButton from '../components/EnigmaButton';
import Colors from '../constants/Colors';
import { useLanguage } from '../datas/GetLanguage';

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
    const language = useLanguage()

    const setLevel = () => {
      let btns = [...buttons];
      //numberOfLevels
      for (let i = 0; i < 30; i++)
      {
          const levelTitle = language.enigma + ' ' + (i + 1)
          btns.push({id:UUID.v4(), value:levelTitle})
      }
      setButtons(btns);
    }

    useEffect(() => {
      setLevel();
    }, [])

    const onPress = (index: number) => {
      loadSound("buttonclick.mp3", false);
      navigation.navigate('LevelScreen', {
        levelNumber: index,
        levelType: 'enigma'
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
