import React, {useState, useEffect, useReducer} from 'react';
import {Text, View, StatusBar, StyleSheet, FlatList, Pressable, Animated} from 'react-native';
import uuid from 'react-native-uuid';
import Colors from '../constants/Colors';
import LevelButton from '../components/LevelButton';
import {tutorialInfo} from '../constants/TutorialDetails'
import { useLanguage } from '../datas/contextHooks';
import {loadSound} from '../scripts/sound/sound'
import SoundContext from '../context/SoundContext';

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
const Discover = ({navigation, route}: IProps) => {
    const [buttons, setButtons] = useState<IState[]>([]);
    const language = useLanguage();
    const soundContext = React.useContext(SoundContext);

    const setLevel = () => {
      let btns = [...buttons];
      //numberOfLevels
      let numberOfLevels = tutorialInfo.length;
      for (let i = 0; i < numberOfLevels; i++)
      {
          const levelTitle = language.level + ' ' + (i + 1)
          btns.push({ id: uuid.v4(), value: levelTitle })
      }
      setButtons(btns);
    }

    useEffect(() => {
      setLevel();
    }, [])

    const onPress = (index: number) => {
      loadSound("buttonclick.mp3", false, soundContext.isMuted ? 0 : 1);
      navigation.navigate('LevelScreen', {
        levelNumber: index,
        levelType: 'tutorial',
        language: language
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
                      <LevelButton bgColor={selectBgColor(index)} index={index} y={y} text={item.value} onPress={() => onPress(index)} pressColor={'red'}/>
                    )}
                  keyExtractor={item => item.id}
                  {...{onScroll}}
              />
            </View>
            <StatusBar backgroundColor={Colors.azure}/>
        </View>
      );
  };

export default Discover;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.azure
    },
})
