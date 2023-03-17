import React, { useState, useRef } from 'react'
import { doc, setDoc } from "firebase/firestore";
import { useNavigation } from '@react-navigation/native';
import { SelectList } from 'react-native-dropdown-select-list'
import { Text, TextInput } from 'react-native-paper'
import { TouchableOpacity, StyleSheet, View, ScrollView, Switch, Image, Dimensions, FlatList } from 'react-native';

import { firestore } from '../../firebase.js';

// Import for all components
import Button from '../components/Button';
import ImageDropper from '../components/ImageDropper';
import SearchLocationInput from '../components/SearchLocationInput';
import Select from '../components/Select';

export default function PostAnimals(props) {

  const navigation = useNavigation();
  const selectREF1 = useRef(null)
  const selectREF2 = useRef(null)

  const [LIST, setLIST] = useState([]);
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [LatLng, setLatLng] = useState({});

  const [location, setLocation] = useState("");
  const [imageURL, setImageURL] = useState("");

  const [selected1, setSelected1] = useState("");
  const [selected2, setSelected2] = useState("");

  const [isEnabled, setIsEnabled] = useState(false);
  const [selectedtype, setSelectedType] = useState([]);
  const [title, setTitle] = useState({ value: '', error: '' });
  const [quantity, setQuantity] = useState({ value: '', error: '' });
  const [items, setItems] = useState([
    { label: 'Dog', value: 'Dog' },
    { label: 'Cat', value: 'Cat' },
    { label: 'Hamster', value: 'Hamster' },
    { label: 'Snake', value: 'Snake' },
    { label: 'Bird', value: 'Bird' },
    { label: 'Rabbit', value: 'Rabbit' },
    { label: 'Rat', value: 'Rat' },
    { label: 'Mouse', value: 'Mouse' },
    { label: 'Fish', value: 'Fish' },
    { label: 'Lizard', value: 'Lizard' },
    { label: 'Turtle', value: 'Turtle' },
  ]);

  const id = title.value + "-" + String(Math.round(Math.random()*100000))
  const [groupID, setGroupID] = React.useState();

  useEffect(() => {
    setGroupID(Math.round(Math.random()*100000))
  },[])

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
    { label: 'Young', value: 'Young' },
    { label: 'Middle Age', value: 'Middle Age' },
    { label: 'Old', value: 'Old' },
  ]);

  async function onSaveItem() {
    console.log("url posting", imageURL)
    await setDoc(doc(firestore, "animals", id), {
      title: title.value,
      groupID: groupID,
      picture: imageURL,
      quantity: quantity.value,
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
    setLocation("")
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
            <Text style={styles.formheading}>List Animals for Adoption</Text>
            <Text style={styles.formintro}>Help an animal find a safe home</Text>
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

          <SearchLocationInput style={{width: "100%", height: 60}} location={location} setlatLng={(val) => {setLatLng(val)}} setLocation={setLocation} />

          <Select
            ref={selectREF1}
            setSelected={(val) => setSelected1(val)}
            data={items}
            placeholder="select type"
            boxStyles={{ width:"100%", marginBottom: 10 }}/>

          <Select
            ref={selectREF2}
            setSelected={(val) => setSelected2(val)}
            data={condition}
            placeholder="select condition"
            boxStyles={{ width:"100%", marginBottom: 10 }}/>

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
    marginBottom: 100,
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
    marginRight: 20,
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
  }
})