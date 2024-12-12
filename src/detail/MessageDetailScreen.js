import { StyleSheet, View, TextInput, Text, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, NativeModules, Keyboard, Platform, Image } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { GoBackBtn } from '../components/GoBackBtn';

const TimeFormat = (datetime) => {
    var time = datetime.substr(11).split('.', 1)[0].split(':');
    var hour = time[0];
    var min = time[1];
    var sec = time[2];
    var ampm = "";

    if (parseInt(hour) >= 12 && parseInt(min) > 0) {
        ampm += "오후";
    } else {
        ampm += "오전";
    }
    return ampm + " " + hour + ":" + min;
}

const Chat = ({ image, sender, content, time, direction }) => {
    return (
        <View style={[ChatStyles.container, direction === 'right' ? {flexDirection: 'row'} : {flexDirection: 'row-reverse'}]}>
            <View style={ChatStyles.Contents}>
                {direction === 'left' && (
                    <View style={direction === 'right' ? {alignSelf: 'flex-end'} : {alignSelf: 'flex-start'}}>
                        <Text>{sender}</Text>
                    </View>
                )}
                <View style={[ChatStyles.ContentsFooter, direction === 'right' ? {flexDirection: 'row-reverse'} : {flexDirection: 'row'}]}>
                    <View style={ChatStyles.ChatContentContainer}>
                        <Text>{content}</Text>
                    </View>
                    <View style={ChatStyles.ChatTimeContainer}>
                        <Text style={ChatStyles.ChatTime}>{TimeFormat(time)}</Text>
                    </View>
                </View>
            </View>
            {direction === 'left' && (
                <View style={ChatStyles.ProfileAspect}>
                    <Image source={image} style={ChatStyles.ProfileImg} />
                </View>
            )}
        </View>
    )
}

export default function MessageDetailScreen({ route }) {
    const navigation = useNavigation();
    const [MessageVal, OnChangeMessageVal] = useState("");
    const RoomId = route.params.room_id;
    const Participant = route.params.participant;
    const ProfileImg = route.params.profile_img;
    const [UserId, SetUserId] = useState(0);
    const [messages, setMessages] = useState({});

    const { StatusBarManager } = NativeModules;

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

    const GetMessages = async (room_id) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/chat/rooms/${room_id}/messages`)
            const data = await response.json();
            setMessages(data);
        } catch (error) {
            console.log(error);
        }
    }

    const PostMessage = async (UserId, room_id, message) => {
        try {
            await fetch("http://127.0.0.1:8000/chat/messages", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    sender_id: UserId,
                    room_id: room_id,
                    content: message
                }),
            })
            .then(() => {
                GetMessages(RoomId);
                OnChangeMessageVal("");
            })
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        GetMessages(RoomId);

        try {
            getAsyncStorage("id")
            .then((val) => {
                SetUserId(val);
            })
        } catch (error) {
            console.log(error);
        }

        if (UserId != 0) {
            Platform.OS == 'ios' ? StatusBarManager.getHeight((statusBarFrameData) => {
                setStatusBarHeight(statusBarFrameData.height);
            }) : null
        }
    }, [UserId])

    const [statusBarHeight, setStatusBarHeight] = useState(0);
    
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <KeyboardAvoidingView 
                style={styles.container}
                behavior={"padding"}
                keyboardVerticalOffset={statusBarHeight}
            >
                <View style={styles.Header}>
                    <GoBackBtn onPress={() => navigation.goBack()} />
                    <Text style={{ fontWeight: 'bold', fontSize: 16, }}>{Participant}</Text>
                    <GoBackBtn disabled={true} opacity={0} />
                </View>
                <View style={styles.ContentContainer}> 
                    {
                        messages && Object.keys(messages)
                        .sort((a, b) => b - a)
                        .map((key) => {
                            const message = messages[key];
                            return (
                                <Chat 
                                    key={key}
                                    image={{uri: `data:image/jpeg;base64,${ProfileImg}`}}
                                    content={message.content}
                                    sender={message.sender.name}
                                    time={message.timestamp}
                                    direction={message.sender.id === UserId ? 'right' : 'left'} 
                                />
                            );
                        })
                    }
                </View>
                <View style={styles.Footer}>
                    <TextInput
                        style={styles.MessageInput}
                        onChangeText={OnChangeMessageVal}
                        onSubmitEditing={() => PostMessage(UserId, RoomId, MessageVal)}
                        value={MessageVal}
                        placeholder='메세지 입력'
                    />
                    <TouchableOpacity style={styles.SendBtn} onPress={() => PostMessage(UserId, RoomId, MessageVal)}>
                        <Icon name="arrow-up" size={26} color="#fff" />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
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
        justifyContent: 'space-between',
    },

    ContentContainer: {
        flex: 1,
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
    },

    Footer: {
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
        alignItems: 'center',
    },

    MessageInput: {
        borderWidth: 1,
        padding: 10,
        flex: 1,
        borderRadius: 15,
    },

    SendBtn: {
        borderRadius: '100%',
        padding: 5,
        backgroundColor: '#0070F2'
    },
})

const ChatStyles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: 5,
        flexDirection: 'row',
    },

    Contents: {
        display: 'flex',
        flexDirection: 'column',
        gap: 5,
    },

    ContentsFooter: {
        display: 'flex',
        gap: 5,
    },

    ChatTimeContainer: {
        justifyContent: 'flex-end',
    },

    ChatTime: {
        fontSize: 12,
    },

    ChatContentContainer: {
        backgroundColor: '#ccc',
        padding: 10,
        borderRadius: 10,
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
})