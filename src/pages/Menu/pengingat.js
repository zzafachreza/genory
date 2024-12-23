import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { colors, fonts } from '../../utils';
import { MyHeader } from '../../components';

export default function PengingatProgram({ navigation }) {
  const [switchStates, setSwitchStates] = useState(
    Array(14).fill(false) // Array dengan 14 elemen, default semuanya false
  );

  const toggleSwitch = (index) => {
    const updatedStates = [...switchStates];
    updatedStates[index] = !updatedStates[index]; // Toggle nilai switch berdasarkan index
    setSwitchStates(updatedStates);
  };

  return (
    <View style={styles.container}>
      <MyHeader onPress={() => navigation.goBack()} title="Pengingat" />

      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {Array.from({ length: 14 }).map((_, index) => {
          const day = index + 1;
          const week = day <= 7 ? 'Minggu Pertama' : 'Minggu Kedua';

          return (
            <View key={index} style={styles.row}>
              <View>
                <Text style={styles.timeText}>09.00</Text>
                <Text style={styles.dayText}>Hari ke {day} | {week}</Text>
              </View>

              {/* Custom Switch */}
              <TouchableOpacity
                style={[
                  styles.switchContainer,
                  switchStates[index] ? styles.switchEnabled : styles.switchDisabled,
                ]}
                onPress={() => toggleSwitch(index)}
              >
                <View
                  style={[
                    styles.switchThumb,
                    switchStates[index] ? styles.thumbEnabled : styles.thumbDisabled,
                  ]}
                />
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
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
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  timeText: {
    fontSize: 25,
    fontFamily: fonts.primary[600],
    color: colors.primary,
  },
  dayText: {
    fontFamily: fonts.primary[400],
    fontSize: 13,
    color: colors.primary,
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
