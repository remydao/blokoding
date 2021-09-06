import React from 'react';
import {Text, View, StatusBar, StyleSheet, Button, ScrollView} from 'react-native';
import Colors from '../constants/Colors';
import FlatButton from '../components/FlatButton'
import {Themes} from '../constants/Themes'

interface IProps {
  navigation: any
}

const UniverseScreen = ({ navigation }: IProps) => {

    function navigateTo(theme: Themes) {
        navigation.navigate('EnigmaScreen', {
            theme: theme,
          })
    }

  return ( 
    <ScrollView style={{flex:1}}>
      <View style={styles.container}>
        <FlatButton text="Foret" onPress={() => navigateTo(Themes.FOREST)} color="" pressColor=""/>
        <FlatButton text="Plage" onPress={() => navigateTo(Themes.BEACH)} color="" pressColor=""/>
        <FlatButton text="Ville" onPress={() => navigateTo(Themes.CITY)} color="" pressColor=""/>
        <StatusBar backgroundColor={Colors.dark_purple}/>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: Colors.turquoise,
  },
  textTitle: {
    marginBottom: 10,
    marginTop: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Pangolin-Regular',
    fontSize: 30,
  },
  text: {
    fontFamily: 'Pangolin-Regular',
    fontSize: 16,
    backgroundColor: '#FFFAFA',
    padding: 20,
    borderRadius: 50
  }

})

export default UniverseScreen;
