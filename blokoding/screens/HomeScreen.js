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
        backgroundColor:'purple',
        margin:-1,}}>
        <Image
          source={require("../assets/icon.png")}
          style={{ width: 200, height: 200}}
          resizeMode="stretch"/>
            <View style={styles.button}>
              <Button
                  title="Start"
                  color={Colors.secondary}
                  onPress={() =>
                  navigation.navigate('Take Picture')}/>
              </View>
            <View style={styles.button}>
              <Button
                  title="Help"
                  color={Colors.secondary}
                  onPress={() =>
                  navigation.navigate('Help')}
                  />
            </View>
            <View style={styles.button}>
              <Button
                  title="Options"
                  color={Colors.secondary}
                  onPress={() =>
                  navigation.navigate('Options')}
                  />
            </View>
        <StatusBar backgroundColor={Colors.primary}/>
      </View>
    );
  };

const styles = StyleSheet.create({
  button:{
    marginVertical: 3,
    width:"100%",
  }
})

export default Home;
