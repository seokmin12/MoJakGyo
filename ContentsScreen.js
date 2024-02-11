import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import Profile from '../mojakgyo/assets/images/DSC03437.jpg';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFonts } from 'expo-font';
import { useState } from 'react';

export default function ContentsScreen() {
    const [fontsLoaded] = useFonts({
        'BlackHanSans': require('./assets/fonts/BlackHanSans-Regular.ttf'),
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
            <View style={ContentsStyles.ProfileAspect}>
                <Image source={Profile} style={ContentsStyles.profile} />
            </View>
          <Text style={ContentsStyles.font}>이석민</Text>
        </View>
        <TouchableOpacity>
            <Icon name="dots-horizontal" size={20} />
        </TouchableOpacity>
      </View>

      <View style={ContentsStyles.contents}>
        {/* <Image source={Picture} style={ContentsStyles.ContentsImg} /> */}
      </View>
      <View style={ContentsStyles.footer}>
        <View style={ContentsStyles.reaction}>
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity style={{alignItems: 'center'}} onPress={() => ToggleLikes()}>
                <Icon name={Likes ? 'thumb-up' : 'thumb-up-outline'} size={25} color={Likes ? '#A1D15C' : '#000000'} />
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
  return (
    <View style={{backgroundColor: '#fff', flex: 1,}}>
        <View style={ContentsStyles.TitleHeader}>
            <Text style={ContentsStyles.title}>모작교</Text>
            <TouchableOpacity>
                <Icon name='bell-outline' size={26} />
            </TouchableOpacity>
        </View>
        <ScrollView>
            {result}
        </ScrollView>
    </View>
  );
}

const ContentsStyles = StyleSheet.create({
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