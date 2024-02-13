import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, Appearance } from 'react-native';
import { useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFonts } from 'expo-font';

import ContentsScreen from './src/ContentsScreen.js';
import ProfileScreen from './src/ProfileScreen.js';
import MessageScreen from './src/MessageScreen.js';
import MarketScreen from './src/MarketScreen.js';
import UploadScreen from './src/UploadScreen.js';
import PostDetailScreen from './src/detail/PostDetailScreen.js';
import PostScreen from './src/PostScreen.js';
import CastingDetailScreen from './src/detail/CastingDetailScreen.js';
import NotificationScreen from './src/NotificationScreen.js';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name='Home'
        component={ContentsScreen}
        options={{
          title: '홈',
          tabBarIcon: ({ size, focused }) => (
            focused ?
              <Icon name="home" size={size} />
              :
              <Icon name="home-outline" size={size} />
          ),
        }}
      />

      <Tab.Screen
        name='Message'
        component={MessageScreen}
        options={{
          title: '메시지',
          tabBarIcon: ({ size, focused }) => (
            focused ?
              <Icon name="email-fast" size={size} />
              :
              <Icon name="email-fast-outline" size={size} />
          ),
        }}
      />

      <Tab.Screen
        name='Upload'
        component={UploadScreen}
        options={{
          title: '업로드',
          tabBarIcon: ({ size, focused }) => (
            focused ?
              <Icon name="camera-plus" size={size} />
              :
              <Icon name="camera-plus-outline" size={size} />
          ),
        }}
      />

      <Tab.Screen
        name='Market'
        component={MarketScreen}
        options={{
          title: '마켓',
          tabBarIcon: ({ size, focused }) => (
            focused ?
              <Icon name="cart" size={size} />
              :
              <Icon name="cart-outline" size={size} />
          ),
        }}
      />

      <Tab.Screen
        name='Profile'
        component={ProfileScreen}
        options={{
          title: '프로필',
          tabBarIcon: ({ size, focused }) => (
            focused ?
              <Icon name="account" size={size} />
              :
              <Icon name="account-outline" size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}
export default function App() {
  useEffect(() =>
    Appearance.setColorScheme('light')
    , [])
  const [fontsLoaded] = useFonts({
    'BlackHanSans': require('./assets/fonts/BlackHanSans-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <StatusBar />;
  }


  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            tabBarShowLabel: false,
            headerShown: false,
          }}
          initialRouteName='Tab'
        >
          <Stack.Group>
            <Stack.Screen
              name="Tab"
              component={TabNavigator}
            />
            <Stack.Screen
              name="ProfileScreen"
              component={ProfileScreen}
            />
            <Stack.Screen
              name="PostDetailScreen"
              component={PostDetailScreen}
            />
            <Stack.Screen
              name="PostScreen"
              component={PostScreen}
            />
            <Stack.Screen
              name='NotificationScreen'
              component={NotificationScreen}
            />
          </Stack.Group>
          <Stack.Group
            screenOptions={{
              presentation: 'modal',

            }}
          >
            <Stack.Screen
              name="CastingDetailScreen"
              component={CastingDetailScreen}
            />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
