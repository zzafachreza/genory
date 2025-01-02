import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  Image,
  TouchableNativeFeedback,
  Animated,
  Dimensions,
  PanResponder,
  Linking,
  TouchableWithoutFeedback,
  TouchableOpacity
} from 'react-native';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { apiURL, getData, webURL } from '../../utils/localStorage';
import axios from 'axios';
import Carousel from 'react-native-snap-carousel';

export default function GetStarted({ navigation, route }) {

  const screenWidth = Dimensions.get('window').width;
  const maxSlide = screenWidth - 100;  // Batas slide panah
  const [data, setData] = useState([
    {
      id: 1,
      gambar: ''
    }
  ]);
  const [medsos, setMedsos] = useState({
    instagram: '',
    tiktok: '',
    whatsapp: '',
  });
  const __GetMedsos = () => {
    axios.post(apiURL + 'medsos').then(res => {
      console.log(res.data);
      setMedsos(res.data)
    })
  }


  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const arrowPosition = useRef(new Animated.Value(0)).current;

  const backgroundColor = arrowPosition.interpolate({
    inputRange: [0, maxSlide], // Batas posisi panah agar tidak melampaui layar
    outputRange: [colors.primary, colors.primary], // Tetap warna primary
  });
  const [user, setUser] = useState({});

  const textOpacity = arrowPosition.interpolate({
    inputRange: [0, 30],
    outputRange: [1, 0],
  });

  const __GetSlider = () => {
    getData('user').then(u => {
      axios.post(apiURL + 'slider', {
        posisi: 'Opening',
        tipe: '',
      }).then(res => {
        console.log(res.data);
        setData(res.data)
      })
    })
  }



  useEffect(() => {
    getData('user').then(res => {
      setUser(res);
      console.log(res)
    })
    __GetSlider();
    __GetMedsos();

  }, []);

  const _renderItem = ({ item, index }) => {
    return (

      <View style={{
        width: '100%',
        height: windowHeight / 2,
        // borderWidth: 1,
        overflow: 'hidden',
        // borderRadius: 10,
      }}>
        <Image style={{
          width: windowWidth,
          height: windowHeight / 2,
          // borderRadius: 10,
        }} source={{
          uri: webURL + item.gambar
        }} />
      </View>

    );
  }


  const handleMove = Animated.event(
    [
      null,
      { dx: arrowPosition },
    ],
    { useNativeDriver: false }
  );

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (e, gestureState) => {
      // Mengatur posisi panah agar tidak melampaui batas
      const offsetX = gestureState.dx < 0 ? 0 : (gestureState.dx > maxSlide ? maxSlide : gestureState.dx);
      arrowPosition.setValue(offsetX);
    },
    onPanResponderRelease: (e, gestureState) => {
      if (gestureState.dx >= maxSlide) {
        // Jika panah sudah sampai batas, pindahkan ke halaman berikutnya
        navigation.navigate('TargetBerat');
      } else {
        // Kembalikan posisi panah ke awal
        Animated.spring(arrowPosition, {
          toValue: 0,
          useNativeDriver: false,
        }).start();
      }
    },
  });

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <ImageBackground
        source={user.tipe == 'Gain' ? require('../../assets/bgimg.png') : require('../../assets/bgloss.png')}
        style={{ flex: 1, width: '100%', height: '100%' }}
      >
        <ScrollView>
          <View style={{ padding: 0, backgroundColor: colors.white }}>

            <Carousel
              loop
              autoPlayInterval={1000}
              autoplay
              layoutCardOffset={0}
              // ref={(c) => { this._carousel = c; }}
              data={data}
              renderItem={_renderItem}
              sliderWidth={windowWidth}
              itemWidth={windowHeight / 2}
            />

            <View style={{ alignItems: 'center', marginTop: 12, }}>
              <View style={{ width: 310 }}>
                <Text
                  style={{
                    fontFamily: fonts.primary[700],
                    color: user.tipe == 'Gain' ? colors.primary : colors.secondary,
                    fontSize: 25,
                    textAlign: 'center',
                  }}
                >
                  Raih Target Badanmu!
                </Text>

                <Text
                  style={{
                    fontFamily: fonts.primary[400],
                    color: colors.black,
                    fontSize: 15,
                    textAlign: 'center',
                  }}
                >
                  Secara sehat dan efektif, melalui program khusus buat kamu
                </Text>
              </View>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('RingkasanRencana')}>
              <View style={{ alignItems: 'center', marginTop: 10 }}>
                <Animated.View
                  style={{
                    padding: 10,
                    backgroundColor: user.tipe == 'Gain' ? colors.primary : colors.secondary,
                    width: 310,
                    height: 55,
                    borderRadius: 30,
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                  {...panResponder.panHandlers}  // Menambahkan panResponder ke view panah
                >
                  <Animated.Image
                    style={{
                      width: 44,
                      height: 44,
                      marginLeft: arrowPosition,
                    }}
                    source={user.tipe == 'Gain' ? require('../../assets/arror_roundfill.png') : require('../../assets/btnloss.png')}
                  />

                  <Animated.Text
                    style={{
                      fontFamily: fonts.primary[600],
                      fontSize: 25,
                      color: colors.white,
                      marginRight: '38%',
                      opacity: textOpacity,
                    }}
                  >
                    Mulai
                  </Animated.Text>
                </Animated.View>
              </View>

            </TouchableOpacity>

            <View style={{ alignItems: 'center', marginTop: 20 }}>
              <Image
                style={{ width: 73, height: 29 }}
                source={require('../../assets/genory.png')}
              />
            </View>

            <View>
              <Text
                style={{
                  fontFamily: fonts.primary[500],
                  fontSize: 15,
                  textAlign: 'center',
                  color: user.tipe == 'Gain' ? colors.primary : colors.secondary
                }}
              >
                Make The Look You Want With, Genory!
              </Text>
            </View>

            <View style={{ alignItems: 'center', marginTop: 20 }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  width: 159,
                }}
              >
                <TouchableNativeFeedback onPress={() => Linking.openURL(medsos.instagram)}>
                  <Image
                    style={{ width: 24, height: 24 }}
                    source={require('../../assets/instagram.png')}
                  />
                </TouchableNativeFeedback>

                <TouchableNativeFeedback onPress={() => Linking.openURL(medsos.whatsapp)}>
                  <Image
                    style={{ width: 24, height: 24 }}
                    source={require('../../assets/WA.png')}
                  />
                </TouchableNativeFeedback>

                <TouchableNativeFeedback onPress={() => Linking.openURL(medsos.tiktok)}>
                  <Image
                    style={{ width: 24, height: 24 }}
                    source={require('../../assets/tiktok.png')}
                  />
                </TouchableNativeFeedback>
              </View>
            </View>

            <View style={{ alignItems: 'center', marginTop: 25 }}>
              <Text
                style={{
                  fontFamily: fonts.primary[500],
                  color: user.tipe == 'Gain' ? colors.primary : colors.secondary,
                  textAlign: 'center',
                  fontSize: 12,
                }}
              >
                © <Text style={{ fontFamily: fonts.primary[800] }}> 2024</Text>{' '}
                GENORY. All Right Reserved
              </Text>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View >
  );
}
