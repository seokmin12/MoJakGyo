import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import Profile from '../mojakgyo/assets/images/DSC03437.jpg';
import Picture from '../mojakgyo/assets/images/DSC_0482.jpg'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFonts } from 'expo-font';
import { useState } from 'react';

export default function Contents() {
    const [fontsLoaded] = useFonts({
        'BlackHanSans-Regular': require('./assets/fonts/BlackHanSans-Regular.ttf'),
    });

    const [Likes, SetLikes] = useState(false);
    const [BookMark, SetBookMark] = useState(false);

    const ToggleLikes = () => {
        SetLikes(!Likes);
    };

    const ToggleBookMark = () => {
        SetBookMark(!BookMark);
    }

  const result = [];
  for(let i = 0; i < 5; i++) {
    result.push(
      <View style={ContentsStyles.container} key={i}>
      <View style={ContentsStyles.header}>
        <View style={ContentsStyles.ProfileSide}>
          <Image source={Profile} style={ContentsStyles.profile} />
          <Text style={ContentsStyles.font}>이석민</Text>
        </View>
        <Icon name="dots-horizontal" size={20} />
      </View>

      <View style={ContentsStyles.contents}>
        <Image source={Picture} style={ContentsStyles.ContentsImg} />
      </View>
      <View style={ContentsStyles.footer}>
        <View style={ContentsStyles.reaction}>
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity onPress={() => ToggleLikes()}>
                <Icon name={Likes ? 'thumb-up' : 'thumb-up-outline'} size={25} color={Likes ? '#A1D15C' : '#000000'} />
            </TouchableOpacity>
            <Text style={{fontSize: 10}}>10k</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Icon name='comment-outline' size={25} />
            <Text style={{fontSize: 10}}>10k</Text>
          </View>         
        </View>
        <TouchableOpacity onPress={() => ToggleBookMark()}>
            <Icon name={BookMark ? 'bookmark' : 'bookmark-outline'} size={25} />
        </TouchableOpacity>
      </View>
    </View>
    )
  }
  return (
    <View style={{backgroundColor: '#fff'}}>
        <Text style={ContentsStyles.title}>모작교</Text>
        <ScrollView>
            {result}
        </ScrollView>
    </View>
  );
}

const ContentsStyles = StyleSheet.create({
    container: {
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
  
    profile: {
      width: '25%',
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
    
    title: {
        padding: 10,
        fontFamily: 'BlackHanSans-Regular',
        fontSize: 31,
        fontWeight: 'bold',
    },

    font: {
        fontFamily: 'BlackHanSans-Regular',
    },
});