import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal, FlatList, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { Color, colors } from '../../utils/colors';  // Pastikan Anda mengimpor Color dan colors dengan benar
import { fonts } from '../../utils/fonts';

export default function MySecondPicker({
  label,
  iconname,
  onChange,
  value,
  backgroundColor,
  data = [],
}) {
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility

  const handleSelect = (value) => {
    onChange(value); // Panggil onChange untuk memberi nilai ke parent
    setIsModalVisible(false); // Tutup modal setelah memilih
  };

  return (
    <>
      <Text
        style={{
          fontFamily:fonts.primary[600],
          color: colors.black,
          marginBottom: 8,
          fontSize:15,
          marginLeft:5,
          marginTop:10
        }}>
        {label}
      </Text>

      {/* Container untuk modal */}
      <View
        style={{
          backgroundColor: backgroundColor,
          borderWidth: 1,
          borderRadius: 10,
          borderColor: colors.primary,
          
        }}>
        {/* Icon kiri */}
        <View
          style={{
            position: 'absolute',
            left: 12,
            top: 13,
          }}>
          <Icon type="ionicon" name={iconname} color={Color.blueGray[300]} size={24} />
        </View>

        {/* Tampilkan nilai yang dipilih atau label */}
        <TouchableOpacity
          style={{
            width: '90%',
            height: 50,
            left: 30,
            justifyContent: 'center',
          }}
          onPress={() => setIsModalVisible(true)} // Buka modal saat diklik
        >
          <Text
            style={{
              fontSize: 15,
              fontFamily:fonts.primary[600],
              color: colors.black,
            }}>
            {value ? value : label}
          </Text>
        </TouchableOpacity>

        {/* Icon kanan untuk dropdown */}
        <View
          style={{
            position: 'absolute',
            right: 12,
            top: 13,
            backgroundColor: Color.white[900],
          }}>
          <Icon type="ionicon" name="caret-down-outline" color={colors.primary} size={24} />
        </View>
      </View>

      {/* Modal untuk memilih opsi */}
      <Modal
        visible={isModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)} // Menutup modal
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContainer}>
            <FlatList
              data={data}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
           
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => handleSelect(item.value)} // Set value yang dipilih
                >
                  <Text style={styles.optionText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContainer: {
    backgroundColor: colors.white,
    borderRadius: 16,
    width: 300,
    maxHeight: 150,
    elevation: 5,
    borderWidth:1,
    borderColor:colors.primary
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  optionText: {
    fontSize: 15,
    color: 'black',
    fontFamily: fonts.primary[500],
  },
});
