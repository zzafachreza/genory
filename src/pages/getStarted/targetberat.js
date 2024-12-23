import { View, Text, ImageBackground, ScrollView, TouchableNativeFeedback } from 'react-native';
import React from 'react';
import { colors, fonts } from '../../utils';
import { Image } from 'react-native';
import { MyInput } from '../../components';

export default function TargetBerat({ navigation, }) {
    
    return (
        <View style={{
            flex:1,
            backgroundColor:colors.white
        }}>

        <ImageBackground source={require('../../assets/bgimg.png')} style={{
            flex:1,
            width:'100%',
            height:'100%'
        }}>

        <ScrollView>
        <View style={{
            padding:20
        }}>

        <Text style={{
            fontFamily:fonts.primary[600],
            fontSize:20,
            color:colors.primary,
            marginTop:20

        }}>Berapa Target Berat{'\n'}
        Badanmu</Text>

        <View style={{
        
        }}>

        <Text style={{
            fontFamily:fonts.primary[400],
            fontSize:15,
        }}>
        Info ini kami perlukan untuk membuat program intermittent fasting yang paling cocok
        </Text>
        </View>

        {/* IMT */}
        <View style={{
            padding:10,
        }}>

        {/* HASIL PERHITUNGAN IMT */}

        <View style={{
            alignItems:'center'
        }}>
            <Text style={{
                fontFamily:fonts.primary[600],
                fontSize:30,
                color:colors.primary,
                textAlign:"center"
            }}>IMT = </Text>
        </View>

        <View style={{
            flexDirection:"row",
            justifyContent:'center',
            alignItems:'center',
            
        }}>

            <View style={{
                width:100,
                margin:10,
               
            }}>
           <View style={{
            marginTop:-20
           }}>
           <MyInput keyboardType='numeric' placeholder="" />
           </View>

            </View>

            <View style={{
                width:100,
                marginRight:20,
             
            }}>
          <View style={{
            marginTop:-20,
            
          }}>
          <MyInput keyboardType='numeric' placeholder="" />
          </View>

            </View>

            <View style={{
                marginTop:20
            }}>
                <Text style={{
                    fontFamily:fonts.primary[600],
                    fontSize:20,

                }}>kg</Text>
            </View>

        </View>

        </View>

        </View>
        </ScrollView>

        <View style={{
            padding:10,
           marginBottom:20
        }}>
        <TouchableNativeFeedback>
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
    );
}
