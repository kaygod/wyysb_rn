import AsyncStorage from '@react-native-community/async-storage';

export default {

    getData (key){
       return AsyncStorage.getItem(key)
    },
    storeData(key,value){

        return AsyncStorage.setItem(key,value);

    }

}