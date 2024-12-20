import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, fonts } from '../../utils';
import { MyHeader } from '../../components';

export default function PengingatProgram({ navigation }) {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled(!isEnabled);

  return (
    <View style={styles.container}>
      <MyHeader onPress={() => navigation.goBack()} title="Pengingat" />

      <View style={styles.row}>
       <View>
       <Text style={styles.timeText}>09.00</Text>
       <Text style={{
        fontFamily:fonts.primary[400],
        fontSize:13,
        color:colors.primary
       }}>Hari ke 1 | Minggu Petama</Text>
       </View>

        {/* Custom Switch */}
        <TouchableOpacity
          style={[
            styles.switchContainer,
            isEnabled ? styles.switchEnabled : styles.switchDisabled,
          ]}
          onPress={toggleSwitch}
        >
          <View
            style={[
              styles.switchThumb,
              isEnabled ? styles.thumbEnabled : styles.thumbDisabled,
            ]}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  row: {
    padding: 15,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 25,
    fontFamily:fonts.primary[600],
    color:colors.primary
  },
  switchContainer: {
    width: 50, // Panjang switch
    height: 25, // Tinggi switch
    borderRadius: 25, // Membuat ujung melingkar
    justifyContent: 'center',
    padding: 3, // Memberi ruang untuk thumb
  },
  switchEnabled: {
    backgroundColor: '#808040', // Warna hijau seperti di gambar
  },
  switchDisabled: {
    backgroundColor: '#f5f5f5', // Warna default
  },
  switchThumb: {
    width: 20, // Diameter thumb
    height: 20, // Diameter thumb
    borderRadius: 10, // Membuat thumb bulat
  },
  thumbEnabled: {
    backgroundColor: colors.white, // Warna thumb saat aktif
    alignSelf: 'flex-end', // Posisi di kanan
  },
  thumbDisabled: {
    backgroundColor: colors.white, // Warna thumb saat nonaktif
    alignSelf: 'flex-start', // Posisi di kiri
  },
});
