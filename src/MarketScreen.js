import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { useFonts } from 'expo-font';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProductImg from '../assets/images/DSC_0482.jpg';

import MarketDetailScreen from './detail/MarketDetailScreen';

const itemData = [
    {   
        idx: 1,
        img: ProductImg
    }, {
        idx: 2,
        img: ProductImg
    }, {
        idx: 3,
        img: ProductImg
    }, {
        idx: 4,
        img: ProductImg
    }, {
        idx: 5,
        img: ProductImg
    }, {
        idx: 6,
        img: ProductImg
    }, {
        idx: 7,
        img: ProductImg
    }, {
        idx: 8,
        img: ProductImg
    }, {
        idx: 9,
        img: ProductImg
    }, {
        idx: 10,
        img: ProductImg
    }, {
        idx: 11,
        img: ProductImg
    }, {
        idx: 12,
        img: ProductImg
    }, {
        idx: 13,
        img: ProductImg
    }, {
        idx: 14,
        img: ProductImg
    }, {
        idx: 15,
        img: ProductImg
    },
]

export function MarketScreen({ navigation }) {
    const [fontsLoaded] = useFonts({
        'BlackHanSans': require('../assets/fonts/BlackHanSans-Regular.ttf'),
    });

    if (!fontsLoaded) {
        return <StatusBar />;
    }

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
        setRefreshing(false);
        }, 2000);
    }, []);

    const Product = ({ item }) => {
        return (
            <TouchableOpacity style={styles.ProductContainer} onPress={() => navigation.navigate('MarketDetailScreen', {idx: item.idx})}>
                <View>
                    <View style={styles.ProductImgAspect}>
                        <Image source={item.img} style={styles.ProductImg} />
                    </View>
                    <View style={styles.ProductContents}>
                        <Text style={styles.ProductPrice}>100,000원</Text>
                        <Text style={styles.ProductName} numberOfLines={1}>니콘 D80</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.Header}>
                <Text style={styles.Title}>중고장터</Text>
                <TouchableOpacity>
                    <Icon name='plus' size={26} />
                </TouchableOpacity>
            </View>
            <FlatList
                data={itemData}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                numColumns={2}
                renderItem={Product}
                keyExtractor={(item) => item.idx}
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