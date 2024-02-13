import { StyleSheet, Text, View, Modal, PanResponder, Dimensions, TouchableWithoutFeedback, Pressable, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRef, useEffect } from 'react';

export default function EtcScreen(props) {
    const { IsVisible, SetVisible } = props;

    const screenHeight = Dimensions.get("screen").height;
    const panY = useRef(new Animated.Value(screenHeight)).current;
    const translateY = panY.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: [0, 0, 1],
    });

    const resetBottomSheet = Animated.timing(panY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
    });

    const closeBottomSheet = Animated.timing(panY, {
        toValue: screenHeight,
        duration: 300,
        useNativeDriver: true,
    });

    const panResponders = useRef(PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => false,
        onPanResponderMove: (event, gestureState) => {
            panY.setValue(gestureState.dy);
        },
        onPanResponderRelease: (event, gestureState) => {
            if (gestureState.dy > 0 && gestureState.vy > 1.5) {
                closeModal();
            }
            else {
                resetBottomSheet.start();
            }
        }
    })).current;

    useEffect(() => {
        if (IsVisible) {
            resetBottomSheet.start();
        }
    }, [IsVisible]);

    const closeModal = () => {
        closeBottomSheet.start(() => {
            SetVisible(false);
        })
    }
    return (
        <Modal
            visible={IsVisible}
            animationType={"fade"}
            transparent={true}
        >
            <View style={styles.overlay}>
                <TouchableWithoutFeedback
                    onPress={() => closeModal()}
                >
                    <View style={styles.background} />
                </TouchableWithoutFeedback>
                <Animated.View
                    style={[styles.ModalContainer, { transform: [{ translateY: translateY }] }]}
                    {...panResponders.panHandlers}
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
                </Animated.View>

            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0, 0, 0, 0.4)"
    },
    background: {
        flex: 1,
    },

    ModalContainer: {
        height: '30%',
        marginTop: 'auto',
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
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
        // padding: 10,
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
})