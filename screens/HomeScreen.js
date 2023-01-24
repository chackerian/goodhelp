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
        <View style={styles.leftt}>
          <Button mode="contained" onPress={() => navigation.navigate("ButtonScreen")} style={styles.default}>
            Share Food
          </Button>
          <Button mode="contained" onPress={() => navigation.navigate("ButtonScreen")} style={styles.default}>
            Accept Food
          </Button>
          <Button mode="contained" onPress={() => navigation.navigate("ButtonScreen")} style={styles.default}>
            Adopt Animals
          </Button>
        </View>
        <View style={styles.right}>
          <Button mode="contained" onPress={() => navigation.navigate("ButtonScreen")} style={styles.default}>
            Share Clothes
          </Button>
          <Button mode="contained" onPress={() => navigation.navigate("ButtonScreen")} style={styles.default}>
            Accept Clothes
          </Button>
          <Button mode="contained" onPress={() => props.route.params.logout()} style={styles.default}>
          Logout
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
  left: {
    flex: 0.4,
  },
  right: {
    flex: 0.6,
  },
  forgot: {
    fontSize: 13,
    color: "red",
  },
  link: {
    fontWeight: 'bold',
  },
  default: {
    backgroundColor: 'blue',
    width: 300
  },
  container: {
    flexDirection: "row",
    justifyContent:'center',
    height: 100,
    padding: 20,
    width: '100%',
  },
})