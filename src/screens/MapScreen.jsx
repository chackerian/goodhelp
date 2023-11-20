import React, { useEffect, useState } from 'react'
import { collection, query, where, getDocs } from 'firebase/firestore';
import { View, Text } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { firestore } from '../../firebase';

export default function MapScreen() {
  // const q = query(collection(firestore, collectionName), where("groupID", "==", groupID))
  const [LIST, setLIST] = useState([])

  const getDetails = async function(){
    const querySnapshot = await getDocs(query(collection(firestore, "food")));
    querySnapshot.forEach((doc) => {
      setLIST(LIST => [...LIST, doc.data()])
    });
  }

  useEffect(()=> {
    const fetchData = async () => {
      await getDetails();
    };
  
    fetchData();
  },[])

  return (
    <View style={{ flex: 1 }}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1 }}
        initialRegion={{
          // latitude: 37.78825,
          // longitude: -122.4324,
          latitude: 41.9338414,
          longitude: -74.0887576,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {LIST && LIST.map((report, index) => (
          report.latLng && (
            <Marker
              key={index}
              coordinate={{latitude:report.latLng.lat, longitude:report.latLng.lng}}
              title={`${report.title}`} 
              description = {`${report.address}`}>
              <Callout>
                <View>
                  <Text>Title: {report.title}</Text>
                  <Text>Type: {report.type}</Text>
                  <Text>Address: {report.address}</Text>
                  <Text>Condition: {report.condition}</Text>
                  <Text>Email: {report.email}</Text>
                </View>
              </Callout>
            </Marker>
          )
        ))}
      </MapView>
    </View>
  );
}