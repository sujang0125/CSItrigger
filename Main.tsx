import React, { useState } from 'react';
import { StyleSheet, Text, SafeAreaView, TouchableOpacity} from 'react-native';
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
    <SafeAreaView style={styles.background}>
      <Text style={styles.sectionTitle}>this is main event</Text>
      <TouchableOpacity style={styles.buttonstyle} onPress={socketConnect}>
        <Text style={styles.buttontext}>socket connection</Text>
      </TouchableOpacity>
      <Text style={styles.buttontext}>socket state : {socketState}</Text>
      <Text style={styles.buttontext}>recvdata : {recvdata}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    background: {
        marginTop: 32,
        alignItems: 'center',
    },
    buttonstyle: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: 'blue',
        width: 200,
        height: 30,
    },
    buttontext: {
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold',
    },
    sectionTitle: {
        textAlign: 'center',
        fontSize: 26,
        fontWeight: '600',
    },
  });

  export default Main;