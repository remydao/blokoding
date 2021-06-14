import AsyncStorage from '@react-native-async-storage/async-storage';

const storeIsDoneList = async (value: boolean[]) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('@isDoneList', jsonValue)
    } catch (e) {
        throw 'Fail to store isDoneList in localstorage';
    }
}

const getIsDoneList = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@isDoneList')
      return jsonValue != null ? JSON.parse(jsonValue) : Array(1000).fill(false);
    }
    catch (e) {
        throw 'Fail to load isDoneList from localstorage';
    }
}

export {storeIsDoneList, getIsDoneList}