import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import TcpSocket from 'react-native-tcp-socket';
import socketInfo from './Utils';
import SoundPlayer from 'react-native-sound-player'

/* sound file location downloaded from https://www.soundjay.com/beep-sounds-1.html
/android/app/src/main/res/raw/beep01.wav
/android/app/src/main/res/raw/beep02.wav */


// const soundPlay = () => {
//     try {
//       // play the file beep-01.wav
//       SoundPlayer.playSoundFile('beep02', 'wav')
//       console.log(`play the sound file`)
//       // or play from url
//       // SoundPlayer.playUrl('URL')
//   } catch (e) {
//       console.log(`cannot play the sound file`, e)
//   }
// }

function Main(): JSX.Element {
  
  const [socketState, setSocketState] = useState<string>("starting");
  const [recvdata, setRecvdata] = useState<string>("");
  const sInfo = new socketInfo();
  
  const options = {
    port: sInfo.port,
    host: sInfo.addr,
    // localAddress: '127.0.0.1',
    reuseAddress: true,
    // localPort: 10000,
    // interface: "wifi",
  };

  const socketConnect = () => {
    // Create socket
    const client = TcpSocket.createConnection(options, () => {
      // Write on the socket
      client.write('1');
      console.log("Hello server")
      setSocketState(socketState => 'Hello server!');

      // Close socket
      // client.destroy();
      // setSocketState(socketState => 'destroyed!');
    });

    client.on('data', function(data) {
      console.log('message was received', data);
      setSocketState(socketState => String(data));
      setRecvdata(recvdata => String(data));
    });

    client.on('error', function(error) {
      console.log(error);
      setSocketState(socketState => "error");
    });

    client.on('close', function(){
      console.log('Connection closed!');
      // setSocketState(socketState => "Connection closed!");
    });

    SoundPlayer.playSoundFile('beep01', 'wav')
  }
  
  return (
    <SafeAreaView style={styles.safearea}>
        <View style={styles.background}>
          <TouchableOpacity style={styles.buttonstyle} onPress={socketConnect}>
            <Text style={styles.buttontext}>socket connection</Text>
          </TouchableOpacity>
          <Text style={styles.buttontext}>socket state : {socketState}</Text>
          <Text style={styles.buttontext}>recvdata : {recvdata}</Text>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    safearea: {
      flex: 1,
      backgroundColor: `cornflowerblue`,
    },
    background: {
      flex: 1,
      marginTop: 32,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonstyle: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: 'darkorange',
        width: 300,
        height: 80,
        borderRadius: 25,
        justifyContent: 'center',
    },
    buttontext: {
        alignItems: 'center',
        fontSize: 25,
        color: 'white',
        fontWeight: 'bold',
    },
  });

  export default Main;