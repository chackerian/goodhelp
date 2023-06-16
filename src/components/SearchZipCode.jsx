import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Text, TextInput, Platform } from 'react-native';

let autoComplete;

const loadScript = (url, callback) => {
  if (Platform.OS == "web"){
    let script = document.createElement("script");
    script.type = "text/javascript";

    if (script.readyState) {
      script.onreadystatechange = function() {
        if (script.readyState === "loaded" || script.readyState === "complete") {
          script.onreadystatechange = null;
          callback();
        }
      };
    } else {
      script.onload = () => callback();
    }

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
  }
};

function handleScriptLoad(updateQuery, autoCompleteRef, props) {
  autoComplete = new window.google.maps.places.Autocomplete(
    autoCompleteRef.current,
    { types: ["postal_code"] }
  );
  autoComplete.setFields([{types: [ "postal_code"]}]);
  autoComplete.addListener("place_changed", () =>
    handlePlaceSelect(updateQuery, props)
  );
}

async function handlePlaceSelect(updateQuery, props) {
  const addressObject = autoComplete.getPlace();
  const query = addressObject.formatted_address;
  updateQuery(query);
  var lat = addressObject.geometry.location.lat();
  var lng = addressObject.geometry.location.lng();
  props.setLocation(query)
  console.log("query", query.split(" "))
  props.setlatLng({lat: lat, lng: lng})
}

function SearchLocationInput(props) {
  const [query, setQuery] = useState("");
  const autoCompleteRef = useRef(null);

  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=AIzaSyDKZXVS2f74ntKveM2VAr0ReLdpKxkWkDc&libraries=places,geometry`,
      () => handleScriptLoad(setQuery, autoCompleteRef, props)
    );
  }, []);

  useEffect(() => {
    setQuery(props.location)
  }, [props.location]);

  function onchange(event) {
    setQuery(event.target.value)
  }
  
  console.log("this it query" + query);

  return (
      <TextInput
        style={[styles.input, props.style]}
        ref={autoCompleteRef}
        onChange={event => setQuery(event.target.value)}
        placeholder="Enter Zip Code"
        value={query}
        maxLength={5}
      />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#e7e7e7",
    paddingLeft: 10,
    paddingTop: 20,
    paddingBottom: 20,
    fontSize: 16,
  },
  inputdiv: {
    marginBottom: 12,
    marginTop: 12,
  },
})

export default SearchLocationInput;