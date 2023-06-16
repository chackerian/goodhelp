import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, TextInput, RadioButton } from 'react-native-paper';
import { collection, query, where, getDocs } from "firebase/firestore";
import { TouchableOpacity, StyleSheet, View, FlatList } from 'react-native';

import { firestore } from '../../firebase.js';
import moment from "moment";

import Button from '../components/Button';

export default function AcceptClothes(props) {

  const navigation = useNavigation();
  const [LIST, setLIST] = useState([])
  const setClothes = async function(){
    const querySnapshot = await getDocs(collection(firestore, "clothes"));
    querySnapshot.forEach((doc) => {
      setLIST(LIST => [...LIST, doc.data()])
    });
  }

  useEffect(()=> {
    setClothes()
  },[])

  const empty = () => {
    return (
      <View style={styles.empty}>
      <Text></Text>
      </View>
    )
  }

  const getTime = (date) => {
    var dates = new Date(date.seconds * 1000 + date.nanoseconds/1000000)
    let result = moment(dates).fromNow();
    const now = moment();
    const minutes = now.diff(dates, 'minutes');
    const days = now.diff(dates, 'days');
    const weeks = now.diff(dates, 'weeks');
    if (days >= 7) {
      if (days <= 13) {
        result = `a week ago`;
      } else if (days > 13 && days <= 25) {
        result = `${weeks} weeks ago`;
      }
    }
    return result;
  };

  const Item = ({title, quantity, picture, dateCreated, index}) => (
    <View style={styles.item} key={index}>
      <Image source={{uri: picture}}
        style={styles.icon}
      />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.date}>{getTime(dateCreated)}</Text>
      <Text style={styles.quantity}>{quantity}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={LIST}
        ListEmptyComponent={empty}
        renderItem={({item}) => <Item title={item.title} quantity={item.quantity} picture={item.picture} dateCreated={item.dateCreated} />}
        keyExtractor={item => item.id}
      />
    </View>
  )
}


const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: "left",
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
  date: {
    fontSize: 13,
    paddingLeft: 8,
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