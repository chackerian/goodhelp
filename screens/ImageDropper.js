import React, { useState, useEffect } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { Image, StyleSheet, Text, View } from "react-native";
import Button from './Button'
import { store } from '../firebase.js';

export default function ImageDropper(props) {

  const [image, setImage] = useState(null);
  const [url, setImageURL] = useState("");

  const uploadImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    var filename = "images/" + "IMG" + Math.round(Math.random()*100000)

    var refs = firebase.storage().ref().child(filename);
    refs.put(blob).then((snapshot) => {
      firebase.storage().ref(filename).getDownloadURL()
        .then((url) => {
          setImageURL(url);
          var user = props.route.params.user.email
          console.log("URL", url)
          firebase.firestore().collection('users').doc(user).update({
            picture: url
          })
      })

    })

  }

  let openImagePicker = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    setImage(pickerResult.uri);

    if (!pickerResult.cancelled) {
      uploadImage(pickerResult.uri)
    }
  }


  return (
      <View style={styles.container}
        onClick={openImagePicker}
      >
      <Button
        mode="outlined"
        color="black"
        onPress={openImagePicker}>
        Upload Image
      </Button>
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 30,
    minHeight: 100,
    borderRadius: 2,
    borderStyle: 'dashed',
    borderColor: 'black',
  }
})