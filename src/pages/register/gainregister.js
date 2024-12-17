import { View, Text, ScrollView, ImageBackground, TouchableWithoutFeedback } from 'react-native'
import React, { useState } from 'react'
import { colors, fonts } from '../../utils'
import { MyInput, MyPicker } from '../../components'
import { showMessage } from 'react-native-flash-message';
import axios from 'axios';

export default function GainRegister({navigation}) {
    const [selectedGender, setSelectedGender] = useState(null); // State untuk menyimpan program yang dipilih
    const [isGenderelected, setIsGenderSelected] = useState(false); // State untuk melacak apakah sudah memilih program
    const handleProgramChange = (value) => {
        setSelectedGender(value); // Update nilai yang dipilih
        setIsGenderSelected(true);
        console.log("Kamu Memilih : ", value)
      };
    const [kirim, setKirim] = useState({
        nama:'',
        jenis_kelamin:selectedGender,
        email:'',
        no_tlp: '',
        password: '',
        tinggi_badan: '',
        berat_badan: '',
    });

    const handleKirim = () => {

        if (kirim.nama.length == '' || kirim.jenis_kelamin == false || kirim.email.length == '' || kirim.no_tlp.length == '' || kirim.password.length == '' || kirim.tinggi_badan. length == '' || kirim.berat_badan.length == '') {
            showMessage({
                type:'danger',
                position:"top",
                backgroundColor:"white",
                color:colors.danger,
                message:"Mohon isi semua field!"
            });
        }  else if (kirim.nama.length == '') {
            showMessage({
                type:'danger',
                position:"top",
                backgroundColor:"white",
                color:colors.danger,
                message:"Nama belum di isi!"
            });
        } else if (kirim.email.length == '') {
            showMessage({
                type:'danger',
                position:"top",
                backgroundColor:"white",
                color:colors.danger,
                message:"Email belum di isi!"
            });
        } else if (kirim.no_tlp.length == '') {
            showMessage({
                type:'danger',
                position:"top",
                backgroundColor:"white",
                color:colors.danger,
                message:"Nomor Telepon belum di isi!"
            });
        } else if (kirim.password.length == '') {
            showMessage({
                type:'danger',
                position:"top",
                backgroundColor:"white",
                color:colors.danger,
                message:"Password belum di isi!"
            });
        } else if (kirim.berat_badan.length == '') {
            showMessage({
                type:'danger',
                position:"top",
                backgroundColor:"white",
                color:colors.danger,
                message:"Berat Badan belum di isi!"
            });
        } else if (kirim.tinggi_badan.length == '') {
            showMessage({
                type:'danger',
                position:"top",
                backgroundColor:"white",
                color:colors.danger,
                message:"Tinggi Badan belum di isi!"
            });
        } else {

        console.log(kirim);

        axios
        .post(kirim, 'API KEY')
        .then(response => {
            if (response.data.status == 404) {
                showMessage({
                    type:'danger',
                    message:response.data.message,
                    position:'top',
                    color:colors.danger,
                    backgroundColor:colors.white,
                })
            } else {
                navigation.replace('GetStartedGain');
                showMessage({
                    type:'success',
                    message:'Pendaftaran Berhasil!',
                    position:'top',
                    color:colors.success,
                    backgroundColor:colors.white,
                })
            }
        })
        .catch(error => {
            console.error(error);
        })}
    }

  return (
    <View style={{
        flex:1
    }}>
    <ImageBackground source={require('../../assets/bgimg.png')} style={{
        width:'100%',
        height:"100%",
        flex:1
    }}>
    <ScrollView>
        <View style={{
            padding:10
        }}>

        <View style={{
            alignItems:'center',
            marginTop:60
        }}>
           <View style={{
            width:268,
           }}>
           <Text style={{
                fontFamily:fonts.primary[600],
                fontSize:18,
                color:colors.primary,
                textAlign:'center',

            }}>
            Silahkan isi data di bawah ini
            untuk mengikuti
            </Text>
           </View>
        </View>


        {/* FORM */}

        <View style={{
            padding:10,
        }}>


            <MyInput value={kirim.nama}
             placeholder="Isi Nama" 
             backgroundColor='#F7F7F7' 
             label="Nama"
            onChangeText={(x) => setKirim({...kirim, 'nama' : x})}
             />

            <MyPicker 
            onChange={handleProgramChange} 
            value={selectedGender} 
            label="Pilih Jenis Kelamin" 
            backgroundColor='#F7F7F7'
            data={[
                { label: 'Laki-laki', value: 'laki-laki' },
                { label: 'Perempuan', value: 'perempuan' },
            ]}
            />

            <MyInput
             placeholder="Isi Email"
              backgroundColor='#F7F7F7' 
              label="Emai"
                value={kirim.email}
                onChangeText={(x) => setKirim({...kirim, 'email' : x})}
              />

            <MyInput 
            placeholder="Isi Nomor Telepon" 
            backgroundColor='#F7F7F7' 
            label="Nomor Telepon"
            value={kirim.no_tlp}
            onChangeText={(x) => setKirim({...kirim, 'no_tlp': x})}
            />

            <MyInput 
            placeholder="Isi Kata Sandi" 
            backgroundColor='#F7F7F7' 
            label="Kata Sandi"
            value={kirim.password}
            onChangeText={(x) => setKirim({...kirim, 'password': x})}
            />

            <MyInput 
            placeholder="Isi Tinggi Badan (cm)" 
            backgroundColor='#F7F7F7' 
            label="Tinggi Badan (cm)"
            value={kirim.tinggi_badan}
            onChangeText={(x) => setKirim({...kirim, 'tinggi_badan': x})}
            />

            <MyInput 
            placeholder="Isi Berat Badan (kg)" 
            backgroundColor='#F7F7F7' 
            label="Berat Badan (kg)"
            value={kirim.berat_badan}
            onChangeText={(x) => setKirim({...kirim, 'berat_badan' : x})}
            />

            <View style={{
                marginTop:20
            }}>
                <TouchableWithoutFeedback>
                    <View style={{
                        padding:10,
                        backgroundColor:colors.primary,
                        alignItems:'center',
                        borderRadius:30,
                    }}>
                        <Text style={{
                            fontFamily:fonts.primary[600],
                            textAlign:'center',
                            color:colors.white
                        }}>
                                Lanjutkan Program
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>

        </View>

        </View>

    </ScrollView>
    </ImageBackground>
  
     
    </View>
  )
}