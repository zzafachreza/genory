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
  ScrollView
} from 'react-native';
import { MyButton, MyCalendar, MyGap, MyHeader, MyInput, MyPicker } from '../../components';
import { MyDimensi, colors, fonts, windowHeight, windowWidth, Color } from '../../utils';
import { MYAPP, apiURL, api_token, getData, storeData } from '../../utils/localStorage';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { color } from 'react-native-reanimated';
import axios from 'axios';
import moment from 'moment';
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
    <ImageBackground source={require('../../assets/bghome.png')} style={{
      flex: 1,
      backgroundColor: colors.white,
      width: "100%",
      height: "100%"
    }}>

      <ScrollView>

        <View style={{
          padding: 10
        }}>

          <View style={{
            alignItems: 'center',
            marginTop: 10
          }}>
            <Image style={{
              width: 315,
              height: 357
            }} source={require('../../assets/logohome.png')} />
          </View>


          {/* MENU */}

          <View style={{
            padding: 20
          }}>

            <View>
              <TouchableWithoutFeedback onPress={() => navigation.navigate('KalkulatorKompos')}>
                <View style={{
                  padding: 10,
                  backgroundColor: colors.primary,
                  borderRadius: 10,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>

                  <View style={{
                    marginRight: 29
                  }}>
                    <Image style={{
                      width: 93,
                      height: 93,
                    }} source={require('../../assets/icon_kalkulatorkompos.png')} />
                  </View>

                  <View style={{
                    alignItems: "center"
                  }}>
                    <Text style={{
                      fontFamily: fonts.primary[500],
                      color: colors.white,
                      fontSize: 30,


                    }}>
                      Kalkulator{'\n'}
                      Kompos
                    </Text>
                  </View>

                </View>
              </TouchableWithoutFeedback>
            </View>


            <MyGap jarak={20} />


            <View>
              <TouchableWithoutFeedback onPress={() => navigation.navigate('Petunjuk')}>
                <View style={{
                  padding: 10,
                  backgroundColor: colors.primary,
                  borderRadius: 10,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>

                  <View style={{
                    marginRight: 29,
                    left: -10
                  }}>
                    <Image style={{
                      width: 93,
                      height: 93,
                    }} source={require('../../assets/icon_petunjuk.png')} />
                  </View>

                  <View style={{
                    alignItems: "center"
                  }}>
                    <Text style={{
                      fontFamily: fonts.primary[500],
                      color: colors.white,
                      fontSize: 30,
                      left: -20


                    }}>
                      Petunjuk
                    </Text>
                  </View>

                </View>
              </TouchableWithoutFeedback>
            </View>

          </View>

        </View>
      </ScrollView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({})