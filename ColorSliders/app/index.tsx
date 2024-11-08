import React, { useDebugValue, useState } from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { View } from 'react-native';

const getBackgroundColor = (r: any, g: any, b: any) => {
    return `rgb(${r}, ${g}, ${b})`;
}

export default function HomeScreen() {
    const [red, setRed] = useState(255);
    const [green, setGreen] = useState(255);
    const [blue, setBlue] = useState(255);

    return (
        <SafeAreaView style={{flex: 1, justifyContent: 'center', padding: 30, backgroundColor: getBackgroundColor(red, green, blue)}}>
            <View style={{alignItems: 'center', }}>
                <Text style={{fontSize: 30, margin: 30, alignItems: 'center'}}>Color Sliders</Text>
            </View>
            <View>
                <Slider minimumValue={0} maximumValue={255} value={red} onValueChange={setRed}/>
                <Text>Red: {red}</Text>
                <Slider minimumValue={0} maximumValue={255} value={green} onValueChange={setGreen}/>
                <Text>Green: {green}</Text>
                <Slider minimumValue={0} maximumValue={255} value={blue} onValueChange={setBlue}/>
                <Text>Blue: {blue}</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: 10,
        marginRight: 10,
    },
    title: {
        alignItems: 'center'
    }
});