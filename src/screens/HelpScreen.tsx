import React from 'react';
import {Text, View, StatusBar, StyleSheet, Image, ScrollView} from 'react-native';
import Colors from '../constants/Colors';
interface IProps {
  navigation: any
}

const Help = ({ navigation }: IProps) => {
  return (
    <ScrollView style={{flex:1}}>
      <View style={styles.container}>
        <Text style={styles.textTitle}><Image style={{width:30, height:30}}source={require('../assets/sun.png')}/> Principe général</Text>
        <Text style={styles.text}>Blokoding fonctionne de la manière suivante : vous prenez une photographie des cartes que vous ordonnez de manière à faire un programme. L'application se charge de déchiffer les cartes et de créer le programme et le lancer.</Text>
        
        <Text style={styles.textTitle}><Image style={{width:30, height:30}}source={require('../assets/sun.png')}/> Mode Découverte</Text>
        <Text style={styles.text}>Le mode découverte est un tutoriel. Il permet de se familiariser avec les principes de Blokoding. Il est fortement recommandé de suivre ce mode pour bien comprendre le jeu.</Text>
        
        <Text style={styles.textTitle}><Image style={{width:30, height:30}}source={require('../assets/sun.png')}/> Mode Enigme</Text>
        <Text style={styles.text}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam debitis odit rem eos ipsam molestias! Officiis labore distinctio voluptas, deleniti perspiciatis, earum magnam, ab laboriosam dolorum ratione consequuntur alias doloribus!</Text>

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

export default Help;
