import React from 'react';
import {Text, View, StatusBar} from 'react-native';
import Card from '../components/Card';
import Colors from '../constants/Colors';


const Help = ({ navigation }) => {
    return (
      <View style={{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'beige' }}>
        <Text>Help</Text>
        <StatusBar backgroundColor={Colors.secondary}/>
      </View>
    );
  };

export default Help;
