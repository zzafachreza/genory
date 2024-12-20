import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  Animated,
  ImageBackground,
  TouchableWithoutFeedback,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TouchableNativeFeedback
} from 'react-native';
import { MyButton, MyCalendar, MyGap, MyHeader, MyInput, MyPicker } from '../../components';
import { MyDimensi, colors, fonts, windowHeight, windowWidth, Color } from '../../utils';
import { MYAPP, apiURL, api_token, getData, storeData } from '../../utils/localStorage';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { color } from 'react-native-reanimated';
import axios from 'axios';
import moment, { weekdays } from 'moment';
import { useToast } from 'react-native-toast-notifications';
import MyLoading from '../../components/MyLoading';

import { Icon } from 'react-native-elements';


const MyMenu = ({ onPress, img, label, backgroundColor, desc }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
        width: windowWidth / 4,
        height: windowWidth / 4,
      }}>
        <View style={{
          backgroundColor: backgroundColor,
          borderRadius: 12,
          width: windowWidth / 4,
          height: windowWidth / 4,
          padding: 10,
          justifyContent: 'center',
          alignItems: 'center'

        }}>
          <Image source={img} style={{
            width: windowWidth / 5, height: windowWidth / 5,
          }} />
        </View>
        <Text style={{
          marginTop: 10,
          color: colors.black,
          ...fonts.caption,
          textAlign: 'center',
          maxWidth: '85%'
        }}>{label}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default function Home({ navigation, route }) {
  const [user, setUser] = useState({});

  const __getUser = () => {
    getData('user').then(u => {
      setUser(u)
    })
  }

  useEffect(() => {
    __getUser();
  }, [])
  return (
  <View style={{
    flex:1,
    backgroundColor:colors.white
  }}>

  <ScrollView>

  <View style={{
    backgroundColor:colors.secondary,
    padding:20,
    height:328,
    borderBottomLeftRadius:30,
    borderBottomRightRadius:30,
  }}>

  <View style={{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:'center'
    
  }}>

  <View>
    <Text style={{
      fontFamily:fonts.primary[500],
      fontSize:15,
      color:colors.primary
    }}>Selamat Datang</Text>

<Text style={{
      fontFamily:fonts.primary[500],
      fontSize:20,
      color:colors.primary
    }}>Jone Done</Text>
  </View>

  <View>
    <Image style={{
      width:73, 
      height:29
    }} source={require('../../assets/genory.png')}/>
  </View>

  </View>

    <View style={{
      marginTop:20
    }}>
      <Text style={{
        fontFamily:fonts.primary[700],
        fontSize:18,
        textAlign:"center",
        color:colors.primary,

      }}>Program Weight Gain with Genory</Text>

      <View style={{
        alignItems:'center',
        marginTop:'4%'
      }}>
        <Image style={{
          width:356,
          height:207,
        }} source={require('../../assets/slider.png')}/>
      </View>
    </View>


  </View>

  <View style={{
    padding:10,
    marginTop:20
  }}>

  <View>
    <Text style={{
      fontFamily:fonts.primary[400],
      fontSize:15,
      textAlign:'center'
    }}>
    Siap menaikkan berat badan dengan cara yang sehat dan efektif?  Dengan program Weight Gain dari Genory,  kamu akan dipandu untuk mencapai berat badan ideal  melalui langkah-langkah praktis dan bimbingan yang mudah diikuti. 
    </Text>
  </View>

  <View style={{
    marginTop:20,
  }}>
    <Text style={{
      fontFamily:fonts.primary[500],
      fontSize:15,
      color:colors.primary,
      textAlign:"center"
    }}>Capai targetmu lebih cepat dan sehat!</Text>

    <View style={{
      padding:30,
      marginTop: -20
     
    }}>

    {/* PROGRAM PERTAMA */}
      <TouchableNativeFeedback onPress={() => navigation.navigate('ProgramPertama', {week: 1})}>
        <View style={{
          padding:10,
          borderRadius:30,
          borderWidth:2,
          borderColor:colors.primary,
        }}>
        <Text style={{fontFamily:fonts.primary[600], fontSize:15, textAlign:'center', color:colors.primary}}>Program Pertama</Text>
        </View>
      </TouchableNativeFeedback>

{/* PROGRAM KEDUA */}
      <TouchableNativeFeedback onPress={() => navigation.navigate('ProgramPertama', { week: 2 })}>
        <View style={{
          padding:10,
          borderRadius:30,
          borderWidth:2,
          borderColor:colors.primary,
          marginTop:10
        }}>
        <Text style={{fontFamily:fonts.primary[600], fontSize:15, textAlign:'center', color:colors.primary}}>Program Selanjutnya</Text>
        </View>
      </TouchableNativeFeedback>

      <TouchableNativeFeedback onPress={() => navigation.navigate('MealPlan')}>
        <View style={{
          padding:10,
          borderRadius:30,
          borderWidth:2,
          borderColor:colors.primary,
          marginTop:10
        }}>
        <Text style={{fontFamily:fonts.primary[600], fontSize:15, textAlign:'center', color:colors.primary}}>Meal Plan</Text>
        </View>
      </TouchableNativeFeedback>


      


      
    </View>
  </View>

  </View>
  </ScrollView>
  </View>
  )
}

const styles = StyleSheet.create({})