import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View, Switch } from 'react-native'
import { Text, TextInput, RadioButton } from 'react-native-paper'
import Button from './Button';
import { useNavigation } from '@react-navigation/native';

import { store } from '../firebase.js';
import DropDownPicker from 'react-native-dropdown-picker';

export default function ShareClothes(props) {

  const navigation = useNavigation();
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState({ value: '', error: '' })
  const [quantity, setQuantity] = useState({ value: '', error: '' })

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(null);

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [items, setItems] = useState([
    {label: 'Polo Shirt', value: 'Polo Shirt'},
    {label: 'Dress', value: 'Dress'},
    {label: 'Sweater', value: 'Sweater'},
    {label: 'T-Shirt', value: 'T-Shirt'},
    {label: 'Hoodie', value: 'Hoodie'},
    {label: 'Coat', value: 'Coat'},
    {label: 'Swimsuit', value: 'Swimsuit'},
    {label: 'Scarf', value: 'Scarf'},
    {label: 'Gym Clothes', value: 'Gym Clothes'},
    {label: 'Hat', value: 'Hat'},
  ]);

  const [condition, setCondition] = useState([
    {label: 'Good', value: 'Good'},
    {label: 'Mediocre', value: 'Mediocre'},
    {label: 'Bad', value: 'Bad'},
  ]);

  function onAddItem(){
    setShowForm(true)
  }

  return (
    <View style={styles.container}>
      <View style={styles.centered}>
        <Button mode="contained" onPress={onAddItem} style={styles.default}>
          Add Item
        </Button>
      </View>
      {showForm ? ( 
      <View>
        <TextInput
          label="Title"
          returnKeyType="next"
          theme={{ colors: { primary: 'blue',underlineColor:'transparent',}}}
          style={{ width: 300 }}
          value={title.value}
          onChangeText={(text) => setTitle({ value: text, error: '' })}
          error={!!title.error}
          errorText={title.error}
          autoCapitalize="none"
          autoCompleteType="title"
      />
      <DropDownPicker
        label="Select Type"
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
      />
      <DropDownPicker
        open={open2}
        value={value2}
        items={condition}
        setOpen={setOpen2}
        setValue={setValue2}
        setItems={setCondition}
      />
    
      <TextInput
          label="Quantity"
          returnKeyType="next"
          theme={{ colors: { primary: 'blue',underlineColor:'transparent',}}}
          style={{ width: 300 }}
          value={quantity.value}
          onChangeText={(text) => setQuantity({ value: text, error: '' })}
          error={!!quantity.error}
          errorText={quantity.error}
          autoCapitalize="none"
      />
      <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      </View>
      ) : null}

    </View>
  )
}

// title
// category
// quantity
// condition
// date of listing created
// date and time of donation
// do they deliver?
// address

const styles = StyleSheet.create({
  centered: {
    alignItems: "center",
  },
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
  forgot: {
    fontSize: 13,
    color: "red",
  },
  link: {
    fontWeight: 'bold',
  },
  form: {
    alignItems: 'center',
    padding: 0,
    marginLeft: 20,
    marginRight: 120
  },
  default: {
    backgroundColor: 'blue',
    width: 300
  },
  container: {
      flex: 1,
      backgroundColor: 'white',
    },
})