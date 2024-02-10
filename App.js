import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView, SafeAreaView } from 'react-native';
import Contents from '../mojakgyo/Contents.js';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

function SearchScreen() {
  return <Text>Search</Text>;
}

function MarketScreen() {
  return <Text>Market</Text>;
}

function ProfileScreen() {
  return <Text>Profile</Text>;
}

export default function App() {
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
            component={Contents}
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
            name='Search'
            component={SearchScreen}
            options={{
              title: '검색',
              tabBarIcon: ({size, focused}) => (
                focused ? 
                <Icon name="compass" size={size} />
                :
                <Icon name="compass-outline" size={size} />
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
