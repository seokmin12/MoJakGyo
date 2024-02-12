import { StyleSheet, Text, View, Image, TouchableOpacity, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useState, useRef, useEffect } from 'react';

import Profile from '../assets/images/DSC03437.jpg';
import Picture from '../assets/images/DSC_0482.jpg';

import { useNavigation } from '@react-navigation/native';


export default function PostScreen() {
    const navigation = useNavigation();

    const [Likes, SetLikes] = useState(false);
    const [BookMark, SetBookMark] = useState(false);

    const [Selected, setSelected] = useState(false);
    const LikeanimatedScale = useRef(new Animated.Value(0)).current;
    const BookMarkanimatedScale = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        LikeanimatedScale.setValue(1);
        BookMarkanimatedScale.setValue(1);
    }, []);

    const ToggleLikes = () => {
        SetLikes(!Likes);

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

        BookMarkanimatedScale.setValue(0.8);
        Animated.spring(BookMarkanimatedScale, {
            toValue: 1,
            bounciness: 24,
            speed: 20,
            useNativeDriver: true,
        }).start();
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.ProfileSide}>
                    <View style={styles.ProfileAspect}>
                        <Image source={Profile} style={styles.profile} />
                    </View>
                    <Text style={styles.font}>이석민</Text>
                </View>
                <TouchableOpacity>
                    <Icon name="dots-horizontal" size={20} />
                </TouchableOpacity>
            </View>

            <View style={styles.contents}>
                <Image source={Picture} style={styles.ContentsImg} />
            </View>
            <View style={styles.footer}>
                <View style={styles.reaction}>
                    <Animated.View style={{ alignItems: 'center', transform: [{ scale: LikeanimatedScale }] }}>
                        <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => ToggleLikes()}>
                            <Icon name={Likes ? 'thumb-up' : 'thumb-up-outline'} size={25} color={Likes ? '#0070F2' : '#000000'} />
                            <Text style={{ fontSize: 10 }}>10k</Text>
                        </TouchableOpacity>
                    </Animated.View>
                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => navigation.navigate('CastingDetailScreen')}>
                            <Icon name='briefcase-plus-outline' size={25} />
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
});