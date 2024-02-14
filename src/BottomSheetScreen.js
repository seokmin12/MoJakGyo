import { StyleSheet, Text, View, Modal, PanResponder, Dimensions, TouchableWithoutFeedback, Pressable, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRef, useEffect, Component } from 'react';

export default function BottomSheetScreen({ children, ...props }) {
    const { IsVisible, SetVisible, height } = props;

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
                    style={[styles.ModalContainer, { height: height, transform: [{ translateY: translateY }] }]}
                    {...panResponders.panHandlers}
                >
                    {children}
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
        marginTop: 'auto',
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
    },
})