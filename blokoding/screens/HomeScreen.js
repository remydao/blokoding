import React from 'react';
import {View, Image, Button, StatusBar} from 'react-native';
import Card from '../components/Card';
import Colors from '../constants/Colors';
import { StyleSheet } from 'react-native';


const Home = ({ navigation }) => {
    return (
      <View style={{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'beige' }}>
        <Image
          source={require("../assets/icon.png")}
          style={{ width: 200, height: 200}}
          resizeMode="stretch"/>
          <Card>
            <View style={{ marginVertical: 10 }}>
              <Button
                  title="Start"
                  color={Colors.secondary}
                  onPress={() =>
                  navigation.navigate('Take Picture')}/>
              </View>
            <View style={{ marginVertical: 10 }}>
              <Button
                  title="Help"
                  color={Colors.secondary}
                  onPress={() =>
                  navigation.navigate('Help')}
                  />
            </View>
            <View style={{ marginVertical: 10 }}>
              <Button
                  title="Options"
                  color={Colors.secondary}
                  onPress={() =>
                  navigation.navigate('Options')}
                  />
            </View>
          </Card>
        <StatusBar backgroundColor={Colors.secondary}/>
      </View>
    );
  };

export default Home;
