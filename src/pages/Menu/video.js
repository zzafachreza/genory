import { View, Text, ScrollView, TouchableNativeFeedback, Modal, StyleSheet, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors, fonts } from '../../utils';
import { MyHeader } from '../../components';
import YouTubeIframe from 'react-native-youtube-iframe';
import { apiURL, getData, storeData } from '../../utils/localStorage';
import axios from 'axios';
import { useToast } from 'react-native-toast-notifications';
import moment from 'moment';

export default function VideoLatihan({ navigation, route }) {
  const item = route.params;
  const [user, setUser] = useState({});
  const [modalVisible, setModalVisible] = useState(false); // State untuk kontrol modal
  useEffect(() => {
    getData('user').then(u => setUser(u));
  }, [])
  const toast = useToast();

  const nontonVideo = () => {
    //CEK TANGGAL MULAI

    getData('mulai').then(res => {
      console.log(res)
      if (!res) {
        storeData('mulai', moment().format('YYYY-MM-DD'))
      }

      axios.post(apiURL + 'add_nonton', {
        fid_pengguna: user.id_pengguna,
        fid_video: item.id_video
      }).then(res => {
        console.log(res.data);
        if (res.data.status == 200) {
          toast.show(res.data.message, {
            type: 'success'
          });
          navigation.goBack();
        }
      })
    })
    // Set modalVisible menjadi true untuk menampilkan modal

    // setModalVisible(true);

    // // Set timeout untuk menutup modal setelah 1 detik dan navigasi ke ProgramPertama
    // setTimeout(() => {
    //   setModalVisible(false); // Menutup modal
    //   navigation.navigate("ProgramPertama", { videoWatched: true }); // Navigasi ke ProgramPertama dengan parameter videoWatched
    // }, 1000); // Durasi 1 detik (1000 ms)
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <View>
        <MyHeader title={`Hari ke ${item.hari} &  Video ke ${item.index}`} />
      </View>

      <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
        <Text style={{
          marginTop: 20,
          ...fonts.headline4
        }}>{item.judul}</Text>
        <View style={{ marginTop: 10, width: '100%', justifyContent: 'center', alignItems: 'center', padding: 10 }}>
          {/* YouTube Player */}
          <YouTubeIframe
            height={300}
            width={"100%"}
            videoId={item.youtube}
            play={false}
            onChangeState={event => console.log(event)}
            onReady={event => console.log("Video is ready")}
          />
        </View>
      </ScrollView>

      {item.cek == 0 &&

        <View style={{ padding: 10, marginBottom: 10 }}>
          <TouchableNativeFeedback onPress={nontonVideo}>
            <View style={{ padding: 10, backgroundColor: user.tipe == 'Gain' ? colors.primary : colors.secondary, borderRadius: 30 }}>
              <Text style={{ fontFamily: fonts.primary[600], fontSize: 15, textAlign: 'center', color: colors.white }}>
                Sudah Menonton Video
              </Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      }

      {item.cek > 0 &&

        <View style={{ padding: 10, marginBottom: 10 }}>
          <TouchableNativeFeedback>
            <View style={{ padding: 10, backgroundColor: colors.success, borderRadius: 30 }}>
              <Text style={{ fontFamily: fonts.primary[600], fontSize: 15, textAlign: 'center', color: colors.white }}>
                Sudah ditonton
              </Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      }

      {/* Modal untuk menampilkan pesan */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Logo checklist */}
            <Image
              source={require('../../assets/ceklist.png')} // Ganti dengan path ke gambar checklist Anda
              style={styles.checklistIcon}
            />
            <Text style={styles.modalText}>Kamu sudah menonton video ini</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Background semi-transparan
  },
  modalContent: {
    width: 327,
    padding: 20,
    backgroundColor: colors.white,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 320,
  },
  checklistIcon: {
    width: 131,
    height: 131,
    marginBottom: 10,
  },
  modalText: {
    fontFamily: fonts.primary[600],
    fontSize: 15,
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 20,
  },
});
