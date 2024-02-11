import { StyleSheet, Text, View, Image, TouchableOpacity, Pressable } from 'react-native';
import { useFonts } from 'expo-font';
import React, { useState } from 'react';

import * as ImagePicker from 'expo-image-picker';

export function ImageViewer({ selectedImage }) {
    const imageSource = { uri: selectedImage }
  
    return <Image source={imageSource} style={styles.image} />;
}

const CustomButton = ({label, onPress}) => {
    return (
        <Pressable style={styles.CustomButton} onPress={onPress}>
            <Text style={styles.CustomButtonText}>{label}</Text>
        </Pressable>
    )
}
  

export default function UploadScreen() {
    const [fontsLoaded] = useFonts({
        'BlackHanSans': require('../assets/fonts/BlackHanSans-Regular.ttf'),
    });

    if (!fontsLoaded) {
        return <StatusBar />;
    }

    const [permission, requestPermission] = ImagePicker.useMediaLibraryPermissions();
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

    // useEffect(() => {
    //     pickImageAsync();
    // }, []);

    return (
        <View style={styles.container}>
            <View style={styles.Header}>
                <Text style={styles.Title}>새 개시물</Text>
                <TouchableOpacity>
                    <Text style={{color: '#0070F2'}}>업로드</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.CurrentImgAspect}>
                <ImageViewer
                    selectedImage={selectedImage}
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