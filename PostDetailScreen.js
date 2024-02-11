import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, RefreshControl, ScrollView, Button, Pressable } from 'react-native';
import { useFonts } from 'expo-font';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

import Profile from '../mojakgyo/assets/images/DSC03437.jpg';
import Picture from './assets/images/DSC_0482.jpg';

import { GoBackBtn } from './MarketDetailScreen';
import { PostScreen, styles } from './ContentsScreen';

export default function PostDetailScreen({ route }) {
    const [fontsLoaded] = useFonts({
        'BlackHanSans': require('./assets/fonts/BlackHanSans-Regular.ttf'),
    });

    if (!fontsLoaded) {
        return <StatusBar />;
    }

    const navigation = useNavigation();

    return (
        <View style={{flex: 1, backgroundColor: '#fff'}}>
            <View>
                <GoBackBtn onPress={() => navigation.goBack()} />
            </View>
            <PostScreen key={route.params.idx} />
        </View>
    )
}

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//     },

//     ContentContainer: {
//         flex: 1,
//         backgroundColor: '#fff',
//         padding: 10,
//         display: 'flex',
//         gap: 10,
//     },

//     ContentHeader: {
//         display: 'flex',
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//     },

//     ProfileSide: {
//         display: 'flex',
//         flexDirection: 'row',
//         alignItems: 'center',
//         gap: 10,
//     },

//     ProfileAspect: {
//         aspectRatio: 1,
//         width: '25%',
//         backgroundColor: '#ccc',
//         borderRadius: 1000,
//     },

//     profile: {
//         width: '100%',
//         height: undefined,
//         aspectRatio: 1,
//         borderRadius: 1000,
//     },

//     font: {
//         fontFamily: 'BlackHanSans',
//     },

//     contentsAspect: {
//         aspectRatio: 1,
//         backgroundColor: '#ccc',
//         borderRadius: 20,
//     },

//     footer: {
//         paddingLeft: 10,
//         paddingRight: 10,
//         display: 'flex',
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//     },

//     reaction: {
//         display: 'flex',
//         flexDirection: 'row',
//         alignItems: 'center',
//         gap: 30,
//     },
// })