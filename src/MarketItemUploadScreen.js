import React from "react";

import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View } from "react-native";

import GoBackBtn from "./components/GoBackBtn";

export default function MarketItemUploadScreen() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.Header}>
                <GoBackBtn onPress={() => navigation.goBack()} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
})