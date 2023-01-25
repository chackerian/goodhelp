import React, { useState, createContext, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, createSwitchNavigator, createAppContainer, createNavigatorFactory } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { auth, store } from './firebase.js';

import LoginScreen from './screens/LoginScreen.js'
import RegisterScreen from './screens/RegisterScreen.js'

import HomeScreen from './screens/HomeScreen.js'

import ShareFood from './screens/ShareFood.js'
import ShareClothes from './screens/ShareClothes.js'

import AcceptFood from './screens/AcceptFood.js'
import AcceptClothes from './screens/AcceptClothes.js'
import AcceptAnimals from './screens/AcceptAnimals.js'

export default function AuthNavigator() {

  const [user, setUser] = useState(true);

    const addUser = async (value) => {
      try {
        await AsyncStorage.setItem('user', JSON.stringify(value))
        setUser(value)
        const jsonValue = await AsyncStorage.getItem('user')
        console.log("VALUE SET", JSON.parse(jsonValue))
      } catch (e) {
        // saving error
      }
    }

    const getUser = async () => {
      try {
        AsyncStorage.getItem('user').then(value => {
          console.log("VALUE GET", JSON.parse(value))
          if (value != "null") {
            setUser(JSON.parse(value))
          }
        })
      } catch(e) {
        // error reading value
      }
    }

      useEffect(() => {
        getUser()
      }, [])

    function login(a) {
        console.log("REF")
        addUser(a)
        const userRef = store.collection('users').doc(a.email);
        console.log("REF2")
        
        userRef.get().then((doc) => {
            if (doc.exists) {
                console.log("LOGIN")
            } else {
                console.log("REGISTER USER", userRef)
                if (a.picture) {
                    userRef.set({
                        name: a.name || "",
                        email: a.email || "",
                        picture: a.picture.data.url,
                        about: "",
                        donationsMade: 0,
                        donationsAccepted: 0,
                    })
                } else {
                    console.log("CREATE")
                    userRef.set({
                        name: a.name || "",
                        email: a.email || "",
                        picture: "https://www.edmundsgovtech.com/wp-content/uploads/2020/01/default-picture_0_0.png",
                        about: "",
                        donationsMade: 0,
                        donationsAccepted: 0,
                    })
                }
            }
        })

    }

    function logout() {
        console.log("logout")
        auth.signOut()
        addUser(null)
    }

    return user ? (
    <MyTabs 
      user={user} 
      logout={logout}
      onStateChange={(state) =>
        console.log("CHANGED", state)
      }
     />
  ) : (
    <MyStack login={login} />
  )
}

const AuthStack = createStackNavigator();

function MyStack(props) {

  return (
    <NavigationContainer>
      <AuthStack.Navigator screenOptions={{
        headerShown: false
        }}>
        <AuthStack.Screen name="LoginScreen" component={LoginScreen} options={{ title: 'Goodhelp - Login' }} initialParams={{login: props.login}} />
        <AuthStack.Screen name="RegisterScreen" component={RegisterScreen} options={{ title: 'Goodhelp - Register' }} initialParams={{login: props.login}} />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}

const AppStack = createStackNavigator();

function MyTabs(props) {

    return (
      <NavigationContainer>
        <AppStack.Navigator
          initialRouteName="Home"
        >
        <AppStack.Screen
          name="Home"
          component={HomeScreen}
          initialParams={{user: props.user, logout: props.logout}}
          options={{
            title: 'Home',
          }}
        />
        <AppStack.Screen
          name="Share Food"
          component={ShareFood}
          initialParams={{user: props.user, logout: props.logout}}
        />
        <AppStack.Screen
          name="Share Clothes"
          component={ShareClothes}
          initialParams={{user: props.user, logout: props.logout}}
        />
        <AppStack.Screen
          name="Accept Food"
          component={AcceptFood}
          initialParams={{user: props.user, logout: props.logout}}
        />
        <AppStack.Screen
          name="Accept Clothes"
          component={AcceptClothes}
          initialParams={{user: props.user, logout: props.logout}}
        />
        <AppStack.Screen
          name="Adopt Animals"
          component={AcceptAnimals}
          initialParams={{user: props.user, logout: props.logout}}
        />
      </AppStack.Navigator>
    </NavigationContainer>
    );
}
