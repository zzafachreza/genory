import { View, Text, ScrollView, TouchableNativeFeedback } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Color, colors, fonts } from '../../utils'
import { MyCalendar, MyGap, MyHeader, MyInput } from '../../components'
import { apiURL, getData } from '../../utils/localStorage'
import moment from 'moment'
import { showMessage } from 'react-native-flash-message'
import { useToast } from 'react-native-toast-notifications'
import axios from 'axios'

export default function UpdateBeratBadan({ navigation, route }) {
  const { currentDay } = route.params
  const [kirim, setKirim] = useState({
    hari: route.params.currentDay,
    tanggal: moment().format('YYYY-MM-DD'),
    berat_badan: '',
    tinggi_badan: ''
  });


  const _GetHari = (mytanggal) => {
    getData('mulai').then(ml => {
      if (!ml) {

        toast.show('Silahkan tonton video terlebih dahulu agar dapat mengisi data ini', {
          type: 'info'
        })

      } else {

        let ARR = [];
        for (let index = 1; index <= 14; index++) {
          ARR.push({
            minggu: index <= 7 ? 'Pertama' : 'Kedua',
            hari: index,
            tanggal: moment(ml).add(index - 1, 'day').format('YYYY-MM-DD'),
          })
        }
        let arr = ARR.filter(i => i.tanggal == mytanggal)[0];

        setKirim({
          ...kirim,
          tanggal: mytanggal,
          hari: arr.hari
        })


      }
    })
  }

  const hitungIMT = (beratBadan, tinggiBadanCm) => {
    // Konversi tinggi badan dari centimeter ke meter
    const tinggiBadanMeter = tinggiBadanCm / 100;

    // Hitung IMT menggunakan rumus
    const imt = beratBadan / (tinggiBadanMeter ** 2);

    // Klasifikasi IMT
    let klasifikasi;
    if (imt < 18.5) {
      klasifikasi = "Kurus";
    } else if (imt >= 18.5 && imt < 25) {
      klasifikasi = "Normal";
    } else if (imt >= 25 && imt < 30) {
      klasifikasi = "Gemuk";
    } else {
      klasifikasi = "Sangat Gemuk";
    }

    // Return hasil IMT dengan klasifikasi
    return {
      imt: imt.toFixed(2),
      klasifikasi: klasifikasi,
    };
  }

  const [user, setUser] = useState({});
  useEffect(() => {
    // _GetHari();
    getData('user').then(u => setUser(u));
  }, []);

  const toast = useToast();
  const sendServer = () => {

    if (kirim.tinggi_badan.length == 0) {
      toast.show('Tinggi Badan harus di isi !', { type: 'warning' })
    } else if (kirim.berat_badan.length == 0) {
      toast.show('Berat Badan harus di isi !', { type: 'warning' })
    } else {
      let imt = hitungIMT(kirim.berat_badan, kirim.tinggi_badan);
      axios.post(apiURL + 'add_imt', {
        ...kirim,
        fid_pengguna: user.id_pengguna,
        imt: imt.imt,
        hasil: imt.klasifikasi
      }).then(res => {
        if (res.data.status == 200) {
          toast.show(res.data.message, { type: 'success' })
          navigation.goBack();
        }
      })
    }
  }


  return (
    <View style={{
      flex: 1,
      backgroundColor: colors.white
    }}>
      <View>
        <MyHeader onPress={() => navigation.goBack()} title="Update Berat Badan" />
      </View>
      <ScrollView>
        <View style={{
          padding: 10
        }}>
          <View>
            <Text style={{
              fontFamily: fonts.primary[700],
              fontSize: 20,
              color: colors.primary,
              textAlign: "center"
            }}>Hari Ke {kirim.hari}</Text>

            {/* Tanggal Dinamis */}
            <Text style={{
              fontFamily: fonts.primary[500],
              fontSize: 15,
              color: Color.blueGray[400],
              textAlign: "center"
            }}>{moment(kirim.tanggal).format('DD MMMM YYYY')}</Text>
          </View>
        </View>


        <View style={{
          padding: 10
        }}>
          <MyCalendar maxDate={moment().add(0, 'day').format('YYYY-MM-DD')} onDateChange={x => {
            setKirim({
              ...kirim,
              tanggal: x
            });

            _GetHari(x);
          }} value={kirim.tanggal} borderColor={user.tipe == 'Gain' ? colors.primary : colors.secondary} label="Tanggal" />
          <MyGap jarak={10} />
          <MyInput value={kirim.tinggi_badan} onChangeText={x => setKirim({
            ...kirim,
            tinggi_badan: x
          })} backgroundColor='#f4f4f4' keyboardType='decimal-pad' borderColor={user.tipe == 'Gain' ? colors.primary : colors.secondary} label="Tinggi Badan (cm)" />
          <MyGap jarak={10} />
          <MyInput onChangeText={x => setKirim({
            ...kirim,
            berat_badan: x
          })} value={kirim.berat_badan} backgroundColor='#f4f4f4' keyboardType='decimal-pad' borderColor={user.tipe == 'Gain' ? colors.primary : colors.secondary} label="Berat Badan (kg)" />
        </View>
      </ScrollView>

      <View style={{
        marginBottom: 10,
        padding: 10
      }}>
        <TouchableNativeFeedback onPress={sendServer}>
          <View style={{
            padding: 10,
            borderRadius: 30,
            backgroundColor: user.tipe == 'Gain' ? colors.primary : colors.secondary,
            alignItems: 'center'
          }}>

            <Text style={{
              fontFamily: fonts.primary[600],
              fontSize: 20,
              color: colors.white
            }}>Simpan</Text>

          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  )
}
