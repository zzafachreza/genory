import { View, Text, ImageBackground, Image, TouchableNativeFeedback, ScrollView } from 'react-native'
import React from 'react'
import { colors, fonts } from '../../utils'


export default function RingkasanRencana({navigation}) {
  return (
    <View style={{
        flex:1,
        backgroundColor:colors.white
    }}>



    <ImageBackground source={require('../../assets/bgimg.png')} style={{
        flex:1,
        width:'100%',
        height:'100%',
      }}>
  

      <View style={{
        padding:20,
        alignItems:"center"
      }}>

     <View style={{
        alignSelf:'flex-start'
     }}>
     <Text style={{
        fontFamily:fonts.primary[600],
        fontSize:20,
        color:colors.primary,
        marginTop:20,
        textAlign:'left'
      }}>Ringkasan Rencana</Text>
     </View>


    <View style={{
        width:334,
        height:154,
        marginTop:10,
        alignItems:"center"
      }}>

      <ImageBackground source={require('../../assets/motif_1.png')} style={{
        width:'100%',
        height:"100%",
      }}>

      <View style={{
        flexDirection:"row",
        justifyContent:'flex-start',
        alignItems:'center',
      }}>

    {/* IMG GENDER MAN / WOMAN */}

    <View style={{
        padding:10
    }}>
        <Image style={{
            width:53,
            height:138,
        }} source={require('../../assets/img_gender.png')}/>
    </View>


        {/* HASIL DARI HALAMAN SEBELUMNYA */}
    <View>

    {/* JENEIS KELAMIN */}
    <Text style={{fontFamily:fonts.primary[700], fontSize:17, color:colors.primary}}>• Perempuan</Text>

    {/* USIA */}
    <Text style={{fontFamily:fonts.primary[700], fontSize:17, color:colors.primary}}>• 26 Tahun</Text>

    {/* IMT */}
    <Text style={{fontFamily:fonts.primary[700], fontSize:17, color:colors.primary}}>• IMT = 19.03</Text>

    {/* TARGET */}
    <Text style={{fontFamily:fonts.primary[700], fontSize:17, color:colors.primary}}>• Target = 50 Kg</Text>

    </View>
      </View>

    <View style={{
        marginTop:10,
        alignItems:"center"

    }}>
        <Text style={{
            fontFamily:fonts.primary[400],
            color:colors.black,
            textAlign:'center',
            fontSize:15,
            alignItems:"center"
        }}>
        Kami sangat berharap, kamu bisa
        mengikuti program dari kami untuk pencapaian target kamu
        </Text>
    </View>


    {/* PROGRAM */}

    <View>
        <Text style={{
            textAlign:"center",
            fontFamily:fonts.primary[600],
            fontSize:20,
            color:colors.primary
        }}>Program dari Kami</Text>

        <View style={{
            flexDirection:'row',
            justifyContent:'center',
            flexWrap:"wrap",
            marginTop:10

        }}>

        <TouchableNativeFeedback>
            <View>
                <Image style={{width:162, height:118}} source={require('../../assets/video_program.png')}/>
            </View>
        </TouchableNativeFeedback>

        <TouchableNativeFeedback>
            <View>
                <Image style={{width:162, height:118}} source={require('../../assets/meal_program.png')}/>
            </View>
        </TouchableNativeFeedback>

        <TouchableNativeFeedback>
            <View style={{marginTop:20}}>
                <Image style={{width:162, height:118}} source={require('../../assets/monitoring_program.png')}/>
            </View>
        </TouchableNativeFeedback>

        <TouchableNativeFeedback>
            <View  style={{marginTop:20}}>
                <Image style={{width:162, height:118}} source={require('../../assets/konsultasi_program.png')}/>
            </View>
        </TouchableNativeFeedback>


        </View>


    </View>
    <View style={{
            padding:10,
           marginTop:80
        }}>
        <TouchableNativeFeedback onPress={() => navigation.navigate("MainApp")}>
            <View style={{
                backgroundColor:colors.primary,
                padding:10,
                borderRadius:30
            }}>
            <Text style={{
                fontFamily:fonts.primary[600],
                color:colors.white,
                fontSize:15,
                textAlign:'center'
            }}>Selanjutnya</Text>

            </View>
        </TouchableNativeFeedback>
        </View>
      </ImageBackground>

      </View>
      
      <View>
        
      </View>
      </View>
      </ImageBackground>
  
    </View>
  )
}