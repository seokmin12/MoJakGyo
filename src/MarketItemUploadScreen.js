import React, { useEffect, useState } from "react";
import { useFonts } from 'expo-font';

import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { GoBackBtn } from "./components/GoBackBtn";
import CustomBtn from "./components/CustomBtn";
import { ImageViewer } from "./UploadScreen";

export default function MarketItemUploadScreen() {
    const [fontsLoaded] = useFonts({
        'BlackHanSans': require('../assets/fonts/BlackHanSans-Regular.ttf'),
    });

    if (!fontsLoaded) {
        return <StatusBar />;
    }

    const navigation = useNavigation();
    const [UserId, SetUserId] = useState(0);
    const [ItemTitle, SetItemTitle] = useState("");
    const [ItemDesc, SetItemDesc] = useState("");
    const [ItemPrice, SetItemPrice] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
            base64: true,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
            // console.log(result.assets[0].base64);
        }

    };

    const getAsyncStorage = async (key) => {
        try {
          const json = await AsyncStorage.getItem('User');
          if (json) {
            const value = JSON.parse(json)[key];
            return value;
          }
          return null;
        } catch (error) {
          console.log(`Error retrieving ${key} from AsyncStorage:`, error);
          return null;
        }
    };

    const onChangeItemTitle = (inputText) => {
        SetItemTitle(inputText);
    }

    const onChangeItemDesc = (inputText) => {
        SetItemDesc(inputText);
    }

    const onChangeItemPrice = (inputText) => {
        SetItemPrice(parseInt(inputText));
    }

    const UploadMarket = async (image) => {
        if (ItemTitle == "" || ItemDesc == "" || ItemPrice == "" || selectedImage == null) {
            Alert.alert("업로드 실패", "빈칸을 채워주세요.");
        } else {
            try {
                const imageName = image.split('/').pop();
                const imageType = imageName.endsWith('.png') ? 'image/png' : 'image/jpeg';
    
                const formData = new FormData();
                formData.append('name', ItemTitle);
                formData.append('description', ItemDesc);
                formData.append('price', ItemPrice);
                formData.append('seller_id', UserId);
                formData.append('file', {
                    uri: image,
                    type: imageType,
                    name: imageName
                });
                console.log(formData);
                

                await fetch("http://127.0.0.1:8000/market", {
                    method: "POST",
                    headers: {
                        "Accept": 'application/json',
                        "Content-Type": "multipart/form-data"
                    },
                    body: formData,
                })
                Alert.alert(
                    "업로드 완료",
                    "중고장터 게시물이 업로드되었습니다.",
                    [
                        {
                            text: "확인",
                            onPress: () => navigation.goBack()
                        }
                    ]
                )
            } catch (e) {
                console.log(e);
                Alert.alert("업로드 실패", "중고장터 게시물 업로드에 실패했습니다.");
            }
        }
    }

    useEffect(() => {
        try {
            getAsyncStorage("id")
            .then((val) => {
                SetUserId(val);
            })
        } catch (error) {
            console.log(error);
        }
    }, [UserId])

    return (
        <View style={styles.container}>
            <View style={styles.Header}>
                <GoBackBtn onPress={() => navigation.goBack()} />
                <Text style={styles.PageTitle}>상품 등록</Text>
                <GoBackBtn opacity={0} disabled={true} />
            </View>
            <View style={styles.Body}>
                <View style={styles.ItemImageView}>
                    <TouchableOpacity style={styles.ItemImageAspect} onPress={() => pickImageAsync()}>
                        <Icon name="camera" size={31} style={{ opacity: '.3', borderWidth: 1, display: 'flex', padding: 10, alignSelf: 'flex-start', borderRadius: '5px', borderColor: 'rgba(0, 0, 0, .3)', }} />
                    </TouchableOpacity>
                    <ImageViewer selectedImage={selectedImage} style={styles.ItemPickedImage} />
                </View>
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
                        onChangeText={onChangeItemPrice}
                        value={ItemPrice}
                        placeholder="₩ 가격을 입력하세요."
                        // keyboardType="numeric"
                        style={styles.ItemInput}
                    />
                </View>
            </View>

            <View style={styles.Footer}>
                <CustomBtn label="등록하기" onPress={async () => {
                    try {
                        await UploadMarket(selectedImage)
                    } catch (e) {
                        console.log(e);
                    }
                }} />
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

    ItemImageView: {
        flex: .3,
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
    },

    ItemImageAspect: {
        aspectRatio: 1,
    },

    ItemPickedImage: {
        flex: .18,
        aspectRatio: 1,
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