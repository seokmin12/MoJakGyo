import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, RefreshControl, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFonts } from 'expo-font';
import { useState, useCallback } from 'react';

import PostScreen from './PostScreen.js';

import { useNavigation } from '@react-navigation/native';


const itemData = [
  {
    idx: 100,
    writer: '이석민',
    job: '작가',
  }, {
    idx: 200,
    writer: '이민',
    job: '모델',
  }
]

export default function ContentsScreen() {
  const navigation = useNavigation();

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
        <TouchableOpacity onPress={() => navigation.navigate('NotificationScreen')}>
          <Icon name='bell-outline' size={26} />
          <View style={styles.Badge}></View>
        </TouchableOpacity>
      </View>
      <FlatList
        data={itemData}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => <PostScreen writer={item.writer} job={item.job} />}
        keyExtractor={(item) => item.idx}
      />
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

  Badge: {
    position: 'absolute',
    right: 0,
    top: -2,
    backgroundColor: '#FF0000',
    borderRadius: 1000,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 3,
  },
});