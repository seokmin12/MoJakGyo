import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { useFonts } from 'expo-font';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { useRef, useEffect, useState } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProductImg from '../assets/images/DSC_0482.jpg';

import MarketDetailScreen from './detail/MarketDetailScreen';
import MarketItemUploadScreen from './MarketItemUploadScreen';

export function MarketScreen({ navigation }) {
    const [fontsLoaded] = useFonts({
        'BlackHanSans': require('../assets/fonts/BlackHanSans-Regular.ttf'),
    });

    if (!fontsLoaded) {
        return <StatusBar />;
    }

    const [refreshing, setRefreshing] = React.useState(false);
    const MarketData = useRef({});
    const [isReady, setIsReady] = useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        GetMarketData();
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    const addComma = (price) => {
        let returnString = price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return returnString;
    }

    const GetMarketData = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/market');
            const json = await response.json();

            MarketData["current"] = json;
        } catch (e) {
            console.log(e);
        } finally {
            setIsReady(true)
        }
    }

    useEffect(() => {
        if(!isReady) {
            GetMarketData();
        }
    }, [isReady])

    const Product = ({ item }) => {
        return (
            <TouchableOpacity style={styles.ProductContainer} onPress={() => navigation.navigate('MarketDetailScreen', { 
                id: item.id, 
                name: item.name, 
                desc: item.description, 
                image: item.image, 
                price: item.price, 
                image: item.image,
                seller_id: item.seller.id 
            })}>
                <View>
                    <View style={styles.ProductImgAspect}>
                        <Image source={{uri: `data:image/jpeg;base64,${item.image}`}} style={styles.ProductImg} />
                    </View>
                    <View style={styles.ProductContents}>
                        <Text style={styles.ProductPrice}>{addComma(item.price)}원</Text>
                        <Text style={styles.ProductName} numberOfLines={1}>{item.name}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.Header}>
                <Text style={styles.Title}>중고장터</Text>
                <TouchableOpacity onPress={() => navigation.navigate('MarketItemUploadScreen')}>
                    <Icon name='plus' size={26} />
                </TouchableOpacity>
            </View>
            <FlatList
                data={MarketData["current"]}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                numColumns={2}
                renderItem={Product}
                keyExtractor={(item) => item.id}
            />
        </View>
    )
}

const Stack = createNativeStackNavigator();

export default function MarketApp() {
    return (
        <Stack.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
            }}
        >
            <Stack.Screen
                name="MarketScreen"
                component={MarketScreen}
            />
            <Stack.Screen
                name="MarketDetailScreen"
                component={MarketDetailScreen}
            />
            <Stack.Screen 
                name="MarketItemUploadScreen"
                component={MarketItemUploadScreen}
            />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    Header: {
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    Title: {
        fontFamily: 'BlackHanSans',
        fontSize: 31,
    },

    ProductContainer: {
        backgroundColor: '#fff',
        padding: 10,
        width: '50%',
    },

    ProductImgAspect: {
        width: '100%',
        height: undefined,
        aspectRatio: 1,
        backgroundColor: '#ccc',
        borderRadius: 10,
        alignSelf: 'center',
    },

    ProductImg: {
        width: '100%',
        height: undefined,
        aspectRatio: 1,
        borderRadius: 10,
    },

    ProductContents: {
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 5,
    },

    ProductPrice: {
        fontWeight: 'bold',
    },

    ProductName: {
        color: '#747474',
    }
})