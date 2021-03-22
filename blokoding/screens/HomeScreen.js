import React from 'react';
import {View, Image, Button, StatusBar} from 'react-native';
import Card from '../components/Card';
import Colors from '../constants/Colors';


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
            <Button
                title="Start"
                color={Colors.secondary}
                onPress={() =>
                navigation.navigate('Take Picture')}/>
          </Card>
  
        <StatusBar backgroundColor={Colors.secondary}/>
      </View>
    );
  };

export default Home;