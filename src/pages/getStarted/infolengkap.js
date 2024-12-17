import { View, Text, ScrollView, ImageBackground, TouchableWithoutFeedback } from 'react-native'
import React, { useState } from 'react'
import { colors, fonts } from '../../utils'
import { MyCalendar, MyInput, MyPicker } from '../../components'
import { showMessage } from 'react-native-flash-message';
import axios from 'axios';

export default function InfoLengkapTubuh({navigation}) {
    const [selectedGender, setSelectedGender] = useState(null); // State untuk menyimpan program yang dipilih
    const [isGenderelected, setIsGenderSelected] = useState(false); // State untuk melacak apakah sudah memilih program
    const handleProgramChange = (value) => {
        setSelectedGender(value); // Update nilai yang dipilih
        setIsGenderSelected(true);
        setKirim({...kirim, jenis_kelamin:value})
        console.log("Kamu Memilih : ", value)
      };
    const [kirim, setKirim] = useState({
        tanggal_lahir: new Date(),
        jenis_kelamin:isGenderelected,
        tinggi_badan: '',
        berat_badan: '',
    });

    const handleDateChange = (date) => {
        console.log("Tanggal yang dipilih:", date);
        setKirim({ ...kirim, tanggal_lahir: date });
    };

    const handleKirim = () => {

       // Pastikan tinggi badan dan berat badan dalam bentuk angka
    const tinggi_badan_number = parseFloat(kirim.tinggi_badan);
    const berat_badan_number = parseFloat(kirim.berat_badan);

    const requiredFields = [
        { field: kirim.tanggal_lahir, message: "Mohon isi tanngal lahir!" },
        { field: kirim.jenis_kelamin, message: "Mohon isi jenis kelamin!" },
        { field: kirim.berat_badan, message: "Mohon isi berat badan!" },
        { field: kirim.tinggi_badan, message: "Mohon isi tinggi badan lahir!" },
    ];

   
        for (let i = 0; i < requiredFields.length; i++) {
            if (!requiredFields[i].field || requiredFields[i].field.length === 0) {
                showMessage({
                    type: "default",
                    color: 'white',
                    backgroundColor: colors.danger,
                    message: requiredFields[i].message
                });
                return;
            }
        };
        console.log("berat Bedan", tinggi_badan_number);
        console.log("Tinggi Bedan", berat_badan_number);
        navigation.navigate('TargetBerat', {
            tinggi_badan: tinggi_badan_number, // Kirim sebagai angka
            berat_badan: berat_badan_number, // Kirim sebagai angka
            jenis_kelamin: kirim.jenis_kelamin,
            tanggal_lahir: kirim.tanggal_lahir,
        });
        

        // const formattedDate = new Date(kirim.tanggal_lahir).toISOString().split('T')[0];

        // const dataToSend = {
        //     ...kirim,
        //     formattedDate,
    
        // };

        // console.log("Data yang dikirim:", dataToSend);
        
        // axios.post(dataToSend, 'API KEY')
        // .then(response => {
        //     setLoading(false)
        //     console.log('Respons dari server:', response);
        //     if (response.data.status === 200) {
        //         Alert.alert(MYAPP, "Data berhasil dimasukkan!");
                
        //         navigation.replace("TargetBerat",   {
        //             jenis_kelamin: kirim.jenis_kelamin || "",
        //             umur: kirim.tanggal_lahir || "",
        //             tinggi_badan: kirim.tinggi_badan || "",
        //             berat_badan: kirim.berat_badan || ""
        //         });
        //     } else {
        //         showMessage({
        //             type: 'default',
        //             color: 'white',
        //             backgroundColor: colors.danger,
        //             message: 'Gagal memasukkan data, coba lagi.'
        //         });
        //     }
        // })
        // .catch(error => {
        //     setLoading(false)
        //     console.error('Terjadi kesalahan dari server:', error);
        //     showMessage({
        //         type: "default",
        //         color: "white",
        //         backgroundColor: colors.danger,
        //         message: "Terjadi kesalahan, coba lagi nanti."
        //     });
        // });
    };

   

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
            marginTop:60,
            padding:10,

        }}>
           <View style={{

           }}>
           <Text style={{
                fontFamily:fonts.primary[600],
                fontSize:20,
                color:colors.primary,
                textAlign:'left',

            }}>
    Info Lengkap Seputar{'\n'}
    Tubuhmu
            </Text>

            <Text style={{
                fontFamily:fonts.primary[400],
                fontSize:15,
                color:colors.black
            }}>
            Info ini kami perlukan untuk membuat program intermittent fasting yang paling cocok
            </Text>
           </View>
        </View>


        {/* FORM */}

        <View style={{
            padding:10,
            marginTop:-10
        }}>


            <MyCalendar value={kirim.tanggal_lahir || new Date()} 
            label="Tanggal Lahir"
            onDateChange={handleDateChange}
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
                <TouchableWithoutFeedback onPress={handleKirim}>
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