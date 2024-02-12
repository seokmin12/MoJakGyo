import { View } from 'react-native';
import { useFonts } from 'expo-font';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { GoBackBtn } from './MarketDetailScreen';
import PostScreen from '../PostScreen';

export default function PostDetailScreen({ route }) {
    const [fontsLoaded] = useFonts({
        'BlackHanSans': require('../../assets/fonts/BlackHanSans-Regular.ttf'),
    });

    if (!fontsLoaded) {
        return <StatusBar />;
    }

    const navigation = useNavigation();

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <View>
                <GoBackBtn onPress={() => navigation.goBack()} />
            </View>
            <PostScreen key={route.params.idx} />
        </View>
    )
}