import { StyleSheet, View, TextInput, Text, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, NativeModules, Keyboard, Platform } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { GoBackBtn } from '../components/GoBackBtn';

const Chat = ({ direction }) => {
    return (
        <View style={[ChatStyles.container, direction === 'right' ? {flexDirection: 'row'} : {flexDirection: 'row-reverse'}]}>
            <View style={ChatStyles.ChatTimeContainer}>
                <Text style={ChatStyles.ChatTime}>오후 9:06</Text>
            </View>
            <View style={ChatStyles.ChatContentContainer}>
                <Text>{direction}</Text>
            </View>
        </View>
    )
}

export default function MessageDetailScreen({ route }) {
    const navigation = useNavigation();
    const [MessageVal, OnChangeMessageVal] = useState("");
    const RoomId = route.params.room_id;
    const Messages = useRef({});

    const { StatusBarManager } = NativeModules;

    const GetMessages = async (room_id) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/chat/rooms/${room_id}/messages`)
            Messages.current = await response.json();
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        Platform.OS == 'ios' ? StatusBarManager.getHeight((statusBarFrameData) => {
            setStatusBarHeight(statusBarFrameData.height)
          }) : null

          GetMessages(RoomId);
          setTimeout(() => {
            console.log(Messages.current);
          }, 100)
    }, []);

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
                </View>
                <View style={styles.ContentContainer}>
                    <Chat direction='right' />
                    <Chat direction='left' />
                </View>
                <View style={styles.Footer}>
                    <TextInput
                        style={styles.MessageInput}
                        onChangeText={OnChangeMessageVal}
                        value={MessageVal}
                        placeholder='메세지 입력'
                    />
                    <TouchableOpacity style={styles.SendBtn}>
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
    }
})