/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  TouchableOpacity,
  View,
} from 'react-native';
import Loading from "./Loading";
import Main from "./Main"

type SectionProps = PropsWithChildren<{
  title: string;
}>;

export default class App extends React.Component{
  state={
    isLoading : true
  };
  componentDidMount= async() => {  
    // 1,000가 1초
    setTimeout(() => {this.setState({isLoading: false})},3000);
  }

  render(){
    if(this.state.isLoading){
      return <Loading/>
    }else{
      return <Main />;
    }
  }
}  

// function App(): JSX.Element {
  
//   const [count, setCount] = useState(0);
//   const onPress = () => setCount(count => count + 1);
  
//   return (
//     <SafeAreaView style={styles.background}>
//       <Text style={styles.sectionTitle}>this is main event</Text>
//       <TouchableOpacity style={styles.buttonstyle} onPress={onPress}>
//         <Text>Press Here</Text>
//       </TouchableOpacity>
//       <Text>count : {count}</Text>
//     </SafeAreaView>
//   );
// }

const styles = StyleSheet.create({
  background: {
    marginTop: 32,
    alignItems: 'center',
  },
  buttonstyle: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    color: 'blue'
  },
  sectionTitle: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

// export default App;
