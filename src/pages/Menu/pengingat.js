import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { colors, fonts } from '../../utils';
import { MyHeader } from '../../components';

export default function PengingatProgram({ navigation, route }) {
  const { startDay, endDay, currentWeek } = route.params; 
  console.log('Current Week:', currentWeek);
console.log('Active Days:', activeDays);
  const [switchStates, setSwitchStates] = useState(Array(14).fill(false)); // Array untuk status switch
  const currentStage = currentWeek === 1 ? 1 : 2;
  // Logika untuk menentukan tahapan aktif (misalnya dari data atau waktu)
  // Di sini diasumsikan tahapan diatur secara manual untuk simulasi
  const activeDays = currentStage === 1 ? [1, 2, 3, 4, 5, 6, 7] : [8, 9, 10, 11, 12, 13, 14];

  const toggleSwitch = (index) => {
    const updatedStates = [...switchStates];
    updatedStates[index] = !updatedStates[index]; // Toggle nilai switch berdasarkan index
    setSwitchStates(updatedStates);
  };

  return (
    <View style={styles.container}>
      <MyHeader onPress={() => navigation.goBack()} title="Pengingat" />

      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {/* Tampilkan hanya hari yang sesuai tahapan aktif */}
        {activeDays.map((day) => (
          <View key={day} style={styles.row}>
            <View>
              <Text style={styles.timeText}>09.00</Text>
              <Text style={styles.dayText}>
                Hari ke {day} | {currentStage === 1 ? 'Minggu  Pertama' : 'Minggu Kedua'}
              </Text>
            </View>

            {/* Custom Switch */}
            <TouchableOpacity
              style={[
                styles.switchContainer,
                switchStates[day - 1] ? styles.switchEnabled : styles.switchDisabled,
              ]}
              onPress={() => toggleSwitch(day - 1)}
            >
              <View
                style={[
                  styles.switchThumb,
                  switchStates[day - 1] ? styles.thumbEnabled : styles.thumbDisabled,
                ]}
              />
            </TouchableOpacity>
          </View>
        ))}
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
    width: 50,
    height: 25,
    borderRadius: 25,
    justifyContent: 'center',
    padding: 3,
  },
  switchEnabled: {
    backgroundColor: '#808040',
  },
  switchDisabled: {
    backgroundColor: '#f5f5f5',
  },
  switchThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  thumbEnabled: {
    backgroundColor: colors.white,
    alignSelf: 'flex-end',
  },
  thumbDisabled: {
    backgroundColor: colors.white,
    alignSelf: 'flex-start',
  },
});
