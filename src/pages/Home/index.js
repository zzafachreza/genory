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
  TouchableNativeFeedback,
  Linking
} from 'react-native';
import { MyButton, MyCalendar, MyGap, MyHeader, MyInput, MyPicker } from '../../components';
import { MyDimensi, colors, fonts, windowHeight, windowWidth, Color } from '../../utils';
import { MYAPP, apiURL, api_token, getData, storeData, webURL } from '../../utils/localStorage';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { ceil, color } from 'react-native-reanimated';
import axios from 'axios';
import moment, { weekdays } from 'moment';
import { useToast } from 'react-native-toast-notifications';
import MyLoading from '../../components/MyLoading';
import Carousel from 'react-native-snap-carousel';
import { Icon } from 'react-native-elements';
import { useIsFocused } from '@react-navigation/native';
import YouTubeIframe from 'react-native-youtube-iframe';

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
  const [slider, setSlider] = useState([])
  const _renderItem = ({ item, index }) => {
    return (

      <View style={{
        width: 300,
        height: 180,
        // borderWidth: 1,
        overflow: 'hidden',
        borderRadius: 10,
      }}>
        <Image style={{
          width: 300,
          height: 180,
          // borderRadius: 10,
        }} source={{
          uri: webURL + item.gambar
        }} />
      </View>

    );
  }
  const __GetSlider = () => {
    getData('user').then(u => {
      axios.post(apiURL + 'slider', {
        posisi: 'Home',
        tipe: u.tipe
      }).then(res => {
        console.log(res.data);
        setSlider(res.data)
      })
    })
  }

  const __getUser = () => {
    getData('user').then(u => {
      axios.post(apiURL + 'get_profile', {
        id: u.id_pengguna
      }).then(res => {
        console.log(res.data);
        setUser(res.data);
        storeData('user', res.data);
      })
    });
  }

  const [youtube, setYotube] = useState('VYvWyywdpfo');
  const _getYoutube = () => {
    getData('user').then(u => {
      axios.post(apiURL + 'yt_link', {
        tipe: u.tipe
      }).then(res => {
        console.log(res.data.youtube);
        setYotube(res.data.youtube);
      })
    });
  }

  const isFocus = useIsFocused();
  useEffect(() => {
    if (isFocus) {
      __getUser();
      __GetSlider();
      _getYoutube();
    }
  }, [isFocus])
  return (
    <View style={{
      flex: 1,
      backgroundColor: colors.white
    }}>

      <ScrollView>

        <View style={{
          backgroundColor: user.tipe == 'Gain' ? colors.primary + '80' : colors.secondary + '80',
          padding: 20,
          height: 270,
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
        }}>

          <View style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: 'center'

          }}>

            <View>
              <Text style={{
                ...fonts.body3,
                color: user.tipe == 'Gain' ? colors.primary : colors.secondary,
              }}>Selamat Datang</Text>

              <Text style={{
                ...fonts.headline4,
                color: user.tipe == 'Gain' ? colors.primary : colors.secondary,
              }}>{user.nama}</Text>
            </View>

            <View>
              <Image style={{
                width: 73,
                height: 29
              }} source={require('../../assets/genory.png')} />
            </View>

          </View>

          <View style={{
            marginTop: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Text style={{
              ...fonts.headline4,
              textAlign: 'center',
              color: user.tipe == 'Gain' ? colors.primary : colors.secondary,
              marginBottom: 10,
            }}>Program Weight Gain with Genory</Text>

            <Carousel
              loop
              autoPlayInterval={1000}
              autoplay
              layoutCardOffset={100}
              // ref={(c) => { this._carousel = c; }}
              data={slider}
              renderItem={_renderItem}
              sliderWidth={300}
              itemWidth={300}
            />
          </View>


        </View>

        <View style={{
          padding: 10,
          marginTop: 40
        }}>

          <View style={{
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Text style={{
              fontFamily: fonts.primary[400],
              fontSize: 12,
              textAlign: 'center',
              maxWidth: '90%'
            }}>
              Siap menaikkan berat badan dengan cara yang sehat dan efektif?  Dengan program Weight Gain dari Genory,  kamu akan dipandu untuk mencapai berat badan ideal  melalui langkah-langkah praktis dan bimbingan yang mudah diikuti.
            </Text>
          </View>

          <View style={{
            marginTop: 10,
          }}>
            <Text style={{
              fontFamily: fonts.primary[500],
              fontSize: 13,
              color: user.tipe == 'Gain' ? colors.primary : colors.secondary,
              textAlign: "center",
              marginBottom: 10,
            }}>Capai targetmu lebih cepat dan sehat!</Text>



            <View style={{
              paddingHorizontal: 20,

            }}>
              <YouTubeIframe
                height={200}
                width={"100%"}
                videoId={youtube}
                play={false}
                onChangeState={event => console.log(event)}
                onReady={event => console.log("Video is ready")}
              />

              {/* PROGRAM PERTAMA */}
              <TouchableNativeFeedback onPress={() => navigation.navigate('ProgramPertama', { week: 1 })}>
                <View style={{
                  padding: 10,
                  borderRadius: 30,
                  borderWidth: 2,
                  borderColor: user.tipe == 'Gain' ? colors.primary : colors.secondary,
                }}>
                  <Text style={{ fontFamily: fonts.primary[600], fontSize: 15, textAlign: 'center', color: user.tipe == 'Gain' ? colors.primary : colors.secondary, }}>Program Pertama</Text>
                </View>
              </TouchableNativeFeedback>

              {/* PROGRAM KEDUA */}
              <TouchableNativeFeedback onPress={() => navigation.navigate('ProgramPertama', { week: 2 })}>
                <View style={{
                  padding: 10,
                  borderRadius: 30,
                  borderWidth: 2,
                  borderColor: user.tipe == 'Gain' ? colors.primary : colors.secondary,
                  marginTop: 10
                }}>
                  <Text style={{ fontFamily: fonts.primary[600], fontSize: 15, textAlign: 'center', color: user.tipe == 'Gain' ? colors.primary : colors.secondary, }}>Program Selanjutnya</Text>
                </View>
              </TouchableNativeFeedback>

              <TouchableNativeFeedback onPress={() => navigation.navigate('MealPlan')}>
                <View style={{
                  padding: 10,
                  borderRadius: 30,
                  borderWidth: 2,
                  borderColor: user.tipe == 'Gain' ? colors.primary : colors.secondary,
                  marginTop: 10
                }}>
                  <Text style={{ fontFamily: fonts.primary[600], fontSize: 15, textAlign: 'center', color: user.tipe == 'Gain' ? colors.primary : colors.secondary, }}>Meal Plan</Text>
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