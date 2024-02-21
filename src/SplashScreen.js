import { useEffect } from 'react';
import { View, Image, StyleSheet, Animated } from 'react-native';
import bridge from '../assets/icon.png';
import { useFonts } from 'expo-font';

export default function SplashScreen(props) {
    const { TitleAnimated, LogoAnimated } = props;
    const duration = 1500;

    useEffect(() => {
        Animated.timing(TitleAnimated, {
            toValue: 50,
            duration: duration,
            useNativeDriver: true,
        }).start();
        Animated.timing(LogoAnimated, {
            toValue: -50,
            duration: duration,
            useNativeDriver: true,
        }).start();
    }, [props])

    const [fontsLoaded] = useFonts({
        'BlackHanSans': require('../assets/fonts/BlackHanSans-Regular.ttf'),
    });

    if (!fontsLoaded) {
        return <StatusBar />;
    }

    return (
        <View style={styles.container}>
            <View style={styles.Splash}>
                <Animated.View style={[styles.LogoContainer, { transform: [{ translateX: LogoAnimated }] }]}>
                    <Image source={bridge} style={styles.Logo} />
                </Animated.View>
                <Animated.Text style={[styles.Title, { transform: [{ translateX: TitleAnimated }] }]}>모작교</Animated.Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },

    Splash: {
        width: '100%',
        padding: 10,
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },

    LogoContainer: {
        position: 'absolute',
        width: '25%',
        height: undefined,
        aspectRatio: 1,
        zIndex: 1,
    },

    Logo: {
        width: '100%',
        height: undefined,
        aspectRatio: 1,
        resizeMode: 'contain',
    },

    Title: {
        position: 'absolute',
        fontFamily: 'BlackHanSans',
        fontSize: 40,
    }
})