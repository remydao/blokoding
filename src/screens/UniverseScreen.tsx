import React from 'react';
import {Text, View, StatusBar, StyleSheet, Image, ScrollView, TouchableOpacity, TouchableHighlight} from 'react-native';
import Colors from '../constants/Colors';
import FlatButton from '../components/FlatButton';
import {Themes} from '../constants/Themes';
import EngineConstants from '../constants/EngineConstants';
import Backgrounds from '../constants/Themes';

interface IProps {
  navigation: any
}

const UniverseButton = ({textButton, image, onPress} : any) => {

  const [opacity, setOpacity] = React.useState(0.5);

  return (
    <TouchableHighlight onPressIn={() => setOpacity(1)}
                        onPressOut={() => setOpacity(0.5)}
                        onPress={onPress} style={styles.buttonStyle}>
      <View>
        <View style={styles.textWrapper}>
          <Text style={styles.text}>{textButton}</Text>
        </View>
        <View style={{opacity: opacity}}>
          <Image source={image} style={styles.image}/>
          <View style={styles.overlay}></View>
        </View>
      </View>
    </TouchableHighlight>
  )
}

const UniverseScreen = ({ navigation }: IProps) => {

    function navigateTo(theme: Themes) {
        navigation.navigate('EnigmaScreen', {
            theme: theme,
          })
    }

  return ( 
    <ScrollView style={{flex:1, backgroundColor: Colors.turquoise}}>
      <View style={styles.container}>
        <UniverseButton textButton="Foret" image={Backgrounds.ForestFall.background1} onPress={() => navigateTo(Themes.FOREST)}/>
        <UniverseButton textButton="Plage" image={Backgrounds.Beach.background2} onPress={() => navigateTo(Themes.BEACH)}/>
        <UniverseButton textButton="Ville" image={Backgrounds.City.background2} onPress={() => navigateTo(Themes.CITY)}/>
        <StatusBar backgroundColor={"darkorange"}/>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  textTitle: {
    marginBottom: 10,
    marginTop: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Pangolin-Regular',
    fontSize: 30,
  },
  buttonStyle: {
  },
  overlay: {
    position: 'absolute',
    height: EngineConstants.MAX_HEIGHT / 3,
    width: "100%",
    backgroundColor: 'black',
    opacity: 0.4
  },
  textWrapper: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    height: EngineConstants.MAX_HEIGHT / 3,
    zIndex: 10,
  },
  text: {
    fontFamily: 'Pangolin-Regular',
    fontSize: 50,
    padding: 20,
    borderRadius: 50,
    zIndex: 10,
    color: 'white',
  },
  image: {
    height: EngineConstants.MAX_HEIGHT / 3,
    width: '100%',
  }
})

export default UniverseScreen;
