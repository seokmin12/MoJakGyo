import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import { useFonts } from 'expo-font';
import React from 'react';

import { useNavigation } from '@react-navigation/native';
import GoBackBtn from '../components/GoBackBtn';

const CustomBtn = ({ label, onPress }) => {
    return (
        <TouchableOpacity style={styles.Btn} onPress={() => console.log('ok')}>
            <Text style={styles.BtnFont}>{label}</Text>
        </TouchableOpacity>
    )
}

const addComma = (price) => {
    let returnString = price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return returnString;
}

function ProductDetail({ id, name, desc, image, price, seller_id }) {
    return (
        <View style={styles.ProductContainer}>
            <View style={styles.ProductImgAspect}>

            </View>
            <View style={styles.ProductSimpleContent}>
                <Text style={styles.ProductPrice}>{addComma(price)}원</Text>
                <Text style={styles.DescFont}>{name}</Text>
            </View>
            <View style={styles.ProductContent}>
                <Text style={styles.DescFont}>
                    {desc}
                </Text>
            </View>
        </View>
    )
}

export default function MarketDetailScreen({ route }) {
    const [fontsLoaded] = useFonts({
        'BlackHanSans': require('../../assets/fonts/BlackHanSans-Regular.ttf'),
    });

    if (!fontsLoaded) {
        return <StatusBar />;
    }

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.Header}>
                <GoBackBtn onPress={() => navigation.goBack()} />
            </View>
            <ScrollView>
                <ProductDetail 
                    id={route.params.id} 
                    name={route.params.name} 
                    desc={route.params.desc} 
                    image={route.params.image}
                    price={route.params.price}
                    seller_id={route.params.seller_id}
                />
            </ScrollView>
            {/* <Image source={route.params.img} /> */}
            <View style={styles.Footer}>
                <CustomBtn label='연락하기' />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    ProductContainer: {
        backgroundColor: '#fff',
        padding: 10,
    },

    ProductImgAspect: {
        width: '95%',
        height: undefined,
        aspectRatio: 1,
        backgroundColor: '#ccc',
        alignSelf: 'center',
        borderRadius: 15,
    },

    ProductSimpleContent: {
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        gap: 5,
        borderBottomColor: '#D6D6D6',
        borderBottomWidth: 1,
    },

    ProductPrice: {
        fontSize: 20,
        fontWeight: "bold",
    },

    ProductContent: {
        padding: 10,
    },

    DescFont: {
        fontSize: 15,
    },

    Btn: {
        padding: 15,
        alignItems: 'center',
        backgroundColor: '#0070F2',
    },

    BtnFont: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
        fontFamily: 'BlackHanSans',
    }
})