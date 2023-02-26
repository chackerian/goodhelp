import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View, FlatList } from 'react-native'
import { Text, TextInput, RadioButton } from 'react-native-paper'
import Button from './Button';
import { useNavigation } from '@react-navigation/native';
import { collection, query, where, getDocs } from "firebase/firestore";

import { firestore } from '../firebase.js';

export default function AcceptClothes(props) {

  const navigation = useNavigation();
  const [LIST, setLIST] = useState([])
  const setClothes = async function(){
    const querySnapshot = await getDocs(collection(firestore, "clothes"));
    querySnapshot.forEach((doc) => {
      setLIST(LIST => [...LIST, doc.data()])
    });
  }

  const empty = () => {
    return (
      <View style={styles.empty}>
      <Text></Text>
      </View>
    )
  }

  const Item = ({title, quantity, picture, index}) => (
    <View style={styles.item} key={index}>
      <Image source={{uri: picture}}
        style={styles.icon}
      />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.quantity}>{quantity}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={LIST}
        ListEmptyComponent={empty}
        renderItem={({item}) => <Item title={item.title} quantity={item.quantity} picture={item.picture} />}
        keyExtractor={item => item.id}
      />
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