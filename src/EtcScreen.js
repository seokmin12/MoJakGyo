import { StyleSheet, Text, View, Image, TouchableOpacity, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useState, useRef, useEffect } from 'react';

import { useNavigation } from '@react-navigation/native';

export default function EtcScreen() {
    return (
        <View style={styles.container}>
            <Text>ETC</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
})