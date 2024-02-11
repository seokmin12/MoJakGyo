import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, RefreshControl, ScrollView } from 'react-native';
import { useFonts } from 'expo-font';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';

import Profile from '../mojakgyo/assets/images/DSC03437.jpg';

function Message() {
    const [fontsLoaded] = useFonts({
        'BlackHanSans': require('./assets/fonts/BlackHanSans-Regular.ttf'),
    });

    const result = [];

    for(let i = 0; i < 20; i++) {
        result.push(
            <View style={styles.MessageContainer} key={i}>
                <View style={styles.ProfileAspect}>
                    <Image source={Profile} style={styles.ProfileImg} />
                </View>
                <View style={styles.MessageContent}>
                    <Text style={styles.MessageCaller}>이석민</Text>
                    <Text>안녕?</Text>
                </View>
            </View>
        )
    }
    return result;
}

export default function MessageScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.Title}>메시지</Text>
            <View style={styles.MessageBody}>
                <ScrollView style={{flex: 1,}}>
                    <Message />
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    Title: {
        fontFamily: 'BlackHanSans',
        fontSize: 31,
        padding: 10,
    },

    MessageBody: {
        flex: 1,
    },

    MessageContainer: {
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
        // paddingTop: 10,
        // paddingBottom: 10,
        padding: 10,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },

    ProfileAspect: {
        width: '13%',
        height: undefined,
        aspectRatio: 1,
        borderRadius: 1000,
        backgroundColor: '#ccc',
    },

    ProfileImg: {
        width: '100%',
        height: undefined,
        aspectRatio: 1,
        borderRadius: 1000,
    },

    MessageContent: {
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
    },
    
    MessageCaller: {
        fontFamily: 'BlackHanSans',
        fontWeight: 'bold',
    },
})