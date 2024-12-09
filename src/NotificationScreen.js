import { StyleSheet, Text, View, FlatList, RefreshControl } from 'react-native';
import { useFonts } from 'expo-font';
import React from 'react';

import Profile from '../assets/images/DSC03437.jpg';
import Picture from '../assets/images/DSC_0482.jpg';

import { useNavigation } from '@react-navigation/native';
import { GoBackBtn } from './components/GoBackBtn'

function Notification() {
    return (
        <View style={styles.NotificationContainer}>
            <View style={styles.Notification}>
                <View style={styles.ProfileImgAspect}>

                </View>
                <View style={styles.NotificationBody}>
                    <Text style={styles.NotificationTitle} numberOfLines={2}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pulvinar neque laoreet suspendisse interdum consectetur libero id. Enim neque volutpat ac tincidunt vitae semper. Placerat vestibulum lectus mauris ultrices eros. Sit amet consectetur adipiscing elit. Sed ullamcorper morbi tincidunt ornare massa eget. Quis risus sed vulputate odio ut enim blandit volutpat maecenas. Id eu nisl nunc mi ipsum faucibus vitae. Nisi vitae suscipit tellus mauris a diam maecenas sed. Integer eget aliquet nibh praesent.

                        Egestas fringilla phasellus faucibus scelerisque eleifend donec. Nec nam aliquam sem et tortor consequat. Amet cursus sit amet dictum sit amet justo. Turpis tincidunt id aliquet risus. Adipiscing bibendum est ultricies integer quis auctor. Ut lectus arcu bibendum at varius vel pharetra vel turpis. Egestas purus viverra accumsan in nisl nisi scelerisque eu ultrices. Velit laoreet id donec ultrices tincidunt arcu non. Sit amet volutpat consequat mauris nunc congue. Sed euismod nisi porta lorem mollis. Vel orci porta non pulvinar neque laoreet suspendisse interdum consectetur. Convallis a cras semper auctor neque vitae. Aliquet nibh praesent tristique magna sit. Amet cursus sit amet dictum sit amet justo donec enim. Eget gravida cum sociis natoque. Sed lectus vestibulum mattis ullamcorper velit sed ullamcorper. Ullamcorper a lacus vestibulum sed arcu non odio. Et ultrices neque ornare aenean euismod elementum nisi. Odio ut enim blandit volutpat. Commodo viverra maecenas accumsan lacus.

                        Sed libero enim sed faucibus turpis in. Enim lobortis scelerisque fermentum dui faucibus in ornare. Pharetra magna ac placerat vestibulum lectus mauris. Iaculis eu non diam phasellus vestibulum lorem sed. Commodo quis imperdiet massa tincidunt. Viverra suspendisse potenti nullam ac tortor vitae. Gravida cum sociis natoque penatibus et magnis dis parturient. Nulla facilisi cras fermentum odio eu feugiat pretium. Ipsum suspendisse ultrices gravida dictum fusce. Sit amet risus nullam eget felis eget nunc lobortis. Eu tincidunt tortor aliquam nulla facilisi cras fermentum. Blandit turpis cursus in hac. Elementum integer enim neque volutpat.

                        Morbi tempus iaculis urna id volutpat lacus laoreet non curabitur. Tortor at auctor urna nunc id cursus metus aliquam. Ultricies mi eget mauris pharetra et ultrices neque. Quisque non tellus orci ac auctor augue. Sagittis nisl rhoncus mattis rhoncus urna neque. At tempor commodo ullamcorper a. Elementum nibh tellus molestie nunc non blandit. Nisi lacus sed viverra tellus in hac habitasse platea. Nisl nunc mi ipsum faucibus vitae aliquet. Viverra ipsum nunc aliquet bibendum enim facilisis. Quis hendrerit dolor magna eget est lorem ipsum. At tempor commodo ullamcorper a lacus. Justo laoreet sit amet cursus sit amet dictum sit amet. Arcu ac tortor dignissim convallis aenean et tortor at. Massa vitae tortor condimentum lacinia quis vel eros. Commodo sed egestas egestas fringilla phasellus faucibus scelerisque eleifend donec. Ligula ullamcorper malesuada proin libero nunc consequat interdum. Ullamcorper malesuada proin libero nunc consequat interdum varius sit. Nullam ac tortor vitae purus faucibus ornare suspendisse sed. Enim ut sem viverra aliquet eget sit.

                        Dictum sit amet justo donec enim. Aliquam ut porttitor leo a diam sollicitudin tempor id. Tortor at risus viverra adipiscing at in tellus. Eu tincidunt tortor aliquam nulla. Tempor orci eu lobortis elementum nibh tellus molestie nunc non. Tortor posuere ac ut consequat. Dignissim diam quis enim lobortis scelerisque fermentum dui faucibus. Malesuada pellentesque elit eget gravida cum sociis natoque. Elit eget gravida cum sociis natoque penatibus. Libero justo laoreet sit amet cursus sit. Diam maecenas sed enim ut sem viverra. Ac tortor dignissim convallis aenean. Ac feugiat sed lectus vestibulum. Neque convallis a cras semper auctor neque.

                        Amet tellus cras adipiscing enim eu turpis. Non blandit massa enim nec dui nunc mattis enim. Felis eget velit aliquet sagittis id consectetur. Dignissim enim sit amet venenatis urna cursus eget nunc. Viverra orci sagittis eu volutpat odio facilisis mauris sit. Nunc sed velit dignissim sodales ut eu sem. Sit amet porttitor eget dolor morbi non. Lectus arcu bibendum at varius vel pharetra vel. Imperdiet proin fermentum leo vel. Bibendum neque egestas congue quisque egestas diam in arcu cursus.

                        Eget velit aliquet sagittis id consectetur. Leo vel fringilla est ullamcorper eget nulla facilisi. Ipsum nunc aliquet bibendum enim facilisis gravida neque convallis. Sed lectus vestibulum mattis ullamcorper velit sed ullamcorper. Vitae sapien pellentesque habitant morbi tristique senectus et. Quam elementum pulvinar etiam non quam lacus suspendisse faucibus interdum. Egestas integer eget aliquet nibh praesent. Porttitor rhoncus dolor purus non enim praesent. Fames ac turpis egestas maecenas. Faucibus turpis in eu mi bibendum neque. Tincidunt tortor aliquam nulla facilisi cras fermentum odio.

                        Sed augue lacus viverra vitae congue eu consequat ac. Turpis egestas integer eget aliquet nibh praesent tristique magna sit. Malesuada bibendum arcu vitae elementum curabitur vitae. Non sodales neque sodales ut etiam sit amet. Id neque aliquam vestibulum morbi blandit cursus risus. Consequat interdum varius sit amet mattis vulputate enim nulla aliquet. At volutpat diam ut venenatis. Non diam phasellus vestibulum lorem sed risus ultricies tristique. Lorem ipsum dolor sit amet consectetur adipiscing elit. Vehicula ipsum a arcu cursus vitae congue mauris. Quam quisque id diam vel quam. Tellus rutrum tellus pellentesque eu tincidunt tortor aliquam nulla. Sed egestas egestas fringilla phasellus faucibus scelerisque eleifend donec pretium. Hendrerit gravida rutrum quisque non tellus orci ac.

                        Aliquam nulla facilisi cras fermentum odio eu feugiat. Tempor id eu nisl nunc mi ipsum faucibus vitae aliquet. Velit euismod in pellentesque massa placerat duis ultricies lacus. Id aliquet lectus proin nibh nisl condimentum id venenatis a. Posuere lorem ipsum dolor sit. Vitae elementum curabitur vitae nunc sed velit dignissim. Viverra adipiscing at in tellus integer feugiat scelerisque. Tellus orci ac auctor augue mauris augue neque gravida. Nunc non blandit massa enim nec dui nunc mattis. Condimentum lacinia quis vel eros donec ac. Sit amet purus gravida quis blandit turpis cursus in. Porttitor rhoncus dolor purus non.

                        Non quam lacus suspendisse faucibus interdum. Donec pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu. Suscipit adipiscing bibendum est ultricies. Aenean pharetra magna ac placerat vestibulum. Dolor sit amet consectetur adipiscing elit. Viverra mauris in aliquam sem fringilla ut morbi tincidunt augue. Pellentesque habitant morbi tristique senectus. Sollicitudin tempor id eu nisl. Rhoncus mattis rhoncus urna neque. Purus in mollis nunc sed id semper. Scelerisque fermentum dui faucibus in ornare quam viverra orci sagittis. Tellus in hac habitasse platea. Nunc aliquet bibendum enim facilisis. At urna condimentum mattis pellentesque id nibh. Dui id ornare arcu odio ut sem nulla. Mauris ultrices eros in cursus turpis. Mauris nunc congue nisi vitae suscipit tellus mauris a diam. Consectetur adipiscing elit duis tristique sollicitudin nibh.
                    </Text>
                </View>
                <View style={styles.PostImgAspect}>

                </View>
            </View>
        </View>
    )
}

const itemData = [
    {
        idx: 100,
    }, {
        idx: 200,
    }
]

export default function NotificationScreen() {
    const navigation = useNavigation();

    const [fontsLoaded] = useFonts({
        'BlackHanSans': require('../assets/fonts/BlackHanSans-Regular.ttf'),
    });

    if (!fontsLoaded) {
        return <StatusBar />;
    }

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.Header}>
                <GoBackBtn onPress={() => navigation.goBack()} />
                <Text style={styles.HeaderTitle}>알림</Text>
            </View>
            <FlatList
                data={itemData}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                renderItem={Notification}
                keyExtractor={(item) => item.idx}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    Header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },

    HeaderTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },

    NotificationContainer: {
        backgroundColor: '#fff',
        padding: 10,
        width: '100%',
    },

    Notification: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    ProfileImgAspect: {
        width: '13%',
        height: undefined,
        aspectRatio: 1,
        borderRadius: 1000,
        backgroundColor: '#ccc',
    },

    NotificationBody: {
        width: '69%',
    },

    NotificationTitle: {
        fontSize: 14,
    },

    PostImgAspect: {
        width: '13%',
        height: undefined,
        aspectRatio: 1,
        borderRadius: 10,
        backgroundColor: '#ccc',
    }
})