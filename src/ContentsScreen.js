import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFonts } from 'expo-font';
import { useState, useCallback } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PostScreen from './PostScreen';


const itemData = [
  {
    idx: 100,
  }, {
    idx: 200,
  }
]

const Stack = createNativeStackNavigator();

export default function ContentsScreen() {
  const [fontsLoaded] = useFonts({
    'BlackHanSans': require('../assets/fonts/BlackHanSans-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <StatusBar />;
  }

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.TitleHeader}>
        <Text style={styles.title}>모작교</Text>
        <TouchableOpacity>
          <Icon name='bell-outline' size={26} />
        </TouchableOpacity>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {
          itemData.map((item, index) =>
            <PostScreen key={index} />
          )
        }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  TitleHeader: {
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  title: {
    fontFamily: 'BlackHanSans',
    fontSize: 31,
    fontWeight: 'bold',
  },
});