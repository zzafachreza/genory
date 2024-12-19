import { View, Text, TouchableNativeFeedback, Image, Linking } from 'react-native';
import React from 'react';
import { colors, fonts } from '../../utils';
import { MyHeader } from '../../components';

export default function Konsultasi() {

  const handleWhatsApp = () => {
    const phoneNumber = '+6282117395178'; // Ganti dengan nomor WhatsApp yang sesuai
    const message = `Halo!

Saya mau konsultasi
bersama Genory!`; // Pesan otomatis
    const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    
    Linking.openURL(url).catch((err) => console.error('An error occurred', err));
  };

  return (
    <View style={{
        flex: 1,
        backgroundColor: colors.white
    }}>

        <View>
            <MyHeader title="Konsultasi"/>
        </View>

        <View style={{
            padding: 10,
            marginTop: 20
        }}>

            <TouchableNativeFeedback onPress={handleWhatsApp}>
                <View style={{
                    alignItems: 'center'
                }}>
                    <Image style={{
                        width: 253,
                        height: 255,
                    }} source={require('../../assets/WA.png')}/>
                </View>
            </TouchableNativeFeedback>

        </View>

        <View style={{
            marginTop:20
        }}>
            <Text style={{
                fontFamily:fonts.primary[600],
                color:colors.primary,
                fontSize:18,
                textAlign:"center"
            }}>Konsultasi bersama Genory!</Text>
        </View>

        <View style={{
            marginTop:'35%'
        }}>
            <Text style={{
                fontFamily:fonts.primary[700],
                fontSize:20,
                color:colors.primary,
                textAlign:'center'
            }}>Ikuti Kami : </Text>


            <View style={{
                flexDirection:"row",
                justifyContent:'center',
                alignItems:'center',
                marginTop:20
            }}>

            <Image style={{
                width:24,
                height:24
            }} source={require('../../assets/instagram.png')}/>
            <Text style={{fontFamily:fonts.primary[600], fontSize:12, marginLeft:5,}}>@genory.official</Text>
            </View>


            
            <View style={{
                flexDirection:"row",
                justifyContent:'center',
                alignItems:'center',
                marginTop:10
            }}>

            <Image style={{
                width:24,
                height:24
            }} source={require('../../assets/tiktok.png')}/>
            <Text style={{fontFamily:fonts.primary[600], fontSize:12, marginLeft:5,}}>@genory.official</Text>
            </View>
        </View>
    </View>
  );
}
