import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView, SafeAreaView } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFonts } from 'expo-font';

import ContentsScreen from './ContentsScreen.js';
import ProfileScreen from './ProfileScreen.js';
import MessageScreen from './MessageScreen.js';
import MarketScreen from './MarketScreen.js';

const Tab = createBottomTabNavigator();

function UploadScreen() {
  return <Text>Upload</Text>;
}

export default function App() {
  const [fontsLoaded] = useFonts({
    'BlackHanSans': require('./assets/fonts/BlackHanSans-Regular.ttf'),
  });
  
  if (!fontsLoaded) {
    return <StatusBar />;
  }
  


  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
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
              tabBarIcon: ({size, focused}) => (
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
              tabBarIcon: ({size, focused}) => (
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
              tabBarIcon: ({size, focused}) => (
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
              tabBarIcon: ({size, focused}) => (
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
              tabBarIcon: ({size, focused}) => (
                focused ? 
                <Icon name="account" size={size} />
                :
                <Icon name="account-outline" size={size} />
              ),
            }}
          />
        </Tab.Navigator>
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
