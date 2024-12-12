import { StyleSheet, Text, View, Image, TouchableOpacity, Pressable, Alert } from 'react-native';
import { useFonts } from 'expo-font';
import React, { useState, useEffect } from 'react';

import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function ImageViewer({ selectedImage, style }) {
    const imageSource = { uri: selectedImage }

    return <Image source={imageSource} style={style} />;
}

const CustomButton = ({ label, onPress }) => {
    return (
        <Pressable style={styles.CustomButton} onPress={onPress}>
            <Text style={styles.CustomButtonText}>{label}</Text>
        </Pressable>
    )
}


export default function UploadScreen({ navigation }) {
    const [fontsLoaded] = useFonts({
        'BlackHanSans': require('../assets/fonts/BlackHanSans-Regular.ttf'),
    });

    if (!fontsLoaded) {
        return <StatusBar />;
    }

    const [permission, requestPermission] = ImagePicker.useMediaLibraryPermissions();
    const [selectedImage, setSelectedImage] = useState(null);
    const [UserId, SetUserId] = useState(0);

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

    const UploadPost = async (image, writer_id) => {
        if (selectedImage != null) {
            try {
                const imageName = image.split('/').pop();
                const imageType = imageName.endsWith('.png') ? 'image/png' : 'image/jpeg';
    
                const formData = new FormData();
                formData.append('file', {
                    uri: image,
                    type: imageType,
                    name: imageName
                });
                await fetch(`http://127.0.0.1:8000/users/${writer_id}/posts`, {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                    },
                    body: formData,
                })
                
                Alert.alert(
                    "업로드 완료",
                    "게시물이 업로드되었습니다.",
                    [
                        {
                            text: "확인",
                            onPress: () => navigation.navigate('Home')
                        }
                    ]
                )
            } catch (error) {
                console.log(error);
                Alert.alert("업로드 실패", "게시물 업로드에 실패했습니다.");
            }
        } else {
            Alert.alert("업로드 실패", "이미지를 선택해주세요.");
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
        if (UserId != 0) {
            pickImageAsync();
        }
    }, [UserId]);

    return (
        <View style={styles.container}>
            <View style={styles.Header}>
                <Text style={styles.Title}>새 개시물</Text>
                <TouchableOpacity onPress={async () => {
                    try {
                        await UploadPost(selectedImage, UserId);
                    } catch (e) {
                        console.log(e);
                    }
                }}>
                    <Text style={{ color: '#0070F2' }}>업로드</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.CurrentImgAspect}>
                <ImageViewer
                    selectedImage={selectedImage}
                    style={styles.image}
                />
            </View>
            <View style={styles.ButtonView}>
                <CustomButton label="다시 선택" onPress={pickImageAsync} />
            </View>
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
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    Title: {
        fontFamily: 'BlackHanSans',
        fontSize: 31,
    },

    CurrentImgAspect: {
        // padding: 10,
        width: '95%',
        height: undefined,
        aspectRatio: 1,
        backgroundColor: '#ccc',
        alignSelf: 'center',
    },

    image: {
        width: '100%',
        height: undefined,
        aspectRatio: 1,

    },

    ButtonView: {
        padding: 10,
    },

    CustomButton: {
        backgroundColor: '#0070F2',
        padding: 10,
    },

    CustomButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontFamily: 'BlackHanSans',
    }
})