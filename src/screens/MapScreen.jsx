import React, { useEffect, useState } from 'react'
import { collection, query, getDocs } from 'firebase/firestore';
import { View, Text } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { firestore } from '../../firebase';

export default function MapScreen({route}) {
  const { fromScreen } = route.params;
  
  const [LIST, setLIST] = useState([])
  
  const getDetails = async function(){
    const querySnapshot = await getDocs(query(collection(firestore, fromScreen)));
    const newList = querySnapshot.docs.map((doc) => doc.data());
    setLIST(newList);
  }

  useEffect(()=> {
    const fetchData = async () => {
      await getDetails();
    };
  
    fetchData();
  },[fromScreen])

  return (
    <View style={{ flex: 1 }}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1 }}
        initialRegion={{
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