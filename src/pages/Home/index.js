import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableNativeFeedback,
  ScrollView,
  Pressable,
} from 'react-native';
import { colors, fonts, windowWidth, Color } from '../../utils';
import { apiURL, getData, storeData, webURL } from '../../utils/localStorage';
import axios from 'axios';
import Carousel from 'react-native-snap-carousel';
import { useIsFocused } from '@react-navigation/native';
import YouTubeIframe from 'react-native-youtube-iframe';
import FastImage from 'react-native-fast-image'

export default function Home({ navigation }) {
  const [user, setUser] = useState(null);
  const [slider, setSlider] = useState([]);
  const youtube = useRef(''); // Simpan sebagai useRef untuk menghindari re-render berulang
  const isFocus = useIsFocused();

  const __getUser = useCallback(async () => {
    try {
      const u = await getData('user');
      if (!u) return;

      const res = await axios.post(`${apiURL}get_profile`, { id: u.id_pengguna });
      setUser(res.data);
      storeData('user', res.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }, []);

  const __GetSlider = useCallback(async () => {
    try {
      const u = await getData('user');
      if (!u) return;

      const res = await axios.post(`${apiURL}slider`, { posisi: 'Home', tipe: u.tipe });
      setSlider(res.data);
    } catch (error) {
      console.error("Error fetching slider:", error);
    }
  }, []);

  const _getYoutube = useCallback(async () => {
    try {
      const u = await getData('user');
      if (!u) return;

      const res = await axios.post(`${apiURL}yt_link`, { tipe: u.tipe });
      youtube.current = res.data.youtube;
    } catch (error) {
      console.error("Error fetching YouTube link:", error);
    }
  }, []);

  useEffect(() => {
    if (isFocus) {
      __getUser();
      __GetSlider();
      _getYoutube();
    }
  }, [isFocus, __getUser, __GetSlider, _getYoutube]);

  if (!user) return <View style={styles.loadingContainer}><Text>Loading...</Text></View>;

  const _renderItem = ({ item }) => (
    <View style={styles.sliderContainer}>
      <FastImage style={styles.sliderImage} source={{ uri: webURL + item.gambar }} />
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        removeClippedSubviews={true} // Hapus elemen yang tidak terlihat dari memori
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.header, { backgroundColor: user.tipe === 'Gain' ? colors.primary + '80' : colors.secondary + '80' }]}>
          <View style={styles.headerContent}>
            <View>
              <Text style={[styles.greeting, { color: user.tipe === 'Gain' ? colors.primary : colors.secondary }]}>
                Selamat Datang
              </Text>
              <Text style={[styles.username, { color: user.tipe === 'Gain' ? colors.primary : colors.secondary }]}>
                {user.nama}
              </Text>
            </View>
            <FastImage style={styles.logo} source={require('../../assets/genory.png')} />
          </View>

          <View style={styles.carouselContainer}>
            <Text style={[styles.programText, { color: user.tipe === 'Gain' ? colors.primary : colors.secondary }]}>
              Program Weight {user.tipe == 'Gain' ? 'Gain' : 'Loss'} with Genory
            </Text>
            <Carousel
              loop
              autoplay
              autoplayInterval={3000}
              data={slider}
              renderItem={_renderItem}
              sliderWidth={300}
              itemWidth={300}
            />
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.description}>
            Siap menaikkan berat badan dengan cara yang sehat dan efektif? Dengan program Weight {user.tipe == 'Gain' ? 'Gain' : 'Loss'} dari Genory, kamu akan dipandu untuk mencapai berat badan ideal melalui langkah-langkah praktis dan bimbingan yang mudah diikuti.
          </Text>

          <Text style={[styles.targetText, { color: user.tipe === 'Gain' ? colors.primary : colors.secondary }]}>
            Capai targetmu lebih cepat dan sehat!
          </Text>

          <View style={styles.buttonContainer}>
            <Pressable onPress={() => navigation.navigate('Calculator', { user, judul: 'Hitung Kalori Harianmu' })}>
              <View style={[styles.button, { backgroundColor: user.tipe === 'Gain' ? colors.primary : colors.secondary }]}>
                <Text style={styles.buttonText}>Hitung Kalori Harianmu</Text>
              </View>
            </Pressable>

            {/* <YouTubeIframe height={200} width={"100%"} videoId={youtube.current} play={false} /> */}

            <Pressable onPress={() => navigation.navigate('LihatYoutube', {
              youtube: youtube.current
            })}>
              <View style={{
                position: 'relative'
              }}>

                <FastImage style={{
                  width: 300,
                  height: 190,
                  borderRadius: 10,
                  marginBottom: 10,
                }} source={{
                  uri: `https://i.ytimg.com/vi/${youtube.current}/hq720.jpg`
                }} />
                <View style={{
                  // backgroundColor: user.tipe === 'Gain' ? colors.primary : colors.secondary,
                  // opacity: 0.9,
                  position: 'absolute',
                  width: 300,
                  height: 190,
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <FastImage resizeMode={FastImage.resizeMode.contain} style={{
                    width: 100,
                    height: 60,

                  }} source={require('../../assets/play.png')} />
                </View>
              </View>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('ProgramPertama', { week: 1 })}>
              <View style={[styles.outlineButton, , { borderColor: user.tipe === 'Gain' ? colors.primary : colors.secondary }]}>
                <Text style={[styles.outlineButtonText, { color: user.tipe === 'Gain' ? colors.primary : colors.secondary }]}>Program Pertama</Text>
              </View>
            </Pressable>

            <Pressable onPress={() => navigation.navigate('ProgramPertama', { week: 2 })}>
              <View style={[styles.outlineButton, , { borderColor: user.tipe === 'Gain' ? colors.primary : colors.secondary }]}>
                <Text style={[styles.outlineButtonText, { color: user.tipe === 'Gain' ? colors.primary : colors.secondary }]}>Program Selanjutnya</Text>
              </View>
            </Pressable>

            <Pressable onPress={() => navigation.navigate('MealPlan')}>
              <View style={[styles.outlineButton, , { borderColor: user.tipe === 'Gain' ? colors.primary : colors.secondary }]}>
                <Text style={[styles.outlineButtonText, { color: user.tipe === 'Gain' ? colors.primary : colors.secondary }]}>Meal Plan</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { padding: 20, height: 270, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  headerContent: { flexDirection: "row", justifyContent: "space-between", alignItems: 'center' },
  greeting: { ...fonts.body3 },
  username: { ...fonts.headline4 },
  logo: { width: 73, height: 29 },
  carouselContainer: { marginTop: 10, justifyContent: 'center', alignItems: 'center' },
  programText: { ...fonts.headline4, textAlign: 'center', marginBottom: 10 },
  sliderContainer: { width: 300, height: 180, overflow: 'hidden', borderRadius: 10 },
  sliderImage: { width: 300, height: 180 },
  content: { padding: 10, marginTop: 40 },
  description: { fontFamily: fonts.primary[400], fontSize: 12, textAlign: 'center', maxWidth: '100%', paddingHorizontal: 10, },
  targetText: { fontFamily: fonts.primary[500], fontSize: 13, textAlign: "center", marginBottom: 20 },
  buttonContainer: { paddingHorizontal: 20 },
  button: { padding: 10, borderRadius: 30, marginBottom: 20 },
  buttonText: { fontFamily: fonts.primary[600], fontSize: 15, textAlign: 'center', color: colors.white },
  outlineButton: { padding: 10, borderRadius: 30, borderWidth: 2, marginTop: 10 },
  outlineButtonText: { fontFamily: fonts.primary[600], fontSize: 15, textAlign: 'center' },
});
