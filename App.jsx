import { StatusBar } from 'expo-status-bar';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState, createContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer, createSwitchNavigator, createAppContainer, createNavigatorFactory } from '@react-navigation/native';
import { Button } from 'react-native';
import { auth, store } from './firebase.js';

//  Import of all screens
import ShareFood from './src/screens/ShareFood'
import ShareClothes from './src/screens/ShareClothes'
import PostAnimals from './src/screens/PostAnimals'

import AcceptFood from './src/screens/AcceptFood'
import AcceptClothes from './src/screens/AcceptClothes'
import AcceptAnimals from './src/screens/AcceptAnimals'

import DonationScreen from './src/screens/DonationScreen'

import HomeScreen from './src/screens/HomeScreen'
import LoginScreen from './src/screens/LoginScreen'
import RegisterScreen from './src/screens/RegisterScreen'

import MapScreen from './src/screens/MapScreen'

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
        addUser(a)
        const userRef = store.collection('users').doc(a.email);

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
        auth.signOut()
        addUser(null)
    }

    return (
      <NavigationContainer>
        {user ? (
          <MyTabs user={user} logout={logout} />
        ) : (
          <MyStack login={login} />
        )}
      </NavigationContainer>
    );
}

const AuthStack = createStackNavigator();

function MyStack(props) {
  return (
      <AuthStack.Navigator screenOptions={{
        headerShown: false
        }}>
        <AuthStack.Screen name="LoginScreen" component={LoginScreen} options={{ title: 'Goodhelp - Login' }} initialParams={{login: props.login}} />
        <AuthStack.Screen name="RegisterScreen" component={RegisterScreen} options={{ title: 'Goodhelp - Register' }} initialParams={{login: props.login}} />
      </AuthStack.Navigator>
  );
}

const AppStack = createStackNavigator();

function MyTabs(props) {
    return (
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
            name="Post Animals"
            component={PostAnimals}
            initialParams={{user: props.user, logout: props.logout}}
          />
          <AppStack.Screen
            name="Accept Food"
            component={AcceptFood}
            initialParams={{user: props.user, logout: props.logout}}
            options={({ navigation }) => ({
              headerRight: () => (
                <Button
                  onPress={() => navigation.navigate('MapScreen', { fromScreen: 'food' })}
                  title="map"
                  color="black"
                />
              ),
            })}
          />
          <AppStack.Screen
            name="Accept Clothes"
            component={AcceptClothes}
            initialParams={{user: props.user, logout: props.logout}}
            options={({ navigation }) => ({
              headerRight: () => (
                <Button
                  onPress={() => navigation.navigate('MapScreen', { fromScreen: 'clothes' })}
                  title="map"
                  color="black"
                />
              ),
            })}
          />
          <AppStack.Screen
            name="Adopt Animals"
            component={AcceptAnimals}
            initialParams={{user: props.user, logout: props.logout}}
          />
          <AppStack.Screen
            name="Donation Screen"
            component={DonationScreen}
            initialParams={{user: props.user, logout: props.logout}}
          />
          <AppStack.Screen 
            name="MapScreen" 
            component={MapScreen}
          />
        </AppStack.Navigator>
    );
}
