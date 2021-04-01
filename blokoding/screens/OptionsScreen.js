import React from 'react';
import {Text, View, StatusBar} from 'react-native';
import Card from '../components/Card';
import Colors from '../constants/Colors';


const Options = ({ navigation }) => {
    return (
      <View style={{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'beige' }}>
        <Text>Options</Text>
        <StatusBar backgroundColor={Colors.secondary}/>
      </View>
    );
  };

export default Options;
