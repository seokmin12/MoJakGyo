import { StyleSheet, Text, View, Image, TouchableOpacity, Animated, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useState, useRef, useEffect } from 'react';

import Profile from '../assets/images/DSC03437.jpg';
import Picture from '../assets/images/DSC_0482.jpg';

import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';

import BottomSheetScreen from './BottomSheetScreen';

import AsyncStorage from '@react-native-async-storage/async-storage';


export default function PostScreen({ route, ...props }) {
    const navigation = useNavigation();

    const writer_id = props.writer_id ?? route.params.writer_id;
    const writer = props.writer ?? route.params.writer;
    const job = props.job ?? route.params.job;
    const post_id = props.post_id ?? route.params.post_id;
    const likes = props.likes ?? route.params.likes;

    const [IsLike, SetIsLike] = useState(false);
    const [Likes, SetLikes] = useState(0);
    const [BookMark, SetBookMark] = useState(false);
    const [IsFollow, SetFollow] = useState(false);
    const [IsVisible, SetVisible] = useState(false);
    const [IsProfileRendered, SetProfileRendered] = useState(false);

    const [isReady, setIsReady] = useState(false);
    const [isLoadingReady, setIsLoadingReady] = useState(false);

    const [UserId, SetUserId] = useState(0);
    const LikesData = useRef({});

    const LikeanimatedScale = useRef(new Animated.Value(0)).current;
    const BookMarkanimatedScale = useRef(new Animated.Value(0)).current;

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

    const Update_Likes = async (post_id, user_id) => {
        var Is_liked;
        try {
            if (IsLike == false) {
                Is_liked = true;
                SetLikes(Likes + 1);
            } else {
                Is_liked = false;
                SetLikes(Likes - 1);
            }
            await fetch(
              `http://127.0.0.1:8000/posts/${post_id}/likes/${user_id}/${Is_liked}/`
            , {
                method: "PATCH"
            });
        } catch (error) {
            console.log(error);
        } finally {
            setIsReady(true);
        }
    }

    const GetLikes = async (post_id, user_id) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/posts/${parseInt(post_id)}/likes/${parseInt(user_id)}/`);
            const json = await response.json();
            LikesData["current"] = json;
        } catch (e) {
            console.log(e);
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
        } finally {
            setIsLoadingReady(true);
        }

        LikeanimatedScale.setValue(1);
        BookMarkanimatedScale.setValue(1);
        SetLikes(likes);
        GetLikes(post_id, UserId);

        setTimeout(() => {
            if (LikesData["current"]["is_liked"]) {
                SetIsLike(true);
            }
        }, 100)
    }, [UserId])

    const ToggleLikes = () => {
        SetIsLike(!IsLike);
        Update_Likes(post_id, UserId);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

        LikeanimatedScale.setValue(0.8);
        Animated.spring(LikeanimatedScale, {
            toValue: 1,
            bounciness: 24,
            speed: 20,
            useNativeDriver: true,
        }).start();
    };

    const ToggleBookMark = () => {
        SetBookMark(!BookMark);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)

        BookMarkanimatedScale.setValue(0.8);
        Animated.spring(BookMarkanimatedScale, {
            toValue: 1,
            bounciness: 24,
            speed: 20,
            useNativeDriver: true,
        }).start();
    }

    const ToggleFollow = () => {
        SetFollow(!IsFollow);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    }


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Pressable
                    style={styles.ProfileSide}
                    onPress={
                        () => {
                            navigation.navigate('ProfileScreen', {
                                writer_id: writer_id, name: writer, job: job, IsProfileRendered: IsProfileRendered
                            })
                            SetProfileRendered(true);
                        }
                    }
                >
                    <View style={styles.ProfileAspect}>
                        <Image source={Profile} style={styles.profile} />
                    </View>
                    <Text style={styles.font}>{writer}</Text>
                </Pressable>
                <View style={styles.HeaderRightSide}>
                    <Pressable style={styles.FollowView} onPress={ToggleFollow} >
                        {
                            IsFollow
                                ? <Text>팔로우</Text>
                                : <Text>팔로잉</Text>
                        }
                    </Pressable>
                    <TouchableOpacity onPress={() => SetVisible(true)}>
                        <Icon name="dots-horizontal" size={20} />
                    </TouchableOpacity>
                    <BottomSheetScreen
                        IsVisible={IsVisible}
                        SetVisible={SetVisible}
                        height={'30%'}
                    >
                        <Pressable style={styles.ModalBookMark}>
                            <Icon name='bookmark-outline' size={25} />
                            <Text>저장</Text>
                        </Pressable>
                        <View style={styles.ETCList}>
                            <Pressable style={[styles.ETCListItem, { borderBottomColor: '#fff', borderBottomWidth: 1, }]}>
                                <Icon name='account-circle-outline' size={25} />
                                <Text>이 계정 정보</Text>
                            </Pressable>
                            <Pressable style={styles.ETCListItem}>
                                <Icon name='comment-alert-outline' size={25} color='#FF0000' />
                                <Text style={{ color: '#FF0000' }}>신고</Text>
                            </Pressable>
                        </View>
                    </BottomSheetScreen>
                </View>
            </View>

            <View style={styles.contents}>
                {/* <Image source={Picture} style={styles.ContentsImg} /> */}
            </View>
            <View style={styles.footer}>
                <View style={styles.reaction}>
                    <Animated.View style={{ alignItems: 'center', transform: [{ scale: LikeanimatedScale }] }}>
                        <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => ToggleLikes()}>
                            <Icon name={IsLike ? 'thumb-up' : 'thumb-up-outline'} size={25} color={IsLike ? '#0070F2' : '#000000'} />
                            <Text style={{ fontSize: 10 }}>{Likes}</Text>
                        </TouchableOpacity>
                    </Animated.View>
                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => navigation.navigate('CastingDetailScreen')}>
                            <Icon name='camera-plus-outline' size={25} />
                            <Text style={{ fontSize: 10 }}>촬영하기</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Animated.View style={{ transform: [{ scale: BookMarkanimatedScale }] }}>
                    <TouchableOpacity onPress={() => ToggleBookMark()}>
                        <Icon name={BookMark ? 'bookmark' : 'bookmark-outline'} size={25} />
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
        display: 'flex',
        gap: 10,
    },

    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    ProfileSide: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },

    ProfileAspect: {
        aspectRatio: 1,
        width: '25%',
        backgroundColor: '#ccc',
        borderRadius: 1000,
    },

    profile: {
        width: '100%',
        height: undefined,
        aspectRatio: 1,
        borderRadius: 1000,
    },

    HeaderRightSide: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },

    FollowView: {
        backgroundColor: '#eee',
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 10,
    },

    contents: {
        aspectRatio: 1,
        backgroundColor: '#ccc',
        borderRadius: 20,
    },

    ContentsImg: {
        width: '100%',
        height: undefined,
        aspectRatio: 1,
        borderRadius: 20,
    },

    footer: {
        paddingLeft: 10,
        paddingRight: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    reaction: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 30,
    },

    font: {
        fontFamily: 'BlackHanSans',
    },

    ModalBookMark: {
        padding: 10,
        backgroundColor: '#eee',
        borderRadius: 10,
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: 5,
    },

    ETCList: {
        backgroundColor: '#eee',
        borderRadius: 10,
    },

    ETCListItem: {
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    }
});