import { TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AntDesign } from '@expo/vector-icons'; 

const Select = React.forwardRef((props, ref) => {
    const {
        data,
        boxStyles,
        placeholder,
        setSelected,
    } = props;
    const [current, setCurrent] = useState(null);
    const [isClosed, setisClosed] = useState(true);

    useEffect(() => {
        setSelected(current)
    }, [current])

    const handleReset = () => {
        setCurrent(null)
        setSelected(null)
    }
    const handleOpen = () => setisClosed(flag => !flag);
    const handleSelect = (name) => {
        setCurrent(name)
        handleOpen()
    };

    const options = data?.map((item, index) => {
        return <TouchableOpacity
            style={styles.option}
            onPress={() => handleSelect(item.value)}
            key={index}>
            <Text>{item.label}</Text>
        </TouchableOpacity>
    });

    return <View style={boxStyles} >
        <TouchableOpacity style={styles.wrapper} onPress={handleOpen}>
            <Text style={styles.selected}>{current || placeholder}</Text>
            {current ?
                <TouchableOpacity onPress={() => handleReset()} ref={ref}>
                    <AntDesign name="close" size={24} color="black" />
                </TouchableOpacity>
            :
                isClosed ? <AntDesign name="caretdown" size={24} color="black" /> : <AntDesign name="caretup" size={24} color="black" />
            }
        </TouchableOpacity>
        <View style={[styles.dropdown, isClosed && styles.isClosed]}>{options}</View>
    </View>
})

const styles = StyleSheet.create({
    isClosed: {height: 0, display: "none"},
    selected:{ flex: 1, alignItems:'center', justifyContent: 'center'},
    wrapper:{ borderWidth:1,borderRadius:10,borderColor:'gray',paddingHorizontal:20,paddingVertical:12,flexDirection:'row',justifyContent:'space-between',fontSize: 22},
    dropdown:{ borderWidth:1,borderRadius:10,borderColor:'gray',marginTop:10,overflow:'hidden'},
    option:{ paddingHorizontal:20,paddingVertical:8,overflow:'hidden'},
    disabledoption:{ paddingHorizontal:20,paddingVertical:8,flexDirection:'row',alignItems:'center', backgroundColor:'whitesmoke',opacity:0.9}
})

export default Select