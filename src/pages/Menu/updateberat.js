import { View, Text, ScrollView, TouchableNativeFeedback } from 'react-native'
import React from 'react'
import { Color, colors, fonts } from '../../utils'
import { MyHeader, MyInput } from '../../components'

export default function UpdateBeratBadan({navigation, route}) {
    const {currentDay} = route.params
  const today = new Date();

  // Membuat array bulan dalam Bahasa Indonesia
  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  // Mendapatkan tanggal dan bulan sekarang
  const date = today.getDate();
  const month = months[today.getMonth()];
  const year = today.getFullYear();

  // Menyusun tanggal dalam format yang diinginkan
  const formattedDate = `${date} ${month} ${year}`;

  return (
    <View style={{
        flex:1,
        backgroundColor:colors.white
    }}>
      <View>
        <MyHeader onPress={() => navigation.goBack()} title="Update Berat Badan"/>
      </View>
      <ScrollView>
        <View style={{
            padding:10
        }}>
          <View>
            <Text style={{
                fontFamily:fonts.primary[700],
                fontSize:20,
                color:colors.primary,
                textAlign:"center"
            }}>Hari Ke {currentDay}</Text>

            {/* Tanggal Dinamis */}
            <Text style={{
                fontFamily:fonts.primary[500],
                fontSize:15,
                color:Color.blueGray[400],
                textAlign:"center"
            }}>{formattedDate}</Text>
          </View>
        </View>


        <View style={{
            padding:10
        }}>
            <MyInput label="Tinggi Badan (cm)"/>

            <MyInput label="Berat Badan (kg)"/>
        </View>
      </ScrollView>

      <View style={{
        marginBottom:10,
        padding:10
      }}>
        <TouchableNativeFeedback>
            <View style={{
                padding:10,
                borderRadius:30,
                backgroundColor:colors.primary,
                alignItems:'center'
            }}>

            <Text style={{
                fontFamily:fonts.primary[600],
                fontSize:20,
                color:colors.white
            }}>Simpan</Text>

            </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  )
}
