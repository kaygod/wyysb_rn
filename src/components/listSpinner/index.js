import React, { Component } from 'react'
import { Text, StyleSheet, View,ActivityIndicator } from 'react-native'

export default class ListSpinner extends Component {
    

    render() {
        return (
            <View style={styles.container}>
                  <ActivityIndicator size="large" color="#00ff00"></ActivityIndicator>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        height:60,
        alignItems:"center",
        justifyContent:"center"
    }
})
