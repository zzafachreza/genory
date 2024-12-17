import { View, Text, ImageBackground, Image, TouchableNativeFeedback, ScrollView } from 'react-native'
import React from 'react'
import { fonts, colors } from '../../utils'

export default function PertamaNextSlide({navigation}) {
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

    <View style={{
        padding:10,
    }}>
    <ScrollView>

    <View style={{
        marginTop:70
    }}>
        <Text style={{
            fontFamily:fonts.primary[600],
            textAlign:"center",
            fontSize:25,
            color:colors.primary
        }}>Make The Look You{'\n'}
            Want With</Text>
    </View>

    <View style={{
        alignItems:"center"
    }}>
        <Image style={{
            width:123,
            height:49
        }} source={require('../../assets/genory.png')}/>
    </View>

    <View style={{
        alignItems:'center',
        marginTop:0,   
    }}>
        <Image style={{
            width:332,
            height:301,

        }} source={require('../../assets/cewe_1.png')}/>
    </View>

    <View style={{
        alignItems:'center',
        marginTop:12,
    }}>
    <View style={{
        width:310,
    }}>
    <Text style={{
            fontFamily:fonts.primary[500],
            color:colors.primary,
            fontSize:14,
            textAlign:'center'
        }}>
        Wujudkan Body Goalmu dengan Genory!
        Pilih Programmu Sekarang!
        </Text>
    </View>
    </View>

    <View style={{
        alignItems:'center',
        marginTop:10
    }}>
        <TouchableNativeFeedback onPress={() => navigation.navigate('KeduaNextSlide')}>
            <View style={{
                padding:10,
                backgroundColor:colors.primary,
                width:174,
                borderRadius:30,
                alignItems:'center'

            }}>
            <Text style={{
                fontFamily:fonts.primary[500],
                fontSize:15,
                color:colors.white,
                textAlign:"center",
                top:1.5
            }}>Pilih Program</Text>

            </View>
        </TouchableNativeFeedback>
    </View>

    </ScrollView>


{/* end */}
    <View>
        <View style={{
            alignItems:'center',
            marginTop:20
        }}>
            <Image style={{
                width:73,
                height:29,
            }} source={require('../../assets/genory.png')}/>
        </View>

        <View style={{}}>
            <Text style={{
                fontFamily:fonts.primary[500],
                fontSize:15,
                textAlign:"center",
                color:colors.primary,   
            }}>Make The Look You Want With, Genory!</Text>
        </View>

        <View style={{
            alignItems:'center',
            marginTop:20,
        }}>
            <View style={{
                flexDirection:'row',
                justifyContent:'space-around',
                alignItems:"center",
                width:159
            }}>
            
            <TouchableNativeFeedback>
                <Image style={{
                    width:24,
                    height:24
                }} source={require('../../assets/instagram.png')}/>
            </TouchableNativeFeedback>


            <TouchableNativeFeedback>
                <Image style={{
                    width:24,
                    height:24
                }} source={require('../../assets/WA.png')}/>
            </TouchableNativeFeedback>


            <TouchableNativeFeedback>
                <Image style={{
                    width:24,
                    height:24
                }} source={require('../../assets/tiktok.png')}/>
            </TouchableNativeFeedback>

            </View>
        </View>

        
    <View style={{
        alignItems:'center',
        marginTop:25,
    }}>
        <Text style={{fontFamily:fonts.primary[500], color:colors.primary, textAlign:'center', fontSize:12}}>© <Text style={{fontFamily:fonts.primary[800]}}> 2024</Text> GENORY. All Right Reserved</Text>
    </View>

    </View>

    </View>

    </ImageBackground>
    </View>
  )
}