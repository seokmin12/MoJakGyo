import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, FlatList, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFonts } from 'expo-font';
import { useState, useCallback } from 'react';

import Profile from '../assets/images/DSC03437.jpg';
import Picture from '../assets/images/DSC_0482.jpg';

export const PostScreen = (props) => {
  const [Likes, SetLikes] = useState(false);
  const [BookMark, SetBookMark] = useState(false);

  const ToggleLikes = () => {
      SetLikes(!Likes);
  };

  const ToggleBookMark = () => {
      SetBookMark(!BookMark);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.ProfileSide}>
            <View style={styles.ProfileAspect}>
                <Image source={Profile} style={styles.profile} />
            </View>
          <Text style={styles.font}>이석민</Text>
        </View>
        <TouchableOpacity>
            <Icon name="dots-horizontal" size={20} />
        </TouchableOpacity>
      </View>

      <View style={styles.contents}>
        <Image source={Picture} style={styles.ContentsImg} />
      </View>
      <View style={styles.footer}>
        <View style={styles.reaction}>
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity style={{alignItems: 'center'}} onPress={() => ToggleLikes()}>
                <Icon name={Likes ? 'thumb-up' : 'thumb-up-outline'} size={25} color={Likes ? '#0070F2' : '#000000'} />
                <Text style={{fontSize: 10}}>10k</Text>
            </TouchableOpacity>
          </View>
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity style={{alignItems: 'center'}}>
                <Icon name='briefcase-plus-outline' size={25} />
                <Text style={{fontSize: 10}}>섭외하기</Text>
            </TouchableOpacity>
          </View>         
        </View>
        <TouchableOpacity onPress={() => ToggleBookMark()}>
            <Icon name={BookMark ? 'bookmark' : 'bookmark-outline'} size={25} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const itemData = [
  {
    idx: 100,
  }, {
    idx: 200,
  }
]

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
    <View style={{backgroundColor: '#fff', flex: 1,}}>
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

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 10,
      display: 'flex',
      gap: 10,
    },
  
    header: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  
    ProfileSide: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },

    ProfileAspect: {
        aspectRatio: 1,
        width: '25%',
        backgroundColor: '#ccc',
        borderRadius: 1000,
    },
  
    profile: {
      width: '100%',
      height: undefined,
      aspectRatio: 1,
      borderRadius: 1000,
    },
  
    contents: {
      aspectRatio: 1,
      backgroundColor: '#ccc',
      borderRadius: 20,
    },
  
    ContentsImg: {
      width: '100%',
      height: undefined,
      aspectRatio: 1,
      borderRadius: 20,
    },
  
    footer: {
      paddingLeft: 10,
      paddingRight: 10,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  
    reaction: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 30,
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

    font: {
        fontFamily: 'BlackHanSans',
    },
});