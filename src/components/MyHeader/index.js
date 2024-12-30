import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal } from 'react-native';
import { MyDimensi, colors, fonts, windowWidth, Color } from '../../utils';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import { getData } from '../../utils/localStorage';
import MyMenu from '../MyMenu';
export default function MyHeader({ onPress, color = colors.white, title, icon = false, iconname = 'search' }) {
  const navigation = useNavigation();

  const [user, setUser] = useState({});
  useEffect(() => {
    getData('user').then(u => setUser(u));
  }, [])

  return (


    <View style={{
      marginTop: 0,
      marginHorizontal: 0,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: user.tipe == 'Gain' ? colors.primary : colors.secondary,
      paddingHorizontal: 10,
      justifyContent: 'center',
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,

    }}>

      <TouchableOpacity onPress={() => navigation.goBack()} style={{
        // backgroundColor: 'red',
        height: 70,
        width: 70,
        justifyContent: 'center',
        alignItems: 'center',
        // padding: 10,
      }}>
        <Icon type='ionicon' name='arrow-back-outline' size={24} color={color} />
      </TouchableOpacity>


      <Text style={{
        ...fonts.headline4,
        flex: 1,
        textAlign: 'center',
        marginLeft: -50,

        color: color
      }}>{title}</Text>

      {icon &&
        <TouchableOpacity onPress={onPress} style={{

        }}>
          <Icon name={iconname} size={20} color={color} />
        </TouchableOpacity>
      }
    </View>

  );
}

const styles = StyleSheet.create({});
