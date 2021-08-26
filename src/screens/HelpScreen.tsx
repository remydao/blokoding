import React from 'react';
import {Text, View, StatusBar, StyleSheet, Image} from 'react-native';
import Colors from '../constants/Colors';

interface IProps {
  navigation: any
}

const Help = ({ navigation }: IProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>{"\n"}Principe général</Text>
      <Text>Blokoding fonctionne de la manière suivante : vous prenez une photographie des cartes que vous ordonnez de manière à faire un programme. L'application se charge de déchiffer les cartes et de créer le programme et le lancer.</Text>
      
      <Text style={styles.textTitle}>{"\n"}Mode Découverte</Text>
      <Text>Le mode découverte est un tutoriel. Il permet de se familiariser avec les principes de Blokoding. Il est fortement recommandé de suivre ce mode pour bien comprendre le jeu.</Text>
      
      <Text style={styles.textTitle}>{"\n"}Mode Enigme</Text>
      <Text></Text>

      <StatusBar backgroundColor={Colors.dark_purple}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: Colors.turquoise 
  },
  textTitle: {
    fontWeight: 'bold'
  }

})

export default Help;
