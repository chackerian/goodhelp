import React, { createRef, useRef, useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { Text, TextInput, RadioButton } from 'react-native-paper';
import { TouchableOpacity, StyleSheet, View, ScrollView, Switch, Image, Dimensions } from 'react-native';
import { collection, query, where, getDocs } from "firebase/firestore";
import { Entypo } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 

import { firestore } from '../../firebase.js';

import Button from '../components/Button';

export default function DonationScreen({route}) {

 	const { collectionName, groupID } = route.params;

	const q = query(collection(firestore, "food"), where("groupID", "==", groupID));
	const [LIST, setLIST] = useState([])
	var groupData = []

	const getDetails = async function(){
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setLIST(LIST => [...LIST, doc.data()])
    });
    groupData = LIST[0]
  }

  useEffect(()=> {
    getDetails()
  },[])

  if (LIST.length > 0){
  		groupData = LIST[0]
  }

  return (
    <ScrollView style={styles.container}>
      {LIST.map((item) => {
        return (
          <View style={styles.item}>
          	<Image source={{uri: item.picture}} style={styles.icon}/>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.type}>{item.type}</Text>
            <Text style={styles.condition}>{item.condition}</Text>
            <Text style={styles.type}>{item.quantity}</Text>
          </View>
        );
      })}
      <View style={styles.centered}>
          <Text style={styles.location}>{groupData.address}</Text>
          { groupData.phoneNumber && <Feather name="phone" size={24} color="black" />}
          { groupData.email && <Entypo name="email" size={24} color="black" />}
      </View>
    </ScrollView>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
  },
  item: {
    flexDirection: "row",
    backgroundColor: '#d3d3d3',
    padding: 15,
    height: 103,
    marginVertical: 4,
    marginHorizontal: 4,
    backgroundColor: "white",
  },
  title: {
    fontSize: 20,
    paddingLeft: 15,
  },
  quantity: {
    fontSize: 20,
    marginLeft: 'auto'
  },
  icon: {
    width: 60,
    height: 65,
  },
  centered: {
    alignItems: "center",
    paddingTop: 40,
  },
	defaultsave: {
    backgroundColor: 'green',
    width: 300,
    alignItems: "center",
    marginBottom: 100,
  },
});