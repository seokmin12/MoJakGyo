import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import { useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

function Message() {
    const navigation = useNavigation();
    const ChatRooms = useRef({});
    const [UserId, SetUserId] = useState(0);
    const [isReady, setIsReady] = useState(false);

    const [fontsLoaded] = useFonts({
        'BlackHanSans': require('../assets/fonts/BlackHanSans-Regular.ttf'),
    });

    if (!fontsLoaded) {
        return <StatusBar />;
    }

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

    const getChatRoom = async (user_id) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/chat/rooms/${user_id}`);
            const json = await response.json();
            ChatRooms.current = json;
        } catch (error) {
            console.log(error);
        } finally {
            setIsReady(true);
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
        }
        if(UserId != 0) {
            getChatRoom(UserId);
        }
    }, [UserId])

    const result = [];

    for (let i = 0; i < ChatRooms.current.length; i++) {
        result.push(
            <TouchableOpacity 
                style={styles.MessageContainer}
                key={ChatRooms.current[i]["id"]} 
                onPress={() => navigation.navigate('MessageDetailScreen', {
                    room_id: ChatRooms.current[i]["id"],

                    participant: UserId == ChatRooms.current[i]["participant1_id"] ? 
                    ChatRooms.current[i]["participant2"]["name"] 
                    : ChatRooms.current[i]["participant1"]["name"],

                    profile_img: UserId == ChatRooms.current[i]["participant1_id"] ?
                    ChatRooms.current[i]["participant2"]["profile_img"]
                    : ChatRooms.current[i]["participant1"]["profile_img"],
            })}>
                <View style={styles.ProfileAspect}>
                    <Image 
                        source={UserId == ChatRooms.current[i]["participant1_id"] ? 
                        {uri: `data:image/jpeg;base64,${ChatRooms.current[i]["participant2"]["profile_img"]}`} 
                        : {uri: `data:image/jpeg;base64,${ChatRooms.current[i]["participant1"]["profile_img"]}`}}
                        style={styles.ProfileImg} 
                    />
                </View>
                <View style={styles.MessageContent}>
                    <Text style={styles.MessageCaller}>{UserId == ChatRooms.current[i]["participant1_id"] ? ChatRooms.current[i]["participant2"]["name"] : ChatRooms.current[i]["participant1"]["name"]}</Text>
                    <Text style={styles.MessageDesc} numberOfLines={1}>
                        {ChatRooms.current[i]["latest_message"] != null && (
                            ChatRooms.current[i]["latest_message"]["content"]
                        )}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
    return result;
}


export default function MessageScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.Title}>메시지</Text>
            <View style={styles.MessageBody}>
                <ScrollView style={{ flex: 1, }}>
                    <Message />
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    Title: {
        fontFamily: 'BlackHanSans',
        fontSize: 31,
        padding: 10,
    },

    MessageBody: {
        flex: 1,
    },

    MessageContainer: {
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
        // paddingTop: 10,
        // paddingBottom: 10,
        padding: 10,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },

    ProfileAspect: {
        width: '13%',
        height: undefined,
        aspectRatio: 1,
        borderRadius: 1000,
        backgroundColor: '#ccc',
    },

    ProfileImg: {
        width: '100%',
        height: undefined,
        aspectRatio: 1,
        borderRadius: 1000,
    },

    MessageContent: {
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
    },

    MessageCaller: {
        fontFamily: 'BlackHanSans',
        fontWeight: 'bold',
    },

    MessageDesc: {
        color: '#A0A0A0',
    },
})