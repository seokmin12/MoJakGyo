import { View, StatusBar } from 'react-native';
import { useFonts } from 'expo-font';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { GoBackBtn } from '../components/GoBackBtn';
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
            <PostScreen 
                key={route.params.id} 
                post_id={route.params.post_id} 
                writer={route.params.writer} 
                job={route.params.job} 
                profile_img={route.params.profile_img}
                writer_id={route.params.writer_id} 
                likes={route.params.likes} 
                ImageData={route.params.ImageData} 
            />
        </View>
    )
}