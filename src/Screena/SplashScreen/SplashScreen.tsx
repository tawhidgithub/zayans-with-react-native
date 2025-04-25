import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import logoImg from '../../assets/logo/img4.png';
// navigate
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';

type SplashScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'SplashScreen'
>;

const SplashScreen = ({navigation}: SplashScreenProps) => {
  useEffect(() => {
    const TimeOut = setTimeout(() => {
      navigation.replace('Home', {
        userId: '100',
      });
    }, 3000);
  });

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={logoImg} />
      <Text style={styles.text}>Zayans</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 70,
    width: 70,
  },
  text: {
    marginTop: 10,
    fontSize: 20,
    color: 'blue',
    fontWeight: '900',
  },
});
