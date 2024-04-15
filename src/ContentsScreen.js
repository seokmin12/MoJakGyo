import { StyleSheet, Text, View, TouchableOpacity, RefreshControl, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFonts } from 'expo-font';
import { useState, useCallback, useEffect, useRef } from 'react';

import PostScreen from './PostScreen.js';

import { useNavigation } from '@react-navigation/native';


export default function ContentsScreen() {
  const navigation = useNavigation();
  const PostData = useRef({});
  const [isReady, setIsReady] = useState(false);

  const [fontsLoaded] = useFonts({
    'BlackHanSans': require('../assets/fonts/BlackHanSans-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <StatusBar />;
  }

  const GetPosts = async () => {
    try {
      const response = await fetch(
        'http://127.0.0.1:8000/posts'
      );
      const json = await response.json();
      PostData.current = json;
    } catch (error) {
      console.log(error);
    } finally {
      setIsReady(true);
    }
  }

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      GetPosts();
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    if(!isReady) {
      GetPosts();
    }
  }, [isReady])

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
        data={PostData["current"]}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => <PostScreen writer_id={item.writer.id} writer={item.writer.name} job={item.writer.job} post_id={item.id} likes={item.likes} />}
        keyExtractor={(item) => item.id}
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