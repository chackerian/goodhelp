import React, { useState } from 'react'
import { Dimensions } from 'react-native';
import { TouchableOpacity, StyleSheet, View, Switch } from 'react-native'
import { Text, TextInput, RadioButton } from 'react-native-paper'
import Button from './Button';
import { useNavigation } from '@react-navigation/native';

import { firestore } from '../firebase.js';
import { SelectList } from 'react-native-dropdown-select-list'
import ImageDropper from './ImageDropper.js';
import { doc, setDoc } from "firebase/firestore"; 

export default function ShareFood(props) {

  const navigation = useNavigation();
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState({ value: '', error: '' })
  const [quantity, setQuantity] = useState({ value: '', error: '' })

  const [selectedtype, setSelectedType] = React.useState([]);
  const [selectedcondition, setSelectedCondition] = React.useState([]);

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [items, setItems] = useState([
    { label: 'Fruit', value: 'Fruit' },
    { label: 'Vegetables', value: 'Vegetables' },
    { label: 'Grains', value: 'Grains' },
    { label: 'Protein Food', value: 'Protein Food' },
    { label: 'Dairy', value: 'Dairy' },
  ]);

  const [condition, setCondition] = useState([
    { label: 'Good', value: 'Good' },
    { label: 'Mediocre', value: 'Mediocre' },
    { label: 'Bad', value: 'Bad' },
  ]);

  const [selected1, setSelected1] = React.useState("");
  const [selected2, setSelected2] = React.useState("");

  function onAddItem() {
    setShowForm(true)
  }

  async function onSaveItem() {
    // Add a new document in collection "cities"
    await setDoc(doc(firestore, "food", title.value), {
      title: title.value,
      quantity: quantity.value,
      deliverable: isEnabled,
      type: selected1,
      condition: selected2,
    });
  }

  return (
    <View style={styles.container}>
      {showForm ? (
        <View>
          <Text style={styles.formheading}>Donate Food</Text>
          <Text style={styles.formintro}>No one has ever become poor from giving.</Text>
          <Text> Deliverable?</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
            style={styles.switch}
          />
          <TextInput
            label="Title"
            returnKeyType="next"
            theme={{ colors: { primary: 'blue', underlineColor: 'transparent', } }}
            style={styles.forminputs}
            value={title.value}
            onChangeText={(text) => setTitle({ value: text, error: '' })}
            error={!!title.error}
            errorText={title.error}
            autoCapitalize="none"
          />

          <SelectList 
            setSelected={(val) => setSelected1(val)} 
            data={items} 
            boxStyles={{width:200, marginLeft: 10, marginBottom: 10}}
            dropdownStyles={{width: 200, marginLeft: 10}}
            save="value"
            placeholder="select type"
          />
          <SelectList 
            setSelected={(val) => setSelected2(val)} 
            boxStyles={{width: 200, marginLeft: 10, marginBottom: 10}}
            dropdownStyles={{width: 200, marginLeft: 10}}
            data={condition} 
            save="value"
            placeholder="select condition"
          />

          <TextInput
            label="Quantity"
            returnKeyType="next"
            theme={{ colors: { primary: 'blue', underlineColor: 'transparent', } }}
            style={styles.forminputs}
            value={quantity.value}
            onChangeText={(text) => setQuantity({ value: text, error: '' })}
            error={!!quantity.error}
            errorText={quantity.error}
            autoCapitalize="none"
            keyboardType='numeric'
          />
          <ImageDropper />
          <View style={styles.centered}>
            <Button mode="contained" onPress={onSaveItem} style={styles.defaultsave}>
              Save Item
            </Button>
          </View>
        </View>
      ) : null}
      <View style={styles.centered}>
        <Button mode="contained" onPress={onAddItem} style={styles.default}>
          Add Item
        </Button>
      </View>
    </View>
  )
}

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
    width: 300,
    alignItems: "center",
  },
  defaultsave: {
    backgroundColor: 'green',
    width: 300,
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  switch: {
    width: 30,
    marginLeft: Dimensions.get('window').width - 70,
  },
  forminputs: {
    width: Dimensions.get('window').width - 20,
    margin: 10,
    zIndex: 2
  },
  formheading: {
    marginTop: 20,
    marginLeft: 10,
    fontSize: 30,
  },
  formintro: {
    margin: 10,
  }
})