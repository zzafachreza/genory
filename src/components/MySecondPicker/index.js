import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { fonts } from '../../utils';

export default function MySecondPicker({ label, data = [], value, onChange }) {
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility

  const handleSelect = (value) => {
    onChange(value); // Panggil onChange untuk memberi nilai ke parent
    setIsModalVisible(false); // Tutup modal setelah memilih
  };

  return (
    <View style={styles.container}>
      {/* Label yang berfungsi sebagai tombol untuk membuka modal */}
      <TouchableOpacity
        style={styles.labelContainer}
        onPress={() => setIsModalVisible(true)} // Buka modal
      >
        <Text style={styles.labelText}>
          {value ? value : label} {/* Menampilkan nilai yang dipilih */}
        </Text>
        <Icon
          style={styles.iconStyle}
          type="ionicon"
          name="caret-down-outline"
          color="white"
          size={15}
        />
      </TouchableOpacity>

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6D742E',
    padding: 12,
    borderRadius: 16,
    width: 310,
  },
  labelText: {
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
    fontFamily: fonts.primary[500],
  },
  iconStyle: {
    top: 2,
    marginLeft: 5,
  },
  // Backdrop untuk modal
  modalBackdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContainer: {
    backgroundColor: '#A2B01E',
    borderRadius: 16,
    width: 300,
    maxHeight: 150,
    elevation: 5,
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  optionText: {
    fontSize: 15,
    color: 'white',
    fontFamily: fonts.primary[500],
  },
});
