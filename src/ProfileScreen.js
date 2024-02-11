import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { useFonts } from 'expo-font';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Profile from '../assets/images/DSC03437.jpg';

import PostDetailScreen from './detail/PostDetailScreen';

export function ProfileScreen({ navigation }) {
    const [fontsLoaded] = useFonts({
        'BlackHanSans': require('../assets/fonts/BlackHanSans-Regular.ttf'),
    });

    if (!fontsLoaded) {
        return <StatusBar />;
    }
    
    const itemData = [
        {   
            idx: 1,
            img: Profile
        }, {
            idx: 2,
            img: Profile
        }, {
            idx: 3,
            img: Profile
        }, {
            idx: 4,
            img: Profile
        }, {
            idx: 5,
            img: Profile
        }, {
            idx: 6,
            img: Profile
        }, {
            idx: 7,
            img: Profile
        }, {
            idx: 8,
            img: Profile
        }, {
            idx: 9,
            img: Profile
        }, {
            idx: 10,
            img: Profile
        }, {
            idx: 11,
            img: Profile
        }, {
            idx: 12,
            img: Profile
        }, {
            idx: 13,
            img: Profile
        }, {
            idx: 14,
            img: Profile
        }, {
            idx: 15,
            img: Profile
        },
    ]

    const Item = ({ item }) => {
        return (
            <TouchableOpacity style={{width: '33.3%'}} onPress={() => navigation.navigate('PostDetailScreen', {idx: item.idx})}>
                <View style={styles.item}>
                    <Image source={item.img} style={styles.itemdata} />
                </View>
            </TouchableOpacity>
        )
    };

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
        setRefreshing(false);
        }, 2000);
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>작가</Text>
                <TouchableOpacity>
                    <Icon name='cog-outline' size={26} />
                </TouchableOpacity>
            </View>

            <View style={styles.Profile}>
                <View style={styles.ProfileAspect}>
                    <Image source={Profile} style={styles.ProfileImage} />
                </View>
                <Text style={styles.ProfileName}>이석민</Text>
                <View style={styles.follow}>
                    <View style={styles.FollowFont}>
                        <Text style={styles.FollowFont}>30</Text>
                        <Text style={styles.FollowFont}>posts</Text>
                    </View>
                    <View style={styles.FollowFont}>
                        <Text style={styles.FollowFont}>143</Text>
                        <Text style={styles.FollowFont}>followers</Text>
                    </View>
                    <View style={styles.FollowFont}>
                        <Text style={styles.FollowFont}>140</Text>
                        <Text style={styles.FollowFont}>following</Text>
                    </View>
                </View>
            </View>

            <View style={styles.Body}>
                <FlatList
                    data={itemData}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                    contentContainerStyle={{gap: 1,}}
                    columnWrapperStyle={{gap: 1,}}
                    numColumns={3}
                    renderItem={Item}
                    keyExtractor={(item) => item.idx}
                />
            </View>
        </View>
    )
}

const Stack = createNativeStackNavigator();

export default function ProfileApp() {
    return (
        <Stack.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
            }}
        >
            <Stack.Screen
                name="ProfileScreen"
                component={ProfileScreen}
            />
            <Stack.Screen
                name="PostDetailScreen"
                component={PostDetailScreen}
            />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    header: {
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    headerTitle: {
        fontSize: 31,
        fontFamily: 'BlackHanSans',
    },

    Profile: {
        padding: 10,
        alignItems: 'center',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },

    ProfileAspect: {
        width: '45%',
        aspectRatio: 1,
        backgroundColor: '#ccc',
        borderRadius: 1000,
    },

    ProfileImage: {
        width: '100%',
        height: undefined,
        aspectRatio: 1,
        borderRadius: 1000,
    },

    ProfileName: {
        padding: 20,
        fontSize: 20,
        fontFamily: 'BlackHanSans',
    },

    follow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
    },

    FollowFont: {
        alignItems: 'center',
        fontWeight: 'bold',
        fontFamily: 'Arial',
    },

    Body: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
    },

    item: {
        width: '100%',
        height: undefined,
        aspectRatio: 1,
    
    },

    itemdata: {
        width: '100%',
        height: undefined,
        aspectRatio: 1,
    }
})