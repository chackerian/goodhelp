import React, { useState } from 'react'
import Button from '../components/Button';
import { doc, setDoc } from "firebase/firestore";
import { useNavigation } from '@react-navigation/native';
import { SelectList } from 'react-native-dropdown-select-list'
import { Text, TextInput, RadioButton } from 'react-native-paper'
import { TouchableOpacity, StyleSheet, View, ScrollView, Switch, Image, Dimensions, FlatList } from 'react-native';

import { firestore } from '../../firebase.js';

// Import for all components
import ImageDropper from '../components/ImageDropper';
import SearchLocationInput from '../components/SearchLocationInput';

export default function ShareFood(props) {

  const navigation = useNavigation();

  const [LIST, setLIST] = useState([]);
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [LatLng, setLatLng] = useState({});
  const [showAdd, setShowAdd] = useState(true);
  const [location, setLocation] = useState('');
  const [imageURL, setImageURL] = useState("");
  const [selected1, setSelected1] = useState("");
  const [selected2, setSelected2] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [selectedtype, setSelectedType] = useState([]);
  const [title, setTitle] = useState({ value: '', error: '' });
  const [selectedcondition, setSelectedCondition] = useState([]);
  const [quantity, setQuantity] = useState({ value: '', error: '' });
  const [items, setItems] = useState([
    { label: 'Fruit', value: 'Fruit' },
    { label: 'Vegetables', value: 'Vegetables' },
    { label: 'Grains', value: 'Grains' },
    { label: 'Protein Food', value: 'Protein Food' },
    { label: 'Dairy', value: 'Dairy' },
  ]);

  const id = title.value + "-" + String(Math.round(Math.random()*100000))

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const empty = () => {
    return <View style={styles.empty}>
        <Text></Text>
      </View>
  }

  const Item = ({title, quantity, picture, index}) => <View style={styles.item} key={index}>
      <Image source={{uri: picture}}
        style={styles.icon}
      />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.quantity}>{quantity}</Text>
    </View>


  const [condition, setCondition] = useState([
    { label: 'Good', value: 'Good' },
    { label: 'Mediocre', value: 'Mediocre' },
    { label: 'Bad', value: 'Bad' },
  ]);


  function onAddItem() {
    setShowForm(true)
    setShowAdd(false)
  }

  async function onSaveItem() {
    console.log("url posting", imageURL)
    await setDoc(doc(firestore, "food", id), {
      title: title.value,
      picture: imageURL,
      quantity: quantity.value,
      deliverable: isEnabled,
      type: selected1,
      condition: selected2,
    });
    var obj = {
      picture: imageURL,
      title: title.value,
      quantity: quantity.value
    }
    setLIST(LIST => [...LIST, obj])
    setTitle("")
    setSelected1("")
    setSelected2("")
    setQuantity("")
  }

  return (
    <ScrollView style={styles.container}>
      <View>
      <FlatList
        data={LIST}
        ListEmptyComponent={empty}
        renderItem={({item}) => <Item title={item.title} quantity={item.quantity} picture={item.picture} />}
        keyExtractor={(item, index) => index.toString()}
      />
      </View>
        <View style={{ gap: 12, maxWidth: 650, width: "100%", marginHorizontal: "auto" }}>
          <View>
            <Text style={styles.formheading}>Donate Food</Text>
            <Text style={styles.formintro}>No one has ever become poor from giving.</Text>
          </View>
          <View style={styles.switchContainer}>
            <View style={{flexDirection: "row", gap: 5}}>
              <Text>Deliverable?</Text>
              <Text style={styles.deliverable}>{isEnabled ? "YES" : "NO"}</Text>
            </View>
            <Switch
              trackColor={{ false: '#767577', true: 'green' }}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
              style={styles.switch}
            />
          </View>
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

          <SearchLocationInput style={{width: "100%", height: 60, outline: "none"}} location={location} setlatLng={(val) => {setLatLng(val)}} setLocation={setLocation} />

          <SelectList
            setSelected={(val) => setSelected1(val)}
            data={items}
            boxStyles={{width:"100%"}}
            inputStyles={{ outline: "none"}}
            dropdownStyles={{width: "100%"}}
            save="value"
            placeholder="select type"
          />
          <SelectList
            setSelected={(val) => setSelected2(val)}
            boxStyles={{width: "100%", position: "relative"}}
            inputStyles={{ outline: "none"}}
            dropdownStyles={{width: "100%"}}

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
          <ImageDropper setImageURL={setImageURL}/>
          <View style={styles.centered}>
            <Button mode="contained" onPress={onSaveItem} style={styles.defaultsave}>
              Save Item
            </Button>
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