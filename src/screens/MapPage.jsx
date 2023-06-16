import React, { useState, useRef, useEffect } from 'react'
import { collection, query, where, getDocs, setDoc, doc } from "firebase/firestore";
import { useNavigation } from '@react-navigation/native';
import { Text, TextInput } from 'react-native-paper'
import { TouchableOpacity, StyleSheet, View, ScrollView, Switch, Image, Dimensions, FlatList } from 'react-native';

import CalendarPicker from 'react-native-calendar-picker';

import { firestore } from '../../firebase.js';

// Import for all components
import Button from '../components/Button';
import ImageDropper from '../components/ImageDropper';
import SearchLocationInput from '../components/SearchLocationInput';
import Select from '../components/Select';

export default function MapPage(props) {

  
  
  return (
    <View style={styles.container}>
        <MapView
       provider={PROVIDER_GOOGLE} // remove if not using Google Maps
       style={styles.map}
       region={{
         latitude: 37.78825,
         longitude: -122.4324,
         latitudeDelta: 0.015,
         longitudeDelta: 0.0121,
       }}
     >
     </MapView>

    </View>
  )
}

