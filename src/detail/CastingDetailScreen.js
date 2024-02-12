import { StyleSheet, Text, View, Image, TouchableOpacity, Easing, Animated, Platform, SafeAreaView, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert, Pressable, Modal, PixelRatio } from 'react-native';
import { useFonts } from 'expo-font';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { useState, useRef, useEffect } from 'react';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Postcode from '@actbase/react-daum-postcode';

import Profile from '../../assets/images/DSC03437.jpg';

const fontScale = PixelRatio.getFontScale();
const getFontSize = (size) => {
    return size / fontScale;
}

function CustomBtn({ label, onPress, disabled }) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.CustomBtn, {
                backgroundColor: disabled ? '#0070F2' : '#DFDFDF'
            }]}
            disabled={disabled}
        >
            <Text style={styles.CustomBtnLabel}>{label}</Text>
        </TouchableOpacity>
    )
}

function CustomAlert(title, description, onPress) {
    Alert.alert(
        title,
        description,
        [{
            text: 'OK',
            onPress: onPress,
        }]
    )
}

const formatDate = (date) => {
    const Add0 = (num) => {
        newNum = '';
        if (num.length == 1) {
            newNum = '0' + num;
        } else {
            newNum = num;
        }

        return newNum;
    }
    return `${date.getFullYear()}년 ${Add0((date.getMonth() + 1).toString())}월 ${Add0((date.getDate()).toString())}일`;
};

export default function CastingDetailScreen() {
    const [fontsLoaded] = useFonts({
        'BlackHanSans': require('../../assets/fonts/BlackHanSans-Regular.ttf'),
    });

    if (!fontsLoaded) {
        return <StatusBar />;
    }

    const BriefcaseStartVal = useRef(new Animated.Value(0)).current;
    const BriefcaseEndVal = 50;
    const duration = 2000;

    const ChkBoxanimatedScale = useRef(new Animated.Value(0)).current;

    const BriefCaseAni = () => {
        BriefcaseStartVal.setValue(-50);

        Animated.loop(Animated.timing(BriefcaseStartVal, {
            toValue: BriefcaseEndVal,
            duration: duration,
            useNativeDriver: true,
            easing: Easing.linear,
        })).start();
    }

    const ToggleChkBox = () => {
        SetChecked(!IsChecked)

        ChkBoxanimatedScale.setValue(0.8);
        Animated.spring(ChkBoxanimatedScale, {
            toValue: 1,
            bounciness: 24,
            speed: 20,
            useNativeDriver: true,
        }).start();
    }

    useEffect(() => {
        BriefCaseAni();
        ChkBoxanimatedScale.setValue(1);
    }, [])

    const offset = 1000 * 60 * 60 * 9;

    const [PayAmount, SetPayAmount] = useState('');
    const [Chosendate, setDate] = useState(new Date());
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedCity, setSelectedCity] = useState("");
    const [isModal, setModal] = useState(false);
    const [IsChecked, SetChecked] = useState(false);


    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        const today = new Date((new Date()).getTime() + offset);
        date = new Date(date.getTime() + offset);

        if (date < today) {
            CustomAlert('오늘을 포함한 이전 날짜는 선택할 수 없습니다!', '', setDatePickerVisibility(true));
        } else {
            setDate(date);
            hideDatePicker();
        }
    };

    function onPayChanged(num) {
        let newNum = '';
        let numbers = '0123456789';

        for (var i = 0; i < num.length; i++) {
            if (numbers.indexOf(num[i]) > -1) {
                newNum = newNum + num[i];
            }
        }
        if (newNum.length > 1 && newNum[0] == '0') {
            newNum = newNum.substring(1);
        }
        SetPayAmount(newNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    }

    return (
        <SafeAreaView style={styles.SafeArea}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <View style={styles.Header}>
                        <Text style={[styles.Title, { fontSize: getFontSize(30) }]}>촬영 제안서</Text>
                        <View style={styles.Icons}>
                            <View style={styles.Profile}>
                                <View style={styles.Aspect}>
                                    <Image source={Profile} style={styles.ProfileImg} />
                                </View>
                                <Text>이석민</Text>
                            </View>
                            <Animated.View style={{ transform: [{ translateX: BriefcaseStartVal, }] }}>
                                <Icon name='briefcase-outline' size={31} />
                            </Animated.View>
                            <View style={styles.Profile}>
                                <View style={styles.Aspect}>
                                    <Image source={Profile} style={styles.ProfileImg} />
                                </View>
                                <Text>이석민</Text>
                            </View>
                        </View>
                    </View>
                    <KeyboardAvoidingView
                        style={styles.Form}
                        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                    >
                        <View style={styles.FormElement}>
                            <Text>페이(원)</Text>
                            <TextInput
                                style={styles.PayAmountInput}
                                keyboardType='numeric'
                                onChangeText={(num) => onPayChanged(num)}
                                value={PayAmount}
                                placeholder='0'
                                returnKeyType="done"
                            />
                        </View>
                        <View style={styles.FormElement}>
                            <Text>날짜</Text>
                            <Pressable onPress={showDatePicker}>
                                <View pointerEvents="none">
                                    <TextInput
                                        style={styles.PayAmountInput}
                                        value={formatDate(Chosendate)}
                                        editable={false}
                                    />
                                </View>
                            </Pressable>
                            <DateTimePickerModal
                                isVisible={isDatePickerVisible}
                                mode="date"
                                onConfirm={handleConfirm}
                                onCancel={hideDatePicker}
                                locale="kr-KR"
                                value={Chosendate}
                            />
                        </View>
                        <View style={styles.FormElement}>
                            <Text>장소</Text>
                            <Pressable onPress={() => setModal(true)}>
                                <View pointerEvents="none">
                                    <TextInput
                                        style={styles.PayAmountInput}
                                        value={selectedCity}
                                        editable={false}
                                        placeholder='장소를 입력하세요.'
                                    />
                                </View>
                            </Pressable>
                            <Modal
                                visible={isModal}
                                animationType={"slide"}
                            >
                                <SafeAreaView style={{ flex: 1, }}>
                                    <View style={styles.ModalContainer}>
                                        <View style={styles.ModalHeader}>
                                            <TouchableOpacity onPress={() => setModal(false)}>
                                                <Icon name='close' size={31} />
                                            </TouchableOpacity>
                                        </View>
                                        <Postcode
                                            style={{ width: '100%', height: 320 }}
                                            jsOptions={{ animation: true, hideMapBtn: true }}
                                            onSelected={data => {
                                                const address = JSON.stringify(data['roadAddress']).replaceAll("\"", "");
                                                setSelectedCity(address);
                                                console.log(address);
                                                setModal(false);
                                            }}
                                        />
                                    </View>
                                </SafeAreaView>
                            </Modal>
                        </View>
                    </KeyboardAvoidingView>
                    <View style={styles.TermContainer}>
                        <Animated.View style={[styles.ChkBox, { transform: [{ scale: ChkBoxanimatedScale }] }]}>
                            <Pressable onPress={() => ToggleChkBox()}>
                                <Icon name={IsChecked ? 'check-circle' : 'check-circle-outline'} size={30} color={IsChecked ? '#5DDEA3' : '#000'} />
                            </Pressable>
                        </Animated.View>
                        <Text style={styles.Term}>본인은 본 촬영에 동의합니다.</Text>
                    </View>
                    <CustomBtn label='진행' disabled={IsChecked} />
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    SafeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },

    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: 20,
        paddingRight: 20,
        justifyContent: 'space-between',
    },

    Header: {
        paddingTop: 20,
        paddingBottom: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: 30,
    },

    Title: {
        fontFamily: 'BlackHanSans',
        textAlign: 'center',
    },

    Icons: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    Profile: {
        width: '25%',
        height: undefined,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
    },

    Aspect: {
        width: '100%',
        height: undefined,
        aspectRatio: 1,
        backgroundColor: '#ccc',
        borderRadius: 1000,
    },

    ProfileImg: {
        width: '100%',
        height: undefined,
        aspectRatio: 1,
        borderRadius: 1000,
    },

    CustomBtn: {
        padding: 15,
        borderRadius: 15,
    },

    CustomBtnLabel: {
        color: '#fff',
        textAlign: 'center',
    },

    Form: {
        // flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
    },

    FormElement: {
        gap: 10,
    },

    PayAmountInput: {
        backgroundColor: '#EEEFF0',
        padding: 10,
        borderColor: '#EFEFEF',
        borderWidth: 1,
        width: '100%',
    },

    ModalContainer: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },

    TermContainer: {
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
})