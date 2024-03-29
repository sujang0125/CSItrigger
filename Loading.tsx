import React from 'react';
import {StyleSheet, Text, View,ImageBackground} from "react-native";

const image = {uri: 'https://reactjs.org/logo-og.png'};

export default class Loading extends React.Component{
    render(){
        return (
            <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                <Text style={styles.text}>CSI Trigger</Text>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    image: {
      flex: 1,
      justifyContent: 'center',
    },
    text: {
      color: 'white',
      fontSize: 50,
      lineHeight: 100,
      fontWeight: 'bold',
      textAlign: 'center',
      backgroundColor: '#000000c0',
    },
});
  