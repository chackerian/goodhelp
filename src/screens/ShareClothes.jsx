import React, { createRef, useRef, useState } from 'react';
import { Dimensions } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { SelectList } from 'react-native-dropdown-select-list';
import { Text, TextInput, RadioButton } from 'react-native-paper';
import {
  View,
  Switch,
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { store } from '../../firebase.js';

import Button from '../components/Button';
import ImageDropper from '../components/ImageDropper';
import Select from '../components/Select';

export default function ShareClothes(props) {
  const selectREF1 = useRef(null)
  const selectREF2 = useRef(null)

  const navigation = useNavigation();

  const [setLIST, LIST] = useState();
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState({ value: '', error: '' });
  const [quantity, setQuantity] = useState({ value: '', error: '' });

  const [selectedtype, setSelectedType] = React.useState([]);
  const [selectedcondition, setSelectedCondition] = React.useState([]);

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [items, setItems] = useState([
    { label: 'Polo Shirt', value: 'Polo Shirt' },
    { label: 'Dress', value: 'Dress' },
    { label: 'Sweater', value: 'Sweater' },
    { label: 'T-Shirt', value: 'T-Shirt' },
    { label: 'Hoodie', value: 'Hoodie' },
    { label: 'Coat', value: 'Coat' },
    { label: 'Swimsuit', value: 'Swimsuit' },
    { label: 'Scarf', value: 'Scarf' },
    { label: 'Gym Clothes', value: 'Gym Clothes' },
    { label: 'Hat', value: 'Hat' },
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
    selectREF1.current?.click()
    selectREF2.current?.click()
    // console.log("url posting", imageURL)
    // await setDoc(doc(firestore, "food", id), {
    //   title: title.value,
    //   picture: imageURL,
    //   quantity: quantity.value,
    //   deliverable: isEnabled,
    //   type: selected1,
    //   condition: selected2,
    // });
    // var obj = {
    //   picture: imageURL,
    //   title: title.value,
    //   quantity: quantity.value
    // }
    // setLIST(LIST => [...LIST, obj])
    // setTitle("")
    // setSelected1("")
    // setSelected2("")
    // setQuantity("")
  }

  return (
    <ScrollView style={styles.container}>
      <View>
        {/* <FlatList
          data={LIST}
          ListEmptyComponent={empty}
          renderItem={({item}) => <Item title={item.title} quantity={item.quantity} picture={item.picture} />}
          keyExtractor={(item, index) => index.toString()}
        /> */}
      </View>
      <View style={{ gap: 12, maxWidth: 650, width: "100%", marginHorizontal: "auto" }}>
        <View>
          <Text style={styles.formheading}>Donate Clothes</Text>
          <Text style={styles.formintro}>Happiness doesn’t result from what we get, but from what we give.</Text>
          <Switch
              trackColor={{ false: '#767577', true: 'green' }}
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

          <Select
            ref={selectREF1}
            setSelected={(val) => setSelected1(val)}
            data={items}
            placeholder="select type"
            boxStyles={{ width:200, marginLeft: 10, marginBottom: 10 }}/>

          <Select
            ref={selectREF2}
            setSelected={(val) => setSelected2(val)}
            data={condition}
            placeholder="select condition"
            boxStyles={{ width:200, marginLeft: 10, marginBottom: 10 }}/>

          <TextInput
            label="Quantity"
            returnKeyType="next"
            theme={{ colors: { primary: 'blue', underlineColor: 'transparent', } }}
            value={quantity.value}
            onChangeText={(text) => setQuantity({ value: text, error: '' })}
            error={!!quantity.error}
            errorText={quantity.error}
            autoCapitalize="none"
            style={styles.forminputs}
          />
          <ImageDropper />
          <View style={styles.centered}>
            <Button mode="contained" onPress={onSaveItem} style={styles.defaultsave}>
              Save Item
            </Button>
          </View>
        </View>
    </View>
  </ScrollView>
  )
}

const styles = StyleSheet.create({
  empty: {
    height: 20,
  },
  icon: {
    width: 36,
    height: 38,
  },
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
  deliverable: {
  },
  default: {
    backgroundColor: 'blue',
    width: 280,
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
    padding: 30,
  },
  item: {
    flexDirection: "row",
    backgroundColor: '#d3d3d3',
    padding: 15,
    marginVertical: 4,
    marginHorizontal: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    paddingLeft: 15,
  },
  quantity: {
    fontSize: 20,
    marginLeft: 'auto'
  },
  switch: {
    width: 30,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  forminputs: {
    width: "100%",
    zIndex: 2
  },
  formheading: {
    marginTop: 20,
    fontSize: 30,
  },
  formintro: {
  }
})