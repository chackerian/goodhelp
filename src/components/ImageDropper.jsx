import React, { useState, useEffect } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { Image, StyleSheet, Text, View } from "react-native";
import Button from './Button'
import { store, firestore } from '../../firebase.js';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

export default function ImageDropper(props) {

  const [image, setImage] = useState(null);

  const uploadImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    var filename = "images/" + "IMG" + Math.round(Math.random()*100000)

    var storageRef = ref(store, filename)

    uploadBytes(storageRef, blob).then((snapshot) => {
      getDownloadURL(ref(store, filename)).then((url) => {
        props.setImageURL(url);
        console.log("URL", url)
      })
    });

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
        Add Image
      </Button>
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: 2,
    borderStyle: 'dashed',
    borderColor: 'black',
  }
})