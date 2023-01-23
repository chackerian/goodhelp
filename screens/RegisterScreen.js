import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { Text, TextInput } from 'react-native-paper'
import Button from './Button';
import { useNavigation } from '@react-navigation/native';

import firebase from 'firebase/app';
import 'firebase/auth';

export default function RegisterScreen(props) {
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })

  const navigation = useNavigation();

    const createUser = async (email, password, name, location) => {
     firebase.auth().createUserWithEmailAndPassword(email, password)
     .then((userCredential) => {
       const user = userCredential.user;
       if(user) {
        var newUser = {
          name: name,
          email: email,
          location: location,
        }
        props.route.params.login(newUser);
       }

     })
     .catch((e) => {
      console.log(" error happened ", e)
     })
  }

  const onSignUpPressed = () => {
    const email = route.params.email
    const password = route.params.password
    const name = route.params.name
    const location = route.params.location
    console.log(email, password, name, location)
    createUser(email, password, name, location, tags)
  }

  return (
    <View style={styles.container}>
      <View style={styles.form}>
      <Text style={styles.logo}>Good Help</Text>
      <TextInput
          label="Name"
          returnKeyType="done"
          theme={{ colors: { primary: 'blue',underlineColor:'transparent',}}}
          style={{ width: 300 }}
          value={password.value}
          onChangeText={(text) => setPassword({ value: text, error: '' })}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry
        />
        <TextInput
          label="Location"
          returnKeyType="done"
          theme={{ colors: { primary: 'blue',underlineColor:'transparent',}}}
          style={{ width: 300 }}
          value={password.value}
          onChangeText={(text) => setPassword({ value: text, error: '' })}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry
        />
        <TextInput
          label="Email"
          returnKeyType="next"
          theme={{ colors: { primary: 'blue',underlineColor:'transparent',}}}
          style={{ width: 300 }}
          value={email.value}
          onChangeText={(text) => setEmail({ value: text, error: '' })}
          error={!!email.error}
          errorText={email.error}
          autoCapitalize="none"
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
        />
        <TextInput
          label="Password"
          returnKeyType="done"
          theme={{ colors: { primary: 'blue',underlineColor:'transparent',}}}
          style={{ width: 300 }}
          value={password.value}
          onChangeText={(text) => setPassword({ value: text, error: '' })}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry
        />
      </View>
      <View style={styles.row}>
        <Button mode="contained" onPress={onSignUpPressed} style={styles.default}>
          Register
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'column',
    marginTop: 4,
    alignItems: 'center',
  },
  link: {
    fontWeight: 'bold',
  },
  form: {
    alignItems: 'center',
    padding: 40,
    marginLeft: 80,
    marginTop: 40,
    marginRight: 120
  },
  logo: {
    fontWeight: "bold",
    color: "white",
    width: 200,
    marginBottom: 40,
    fontSize: 40,
    backgroundColor: "blue",
  },
  default: {
    backgroundColor: 'green',
    width: 300
  },
  container: {
      flex: 1,
      backgroundColor: 'white',
    },
})