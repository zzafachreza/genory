import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import { getData } from '../../utils/localStorage';
import { colors, fonts } from '../../utils';

export default function MyHeader({ onPress, color = colors.white, title, icon = false, iconname = 'search' }) {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    getData('user').then(u => setUser(u)).catch(err => console.error('Gagal mengambil data user:', err));
  }, []);

  return (
    <View style={[
      styles.headerContainer,
      { backgroundColor: user?.tipe === 'Gain' ? colors.primary : colors.secondary }
    ]}>

      {/* Tombol Kembali */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon type="ionicon" name="arrow-back-outline" size={24} color={color} />
      </TouchableOpacity>

      {/* Judul */}
      <Text style={[styles.title, { color }]}>{title}</Text>

      {/* Ikon tambahan (jika ada) */}
      {icon && (
        <TouchableOpacity onPress={onPress} style={styles.iconButton}>
          <Icon name={iconname} size={20} color={color} />
        </TouchableOpacity>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  backButton: {
    height: 70,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    ...fonts.headline4,
    flex: 1,
    marginLeft: -40,
    textAlign: 'center',
  },
  iconButton: {
    padding: 10,
  },
});
