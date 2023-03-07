import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { Text, TextInput } from 'react-native-paper'
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';

import { auth } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function RegisterScreen(props) {
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigation = useNavigation();

    const createUser = async (email, password, name, location) => {
     createUserWithEmailAndPassword(auth, email, password)
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
    // check all the input data is valid and then createUser
    console.log(email, password, name, location)
    createUser(email, password, name, location)
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
          onChangeText={(text) => setName(text)}
          error={!!password.error}
          errorText={password.error}
        />
        <TextInput
          label="Location"
          returnKeyType="done"
          theme={{ colors: { primary: 'blue',underlineColor:'transparent',}}}
          style={{ width: 300 }}
          onChangeText={(text) => setLocation(text)}
          error={!!password.error}
          errorText={password.error}
        />
        <TextInput
          label="Email"
          returnKeyType="next"
          theme={{ colors: { primary: 'blue',underlineColor:'transparent',}}}
          style={{ width: 300 }}
          onChangeText={(text) => setEmail(text)}
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
          onChangeText={(text) => setPassword(text)}
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