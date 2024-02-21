import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, RefreshControl, Pressable, StatusBar } from 'react-native';
import { useFonts } from 'expo-font';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useEffect, useState, useCallback, useRef } from 'react';

import { useNavigation } from '@react-navigation/native';

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
    const id = [props.id || route.params.id];
    const name = [props.name || route.params.name];
    const job = [props.job || route.params.job];
    const IsStack = [props.IsStack || route.IsStack];

    const PostData = useRef({});
    const [isReady, setIsReady] = useState(false);

    const [IsSettingVisible, SetSettingVisible] = useState(false);

    const [fontsLoaded] = useFonts({
        'BlackHanSans': require('../assets/fonts/BlackHanSans-Regular.ttf'),
    });

    if (!fontsLoaded) {
        return <StatusBar />;
    }

    const Item = ({ item }) => {
        return (
            <TouchableOpacity style={{ width: '33.3%' }} onPress={() => navigation.navigate('PostDetailScreen', { idx: item.id, writer: name, job: job })}>
                <View style={styles.item}>
                    <Image source={Profile} style={styles.itemdata} />
                </View>
            </TouchableOpacity>
        )
    };


    const GetUserPost = async (writer_id) => {
        try {
            const response = await fetch(
              `http://127.0.0.1:8000/users/${writer_id}/posts/`
            );
            const json = await response.json();
            console.log(json);
            PostData.current = json;
          } catch (error) {
            console.log(error);
          } finally {
            setIsReady(true);
          }
    }

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            GetUserPost(id[0][0]);
            setRefreshing(false);
        }, 2000);
    }, []);

    useEffect(() => {
        if(!isReady) {
            GetUserPost(id[0][0]);
        }
    }, [isReady])

    return (
        <View style={styles.container}>
            {
                IsStack[0]
                    ? <StackHeader job={job} />
                    : <DefaultHeader job={job} IsSettingVisible={IsSettingVisible} SetSettingVisible={SetSettingVisible} />
            }

            <View style={styles.Profile}>
                <View style={styles.ProfileAspect}>
                    <Image source={Profile} style={styles.ProfileImage} />
                </View>
                <Text style={styles.ProfileName}>{name}</Text>
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