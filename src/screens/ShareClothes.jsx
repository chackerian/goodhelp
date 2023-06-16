import React, { createRef, useRef, useState, useEffect } from 'react';
import { collection, query, where, getDocs, setDoc, doc } from "firebase/firestore";
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { Text, TextInput, RadioButton } from 'react-native-paper';
import { TouchableOpacity, StyleSheet, View, ScrollView, Switch, Image, Dimensions, FlatList } from 'react-native';

import CalendarPicker from 'react-native-calendar-picker';

import { firestore } from '../../firebase.js';

import Button from '../components/Button';
import ImageDropper from '../components/ImageDropper';
import SearchLocationInput from '../components/SearchLocationInput';
import SearchZipCode from '../components/SearchZipCode.jsx';
import Select from '../components/Select';

export default function ShareClothes(props) {
  const selectREF1 = useRef(null)
  const selectREF2 = useRef(null)

  const navigation = useNavigation();

  const [LIST, setLIST] = useState([]);
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [LatLng, setLatLng] = useState({});

  const [location, setLocation] = useState('');
  const [zipcode,setZipCode] = useState('');
  const [imageURL, setImageURL] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState({ value: '', error: '' });
 // const [zipcode, setZipCode] = useState({value: ' ', error: ' '});
  const [quantity, setQuantity] = useState({ value: '', error: '' });
  const [comments, setComments] = useState({ value: '', error: '' });
  const [phoneNumber, setPhoneNumber] = useState({ value: '', error: '' });

  const [selectedtype, setSelectedType] = React.useState([]);
  const [selectedcondition, setSelectedCondition] = React.useState([]);

  const [isEnabled, setIsEnabled] = useState(false);

  const id = title.value + "-" + String(Math.round(Math.random()*100000))
  const [groupID, setGroupID] = React.useState();

  useEffect(() => {
    setGroupID(Math.round(Math.random()*1000000000))
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
    { label: 'Boots', value: 'Boots' },
    { label: 'Sneakers', value: 'Sneakers' },
    { label: 'Dress Shoes', value: 'Dress Shoes' },
    { label: 'Flip Flops', value: 'Flip Flops' },
  ]);

  const [condition, setCondition] = useState([
    { label: 'Good', value: 'Good' },
    { label: 'Mediocre', value: 'Mediocre' },
    { label: 'Bad', value: 'Bad' },
  ]);

  const [selected1, setSelected1] = React.useState("");
  const [selected2, setSelected2] = React.useState("");
  const [selectedStartDate, setSelectedStartDate] = React.useState(null);
  const [selectedEndDate, setSelectedEndDate] = React.useState(null);
  const minDate = new Date(); // Today
  const maxDate = new Date(2026, 6, 3);

  function onDateChange(date, type) {
    if (type === 'END_DATE') {
      setSelectedEndDate(date)
    } else {
      setSelectedStartDate(date)
      setSelectedEndDate(null)
    }
  }

  async function onSaveItem() {
    console.log("id", id,"groupid", props.user)
    await setDoc(doc(firestore, "clothing", id), {
      title: title.value,
      groupID: groupID,
      picture: imageURL,
      quantity: quantity.value,
      address: location,
      phoneNumber: phoneNumber.value,
      email: props.route.params.user.email,
      comments: comments.value,
      startDate: selectedStartDate.toDate(),
      endDate: selectedEndDate.toDate(),
      dateCreated: new Date(),
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
    setQuantity("")
    setPhoneNumber("")
    setComments("")
  }

  const handlePhoneNumberChange = (text) => {
    const numericValue = text.replace(/[^0-9]/g, '');

    setPhoneNumber({value: numericValue})
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
          <Text style={styles.formheading}>Donate Clothes</Text>
          <Text style={styles.formintro}>Happiness doesn’t result from what we get, but from what we give.</Text>
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

          <SearchLocationInput style={{width: "100%", height: 60}} location={location} setlatLng={(val) => {setLatLng(val)}} setLocation={setLocation} />
          <SearchZipCode style={{width: "100%", height: 60}} zipcode={zipcode} setlatLng={(val) => {setLatLng(val)}} setZipCode={setZipCode} />

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
            value={quantity.value}
            onChangeText={(text) => setQuantity({ value: text, error: '' })}
            error={!!quantity.error}
            errorText={quantity.error}
            autoCapitalize="none"
            style={styles.forminputs}
          />
          <TextInput
            label="Phone Number"
            returnKeyType="next"
            theme={{ colors: { primary: 'blue', underlineColor: 'transparent', } }}
            style={styles.forminputs}
            value={phoneNumber.value}
            onChangeText={handlePhoneNumberChange}
            error={!!phoneNumber.error}
            errorText={phoneNumber.error}
            autoCapitalize="none"
            keyboardType='numeric'
          />
          <CalendarPicker
            startFromMonday={true}
            allowRangeSelection={true}
            minDate={minDate}
            maxDate={maxDate}
            todayBackgroundColor="#f2e6ff"
            selectedDayColor="#7300e6"
            selectedDayTextColor="#FFFFFF"
            onDateChange={onDateChange}
          />
          <TextInput
            label="Comments"
            returnKeyType="next"
            theme={{ colors: { primary: 'blue', underlineColor: 'transparent', } }}
            style={styles.forminputs}
            value={comments.value}
            onChangeText={(text) => setComments({ value: text, error: '' })}
            error={!!comments.error}
            errorText={comments.error}
            autoCapitalize="none"
          />
          <ImageDropper />
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
    paddingBottom: 140,
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