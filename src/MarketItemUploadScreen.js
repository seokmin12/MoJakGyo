import React, { useState } from "react";
import { useFonts } from 'expo-font';

import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { GoBackBtn } from "./components/GoBackBtn";
import CustomBtn from "./components/CustomBtn";

export default function MarketItemUploadScreen() {
    const [fontsLoaded] = useFonts({
        'BlackHanSans': require('../assets/fonts/BlackHanSans-Regular.ttf'),
    });

    if (!fontsLoaded) {
        return <StatusBar />;
    }

    const navigation = useNavigation();
    const [ItemTitle, SetItemTitle] = useState("");
    const [ItemDesc, SetItemDesc] = useState("");
    const [ItemPrice, SetItemPrice] = useState("");

    const onChangeItemTitle = (inputText) => {
        SetItemTitle(inputText);
    }

    const onChangeItemDesc = (inputText) => {
        SetItemDesc(inputText);
    }

    const onChangeItemPrice = (inputText) => {
        SetItemPrice(inputText);
    }

    const UploadMarket = () => {
        if (ItemTitle == "" || ItemDesc == "" || ItemPrice == "") {
            alert("빈칸을 채워주세요.");
        } else {
            var data = {
                'name': ItemTitle,
                'description': ItemDesc,
                'image': "dsad",
                'price': ItemPrice,
                'selller_id': 1
            }
            try {
                fetch("http://127.0.0.1:8000/market", {
                    method: "POST",
                    headers: {
                        "Content-Type":"application/json; charset=utf-8"
                    },
                    body: JSON.stringify(data)
                }).then(res => res.json())
                .then(res => {
                    console.log(res);
                })
            } catch (e) {
                console.log(e);
            }
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.Header}>
                <GoBackBtn onPress={() => navigation.goBack()} />
                <Text style={styles.PageTitle}>상품 등록</Text>
                <GoBackBtn opacity={0} disabled={true} />
            </View>
            <View style={styles.Body}>
                <TouchableOpacity style={styles.ItemImageAspect}>
                    <Icon name="camera" size={31} style={{ opacity: '.3' }} />
                </TouchableOpacity>
                <View style={styles.ItemUploadAspect}>
                    <Text style={styles.InputTitle}>제목</Text>
                    <TextInput
                        onChangeText={onChangeItemTitle}
                        value={ItemTitle}
                        placeholder="제목"
                        style={styles.ItemInput}
                    />
                </View>

                <View style={[styles.ItemUploadAspect, { flex: 1 }]}>
                    <Text style={styles.InputTitle}>설명</Text>
                    <TextInput
                        onChangeText={onChangeItemDesc}
                        value={ItemDesc}
                        placeholder="제품의 자세한 설명을 적어주세요."
                        style={[styles.ItemInput, { flex: 4, }]}
                        multiline
                    />
                </View>

                <View style={[styles.ItemUploadAspect, { flex: 1, }]}>
                    <Text style={styles.InputTitle}>가격</Text>
                    <TextInput
                        onChange={onChangeItemPrice}
                        value={ItemPrice}
                        placeholder="₩ 가격을 입력하세요."
                        // keyboardType="numeric"
                        style={styles.ItemInput}
                    />
                </View>
            </View>

            <View style={styles.Footer}>
                <CustomBtn label="등록하기" onPress={UploadMarket} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        fontFamily: 'BlackHanSans',
    },

    Header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    PageTitle: {
        fontSize: 15,
        fontWeight: 'bold',
    },

    Body: {
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        flex: 1,
    },

    ItemImageAspect: {
        aspectRatio: 1,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, .3)',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        borderRadius: '5px',
        flex: .3,
    },

    ItemUploadAspect: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
    },

    InputTitle: {
        fontWeight: 'bold',
    },

    ItemInput: {
        borderColor: 'rgba(0, 0, 0, .3)',
        borderWidth: 1,
        padding: 10,
        borderRadius: '5px',
    },
})