import React from 'react';
import {Text, View, StatusBar, StyleSheet, Image, ScrollView, Button} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Colors from '../constants/Colors';
import AwesomeButton from "react-native-really-awesome-button";
import EngineConstants from '../constants/EngineConstants';
import { useLanguage } from '../datas/contextHooks';

interface IProps {
  navigation: any
}

const Help = ({ navigation }: IProps) => {
  const language = useLanguage().helpScreen;

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBackgroundColor(Colors.dark_purple)
    }, [])
  );

  return (
    <ScrollView style={{flex: 1, backgroundColor: 'rgba(101, 106, 234, 0.5)'}}>
      <View style={styles.container}>
        <Text style={styles.textTitle}><Image style={styles.sunStyle} source={require('../assets/sun.png')}/>{language.generalPrinciple}</Text>
        <Text style={styles.text}>{language.generalPrincipleRule}</Text>
        
        <Text style={styles.textTitle}><Image style={styles.sunStyle} source={require('../assets/sun.png')}/>{language.DiscoverMode}</Text>
        <Text style={styles.text}>{language.DiscoverModePrinciple}</Text>
        
        <Text style={styles.textTitle}><Image style={styles.sunStyle} source={require('../assets/sun.png')}/>{language.EnigmaMode}</Text>
        <Text style={{...styles.text, marginBottom: EngineConstants.MAX_HEIGHT / 50}}>{language.EnigmaModePrinciple}</Text>  
        <AwesomeButton onPress={() => navigation.navigate("HelpCards")} textColor="#2e84b2" {...styles.button}>
            <Text style={styles.buttonText}>{language.Cards}</Text>
        </AwesomeButton>
        <StatusBar backgroundColor={Colors.dark_purple}/>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  textTitle: {
    marginBottom: 10,
    marginTop: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Pangolin-Regular',
    fontSize: 30,
  },
  sunStyle: {
    width: EngineConstants.MAX_HEIGHT / 25,
    height: EngineConstants.MAX_HEIGHT / 25
  },
  text: {
    fontFamily: 'Pangolin-Regular',
    fontSize: 16,
    backgroundColor: 'rgba(101, 106, 234, 1)',
    padding: EngineConstants.MAX_HEIGHT / 50,
    borderRadius: 50
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 20,
    width: "100%" as unknown as number,
    backgroundColor:"'rgba(101, 106, 234, 1)",
    justifyContent: 'center',
    textAlignVertical:'center',
    textAlign: 'center',
  },
  
  buttonText: {
    fontSize: 18,
    fontFamily: "Pangolin-Regular",
  }

})

export default Help;
