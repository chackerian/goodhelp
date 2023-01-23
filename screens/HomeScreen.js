import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { Text, TextInput } from 'react-native-paper'
import Button from './Button';
import { useNavigation } from '@react-navigation/native';

import firebase from 'firebase/app';
// import 'firebase/auth';

export default function HomeScreen(props) {

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Button mode="contained" onPress={() => navigation.navigate("ButtonScreen")} style={styles.default}>
          Share Food
        </Button>
        <Button mode="contained" onPress={() => navigation.navigate("ButtonScreen")} style={styles.default}>
          Accept Food
        </Button>
        <Button mode="contained" onPress={() => navigation.navigate("ButtonScreen")} style={styles.default}>
          Share Clothes
        </Button>
        <Button mode="contained" onPress={() => navigation.navigate("ButtonScreen")} style={styles.default}>
          Accept Clothes
        </Button>
        <Button mode="contained" onPress={() => navigation.navigate("ButtonScreen")} style={styles.default}>
          Animal Rescue
        </Button>
        <Button mode="contained" onPress={() => navigation.navigate("ButtonScreen")} style={styles.default}>
          Adopt Animals
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'column',
    marginTop: 4,
    alignItems: 'center',
  },
  forgot: {
    fontSize: 13,
    color: "red",
  },
  link: {
    fontWeight: 'bold',
  },
  form: {
    alignItems: 'center',
    padding: 40,
    marginLeft: 80,
    marginTop: 40,
    marginRight: 120
  },
  default: {
    backgroundColor: 'blue',
    width: 300
  },
  container: {
      flex: 1,
      backgroundColor: 'white',
    },
})