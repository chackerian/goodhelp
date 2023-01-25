import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View, Switch } from 'react-native'
import { Text, TextInput, RadioButton } from 'react-native-paper'
import Button from './Button';
import { useNavigation } from '@react-navigation/native';

import { store } from '../firebase.js';

export default function AcceptClothes(props) {

  const navigation = useNavigation();
  const [showForm, setShowForm] = useState(false)

  function onAddItem(){
    setShowForm(true)
  }

  return (
    <View style={styles.container}>
      <Button mode="contained" onPress={onAddItem} style={styles.default}>
          Add Item
      </Button>
      {showForm ? ( 
      <View>
        
      </View>
      ) : null}

    </View>
  )
}

// title
// category
// quantity
// condition
// date of listing created
// date and time of donation
// do they deliver?
// address

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
    padding: 0,
    marginLeft: 20,
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