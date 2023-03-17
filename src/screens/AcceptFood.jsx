import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, TextInput, RadioButton } from 'react-native-paper';
import { collection, query, where, getDocs } from "firebase/firestore";
import { TouchableOpacity, StyleSheet, View, FlatList, Image, ScrollView } from 'react-native';

import { firestore } from '../../firebase.js';

import Button from '../components/Button';

export default function AcceptFood(props) {

  const navigation = useNavigation();

  const setFood = async function(){
    const querySnapshot = await getDocs(collection(firestore, "food"));
    querySnapshot.forEach((doc) => {
      setLIST(LIST => [...LIST, doc.data()])
      console.log(doc.data())
    });
  }

  const [LIST, setLIST] = useState([])

  useEffect(()=> {
    setFood()
  },[])

  const empty = () => {
    return (
      <View style={styles.empty}>
      <Text></Text>
      </View>
    )
  }

  const goToListing = function(groupID){
    console.log("groupID", groupID)
    navigation.navigate('Donation Screen', {
      collectionName: 'food',
      groupID: groupID,
    })
  }

  const Item = ({title, quantity, picture, index, groupID}) => (
    <TouchableOpacity onPress={() => {goToListing(groupID)}}>
      <View style={styles.item} key={index}>
        <Image source={{uri: picture}}
          style={styles.icon}
        />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.quantity}>{quantity}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={LIST}
        scrollEnabled={true}
        ListEmptyComponent={empty}
        renderItem={({item}) => <Item title={item.title} quantity={item.quantity} picture={item.picture} groupID={item.groupID} />}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: "center",
  },
  icon: {
    width: 36,
    height: 38,
  },
  forgot: {
    fontSize: 13,
    color: "red",
  },
  link: {
    fontWeight: 'bold',
  },
  item: {
    flexDirection: "row",
    backgroundColor: '#d3d3d3',
    padding: 15,
    height: 53,
    marginVertical: 4,
    marginHorizontal: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    paddingLeft: 15,
    textTransform: 'capitalize'
  },
  quantity: {
    fontSize: 20,
    marginLeft: 'auto'
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