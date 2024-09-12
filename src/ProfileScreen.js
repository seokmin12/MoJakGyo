import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, RefreshControl, Pressable, StatusBar } from 'react-native';
import { useFonts } from 'expo-font';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useEffect, useState, useCallback, useRef } from 'react';

import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Profile from '../assets/images/DSC03437.jpg';
import Picture from '../assets/images/DSC_0482.jpg';

import { GoBackBtn } from './detail/MarketDetailScreen';
import BottomSheetScreen from './BottomSheetScreen';

function DefaultHeader(props) {
    const { job, IsSettingVisible, SetSettingVisible } = props;

    return (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>{job}</Text>
            <TouchableOpacity onPress={() => SetSettingVisible(true)}>
                <Icon name='cog-outline' size={26} />
            </TouchableOpacity>
            <BottomSheetScreen
                IsVisible={IsSettingVisible}
                SetVisible={SetSettingVisible}
                height={'20%'}
            >
                <View style={styles.SettingList}>
                    <Pressable style={[styles.SettingItem, { borderBottomColor: '#fff', borderBottomWidth: 1, }]}>
                        <Icon name='account-outline' size={25} />
                        <Text>계정</Text>
                    </Pressable>
                    <Pressable style={styles.SettingItem}>
                        <Icon name='logout' size={25} color={'#FF0000'} />
                        <Text style={{ color: '#FF0000' }}>로그아웃</Text>
                    </Pressable>
                </View>
            </BottomSheetScreen>
        </View>
    )
}

function StackHeader(props) {
    const job = props.job;
    const navigation = useNavigation();

    return (
        <View style={styles.header}>
            <View style={styles.StackHeaderLeftSide}>
                <GoBackBtn onPress={() => navigation.goBack()} />
                <Text style={styles.headerTitle}>{job}</Text>
            </View>
        </View>
    )
}

export default function ProfileScreen({ route, ...props }) {
    const navigation = props.navigation;
    const IsStack = props.IsStack ?? route.IsStack;
    const IsProfileRendered = props.IsProfileRendered ?? route.params.IsProfileRendered;

    const writer_id = useRef(0);
    const name = useRef("");
    const job = useRef("");

    const PostData = useRef({});
    const [isReady, setIsReady] = useState(false);
    const [IsSettingVisible, SetSettingVisible] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const [fontsLoaded] = useFonts({
        'BlackHanSans': require('../assets/fonts/BlackHanSans-Regular.ttf'),
    });

    if (!fontsLoaded) {
        return <StatusBar />;
    }

    const Item = ({ item }) => {
        return (
            <TouchableOpacity style={{ width: '33.3%' }} key={item.id} onPress={() => navigation.navigate('PostDetailScreen', { post_id: item.id, writer: name.current, job: job.current, writer_id: writer_id.current, likes:item.likes })}>
                <View style={styles.item}>
                    <Image source={Profile} style={styles.itemdata} />
                </View>
            </TouchableOpacity>
        )
    };

    const GetStoragePost = async (writer_id) => {
        try {
            const value = await AsyncStorage.getItem(`${writer_id}_posts`);
            if (value !== null && value != []) {
                PostData["current"] = JSON.parse(value);
            } else {
                GetUserPost(writer_id.current);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsReady(true);
        }
    }


    const GetUserPost = async (writer_id) => {
        try {
            console.log("writer id: ", writer_id);
            const response = await fetch(
                `http://127.0.0.1:8000/users/${writer_id}/posts/`
            );
            const json = await response.json();
            PostData["current"] = json;

            const jsonValue = JSON.stringify(json);
            await AsyncStorage.setItem(`${writer_id}_posts`, jsonValue);
        } catch (error) {
            console.log(error);
        } finally {
            setIsReady(true);
        }
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            GetUserPost(writer_id.current);
            setRefreshing(false);
        }, 2000);
    }, []);

    useEffect(() => {
        AsyncStorage.getItem("User")
        .then((value) => {
            writer_id.current = JSON.parse(value)["id"];
            name.current = JSON.parse(value)["name"];
            job.current = JSON.parse(value)["job"];
        })
        .then(res => {
            if (!isReady && IsProfileRendered) {
                GetStoragePost(writer_id.current);
            }
            else if (!isReady) {
                GetUserPost(writer_id.current);
            }
        })
    }, [isReady])

    return (
        <View style={styles.container}>
            {
                IsStack
                    ? <StackHeader job={job.current} />
                    : <DefaultHeader job={job.current} IsSettingVisible={IsSettingVisible} SetSettingVisible={SetSettingVisible} />
            }

            <View style={styles.Profile}>
                <View style={styles.ProfileAspect}>
                    <Image source={Profile} style={styles.ProfileImage} />
                </View>
                <Text style={styles.ProfileName}>{name.current}</Text>
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
                    data={PostData["current"]}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                    contentContainerStyle={{ gap: 1, }}
                    columnWrapperStyle={{ gap: 1, }}
                    numColumns={3}
                    renderItem={Item}
                    keyExtractor={(item) => item.id}
                />
            </View>
        </View>
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

    StackHeaderLeftSide: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
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
        backgroundColor: '#ccc',
    },

    itemdata: {
        width: '100%',
        height: undefined,
        aspectRatio: 1,
    },

    SettingList: {
        backgroundColor: '#eee',
        borderRadius: 10,
    },

    SettingItem: {
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    }
})