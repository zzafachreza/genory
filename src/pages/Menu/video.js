import { View, Text, ScrollView, TouchableNativeFeedback, Modal, StyleSheet, Image } from 'react-native';
import React, { useState } from 'react';
import { colors, fonts } from '../../utils';
import { MyHeader } from '../../components';
import YouTubeIframe from 'react-native-youtube-iframe';

export default function VideoLatihan({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false); // State untuk kontrol modal

  const nontonVideo = () => {
    // Set modalVisible menjadi true untuk menampilkan modal
    setModalVisible(true);

    // Set timeout untuk menutup modal setelah 1 detik dan navigasi ke ProgramPertama
    setTimeout(() => {
      setModalVisible(false); // Menutup modal
      navigation.navigate("ProgramPertama", { videoWatched: true }); // Navigasi ke ProgramPertama dengan parameter videoWatched
    }, 1000); // Durasi 1 detik (1000 ms)
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <View>
        <MyHeader title="Judul Olahraga" />
      </View>

      <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
        <View style={{ marginTop: 20, width: '100%', justifyContent: 'center', alignItems: 'center', padding: 10 }}>
          {/* YouTube Player */}
          <YouTubeIframe
            height={300}
            width={"100%"}
            videoId="XtFUovn_VBo"
            play={false}
            onChangeState={event => console.log(event)}
            onReady={event => console.log("Video is ready")}
          />
        </View>
      </ScrollView>

      <View style={{ padding: 10, marginBottom: 10 }}>
        <TouchableNativeFeedback onPress={nontonVideo}>
          <View style={{ padding: 10, backgroundColor: colors.primary, borderRadius: 30 }}>
            <Text style={{ fontFamily: fonts.primary[600], fontSize: 15, textAlign: 'center', color: colors.white }}>
              Sudah Menonton Video
            </Text>
          </View>
        </TouchableNativeFeedback>
      </View>

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
