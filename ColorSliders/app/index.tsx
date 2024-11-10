import React, { useDebugValue, useEffect, useState } from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Type definition

interface Colors {
    r: number,
    g: number,
    b: number
}

// Object "Database" with methods "save" and "read"
const Database = {
    // Key for checking if first time user
    FIRST_TIME: 'newUser', 
    STORED_COLOR: 'storedColors',

    initialize: async (): Promise<Colors> => {
        const newUser = await AsyncStorage.getItem(Database.FIRST_TIME);
        if (!newUser) {
            const defaultColor = { r: 255, g: 255, b: 255 };
            await AsyncStorage.setItem(Database.STORED_COLOR, JSON.stringify(defaultColor));
            await AsyncStorage.setItem(Database.FIRST_TIME, 'true');
            return defaultColor;
        }

        const colors = await Database.read();
        return colors;
    },

    save: async (r: number, g: number, b: number) => {
        try {
            const colors = JSON.stringify({ r, g, b });
            await AsyncStorage.setItem('storedColors', colors);
            return true;
        } catch (error) {
            console.error('Error with database:', error);
            return false;
        }
    },

    read: async () => {
        try {
            const colors = await AsyncStorage.getItem('storedColors');
            return colors ? JSON.parse(colors) : null;
        } catch (error) {
            console.error('Error retrieving from database:', error);
            return null;
        }
    }
}

const getBackgroundColor = (r: number, g: number, b: number) => {
    return `rgb(${r}, ${g}, ${b})`;
}

export default function HomeScreen() {
    const [red, setRed] = useState(255);
    const [green, setGreen] = useState(255);
    const [blue, setBlue] = useState(255);

    useEffect(() => {
        const initializeDB = async () => {
            const savedColor = await Database.initialize();
            setRed(savedColor.r);
            setGreen(savedColor.g);
            setBlue(savedColor.b);
        }

        initializeDB();
    }, [])

    return (
        <SafeAreaView style={{flex: 1, justifyContent: 'center', padding: 30, backgroundColor: getBackgroundColor(red, green, blue)}}>
            <View style={{alignItems: 'center', }}>
                <Text style={{fontSize: 30, margin: 30, alignItems: 'center'}}>Color Sliders</Text>
            </View>
            <View>
                <Slider minimumValue={0} maximumValue={255} value={red} onValueChange={setRed} onSlidingComplete={red => Database.save(red, green, blue)}/>
                <Text>Red: {red}</Text>
                <Slider minimumValue={0} maximumValue={255} value={green} onValueChange={setGreen} onSlidingComplete={green => Database.save(red, green, blue)}/>
                <Text>Green: {green}</Text>
                <Slider minimumValue={0} maximumValue={255} value={blue} onValueChange={setBlue} onSlidingComplete={blue => Database.save(red, green, blue)}/>
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