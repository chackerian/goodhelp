import React, { createRef, useRef, useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { Text, TextInput, RadioButton } from 'react-native-paper';
import { TouchableOpacity, StyleSheet, View, ScrollView, Switch, Image, Dimensions, Linking } from 'react-native';
import { collection, query, where, getDocs } from "firebase/firestore";
import { Entypo } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 

import { firestore } from '../../firebase.js';
import moment from "moment";

import Button from '../components/Button';

export default function DonationScreen({route}) {

 	const { collectionName, groupID } = route.params;

	const q = query(collection(firestore, collectionName), where("groupID", "==", groupID));
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

  const phoneDetails = function(){
  	return(
  		<TouchableOpacity onPress={() => {Linking.openURL('tel:'+groupData.phoneNumber)}} >
  			<Feather name="phone" size={24} color="black" /> 
  		</TouchableOpacity>
  	)
  }

  const emailDetails = function(){
  	return(
  		<TouchableOpacity onPress={() => {Linking.openURL('mailto:'+groupData.email)}} >
  			<Entypo name="email" size={24} color="black" />
  		</TouchableOpacity>
  	)
  }

  return (
    <ScrollView style={styles.container}>
      {LIST.map((item) => {
        var startDate = new Date(item.startDate.seconds * 1000 + item.startDate.nanoseconds/1000000)
        var endDate = new Date(item.endDate.seconds * 1000 + item.endDate.nanoseconds/1000000)
        return (
          <View style={styles.item}>
          	<Image source={{uri: item.picture}} style={styles.icon}/>
            <Text style={styles.title}>{item.title}</Text>
            <View>
            	<Text style={styles.type}>{item.type}</Text>
            	<Text style={styles.condition}>{item.condition}</Text>
            	<Text style={styles.quantity}>{item.quantity}</Text>
              <Text style={styles.start}>{moment(startDate).format("dddd, MMMM Do YYYY")}</Text>
              <Text style={styles.end}>{moment(endDate).format("dddd, MMMM Do YYYY")}</Text>
            </View>
          </View>
        );
      })}
      <View style={styles.contact}>
          <Text style={styles.location}>{groupData.address}</Text>
          { groupData.phoneNumber && phoneDetails()}
          { groupData.email && emailDetails()}
      </View>
    </ScrollView>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
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
    fontSize: 14,
    marginLeft: 'auto',
  },
  type: {
    fontSize: 14,
    marginLeft: 20,
  },
  condition: {
    fontSize: 14,
    marginLeft: 20,
  },
  icon: {
    width: 60,
    height: 65,
  },
  contact: {
    alignItems: "center",
    flexDirection: "row",
    paddingTop: 40,
  },
	defaultsave: {
    backgroundColor: 'green',
    width: 300,
    alignItems: "center",
    marginBottom: 100,
  },
});