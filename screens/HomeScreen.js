import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { Text, TextInput } from "react-native-paper";
import Button from "./Button";
import { useNavigation } from "@react-navigation/native";

import firebase from "firebase/app";
// import 'firebase/auth';

export default function HomeScreen(props) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate("Share Food")}
          style={styles.default}
        >
          Share Food
        </Button>
        <Button
          mode="contained"
          onPress={() => navigation.navigate("Accept Food")}
          style={styles.default}
        >
          Accept Food
        </Button>
        <Button
          mode="contained"
          onPress={() => navigation.navigate("Accept Animals")}
          style={styles.default}
        >
          Adopt Animals
        </Button>
      </View>
      <View style={styles.right}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate("Share Clothes")}
          style={styles.default}
        >
          Share Clothes
        </Button>
        <Button
          mode="contained"
          onPress={() => navigation.navigate("Accept Clothes")}
          style={styles.default}
        >
          Accept Clothes
        </Button>
        <Button
          mode="contained"
          onPress={() => props.route.params.logout()}
          style={styles.default}
        >
          Logout
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: "100%",
    alignItems: "center",
    marginBottom: 24,
  },
  left: {
    paddingHorizontal: 2,
  },
  right: {
    paddingHorizontal: 2,
  },
  forgot: {
    fontSize: 13,
    color: "red",
  },
  link: {
    fontWeight: "bold",
  },
  default: {
    backgroundColor: "blue",
    width: 170,
    fontSize: 15,
  },
  container: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 150,
  },
});
