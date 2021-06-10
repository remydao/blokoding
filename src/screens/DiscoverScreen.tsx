import React from 'react';
import {Text, View, StatusBar, StyleSheet, FlatList, Pressable, Animated} from 'react-native';
import {default as UUID} from "uuid"; 
import Colors from '../constants/Colors';
import LevelButton from '../components/LevelButton';

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
  buttons: Array<{id: string, value: string}>
}

class Discover extends React.Component<IProps, IState> {

    constructor(props: IProps){
      super(props)
      this.state = {
        buttons : []
      }
    }

    setLevel = () => {
      let btns = [...this.state.buttons];
      //numberOfLevels
      for (let i = 0; i < 30; i++)
      {
          const levelTitle = "Niveau " + (i + 1)
          btns.push({id:UUID.v4(), value:levelTitle})
      }
      this.setState({
        buttons: btns
      })
    }

    componentDidMount = () => {
      this.setLevel()
    }

    onPress = (index: number) => {
      this.props.navigation.navigate('LevelScreen', {
        levelNumber: index
      })
    }

    selectBgColor = (index: number) => {
      return DiscoverColors[index % DiscoverColors.length];
    }

    render(){
      const y = new Animated.Value(0);
      const onScroll = Animated.event([{nativeEvent: {contentOffset: { y } } }], {
        useNativeDriver: true
      })
      return (
        <View style={styles.container}>
            <View>
              <Animated.FlatList
                  scrollEventThrottle={16}
                  data={this.state.buttons}
                  renderItem={({item, index}) => 
                    (  
                        //<View style={{backgroundColor: this.selectBgColor(index)}}>
                        <LevelButton bgColor={this.selectBgColor(index)} index={index} y={y} text={item.value} onPress={() => this.onPress(index)} pressColor={'red'}/>
                        //</View>
                      
                      )}
                  keyExtractor={item => item.id}
                  {...{onScroll}}
              />
            </View>
            <StatusBar backgroundColor={Colors.azure}/>
        </View>
      );
    }
  };

export default Discover;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.azure
    },
})
