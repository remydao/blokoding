import React, {useState, useEffect} from 'react';
import {Text, View, StatusBar, StyleSheet, FlatList} from 'react-native';
import Colors from '../constants/Colors';
import Card from '../components/Card';
import {default as UUID} from "uuid"; 

const Result = ({ route, navigation }) => {

    const [textList, setTextList] = useState([]);

    let visionResp = route.params.visionResp; 

    useEffect(() => {
        let listOfObject = []
        visionResp.forEach(elem => listOfObject.push({id: UUID.v4(), value: elem.text}))
        setTextList(listOfObject);
    }, [])
    
    visionResp.forEach(element => {
        console.log(element);
    });

    return (
      <View style={styles.container}>
          <View>
            <FlatList
                data={textList}
                renderItem={({item}) => <Card style={styles.card}><Text>{item.value}</Text></Card>}
                keyExtractor={item => item.id}
            />
          </View>
          <StatusBar backgroundColor={Colors.azure}/>
      </View>

    );
  };


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'gray'
    },
    card:{
        margin:10
    }
})

export default Result;