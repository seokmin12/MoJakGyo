import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, RefreshControl, ScrollView } from 'react-native';
import { useFonts } from 'expo-font';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';

import ProductImg from './assets/images/DSC_0482.jpg'

const Product = ({ item }) => {
    return (
        <TouchableOpacity style={styles.ProductContainer}>
            <View>
                <View style={styles.ProductImgAspect}>
                    <Image source={item.img} style={styles.ProductImg} />
                </View>
                <View style={styles.ProductContents}>
                    <Text>100,000원</Text>
                    <Text>니콘 D80</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

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

export default function MarketScreen() {
    const [fontsLoaded] = useFonts({
        'BlackHanSans': require('./assets/fonts/BlackHanSans-Regular.ttf'),
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
    
    return (
        <View style={styles.container}>
            <View style={styles.Header}>
                <Text style={styles.Title}>중고장터</Text>
            </View>
            <FlatList
                    data={itemData}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                    // contentContainerStyle={{gap: 1,}}
                    // columnWrapperStyle={{gap: 1,}}
                    numColumns={2}
                    renderItem={Product}
                    keyExtractor={(item) => item.idx}
                />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    Header: {
        padding: 10,
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
        borderRadius: 20,
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
})