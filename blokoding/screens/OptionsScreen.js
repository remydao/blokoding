import React from 'react';
import {Text, View, StatusBar} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Card from '../components/Card';
import Colors from '../constants/Colors';


const Options = ({ navigation }) => {
    return (
      <View style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor:'beige' }}>
        <Text style={{ paddingTop: 20}}>
          Langue
        </Text>
        <Picker
          style={{ height: 50, width: 150 }}
          dropdownIconColor="black" >
          <Picker.Item label="English" value="en"/>
          <Picker.Item label="Français" value="fr"/>
        </Picker>
        <StatusBar backgroundColor={Colors.secondary}/>
      </View>
    );
  };

export default Options;
