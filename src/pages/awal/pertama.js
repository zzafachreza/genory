import { View, Text, PermissionsAndroid, ImageBackground, Image, TouchableNativeFeedback, ScrollView, Linking, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { fonts, colors } from '../../utils'
import PushNotification from "react-native-push-notification";
import moment from 'moment';
import axios from 'axios';
import { apiURL } from '../../utils/localStorage';

export default function PertamaNextSlide({ navigation }) {


    const [medsos, setMedsos] = useState({
        instagram: '',
        tiktok: '',
        whatsapp: '',
    });
    const __GetMedsos = () => {
        axios.post(apiURL + 'medsos').then(res => {
            console.log(res.data);
            setMedsos(res.data)
        })
    }

    useEffect(() => {
        __GetMedsos();
    }, [])

    const nextPage = async () => {

        await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
        navigation.navigate('KeduaNextSlide')
        // let JADWAL = new Date(Date.now() + 4 * 1000);
        // PushNotification.localNotificationSchedule({
        //     channelId: "genory",
        //     title: 'HARI PERTAMA',
        //     soundName: 'suara',
        //     //... You can use all the options from localNotifications
        //     message: "My Notification Message", // (required)
        //     date: JADWAL, // in 60 secs
        //     allowWhileIdle: true, // (optional) set notification to work while on doze, default: false

        // });
        // console.log('jadwal', JADWAL);
        // console.log('momoent', moment().toISOString())

    }


    return (
        <View style={{
            flex: 1,
            backgroundColor: colors.white
        }}>
            <ImageBackground source={require('../../assets/bgimg.png')} style={{
                flex: 1,
                width: '100%',
                height: '100%'

            }}>
                <ScrollView>
                    <View style={{
                        flex: 1,
                        padding: 10,
                    }}>


                        <View style={{
                            marginTop: 70
                        }}>
                            <Text style={{
                                fontFamily: fonts.primary[600],
                                textAlign: "center",
                                fontSize: 25,
                                color: colors.primary
                            }}>Make The Look You{'\n'}
                                Want With</Text>
                        </View>

                        <View style={{
                            alignItems: "center"
                        }}>
                            <Image style={{
                                width: 123,
                                height: 49
                            }} source={require('../../assets/genory.png')} />
                        </View>

                        <View style={{
                            alignItems: 'center',
                            marginTop: 0,
                        }}>
                            <Image style={{
                                width: 332,
                                height: 301,

                            }} source={require('../../assets/cewe_1.png')} />
                        </View>

                        <View style={{
                            alignItems: 'center',
                            marginTop: 12,
                        }}>
                            <View style={{
                                width: 310,
                            }}>
                                <Text style={{
                                    fontFamily: fonts.primary[500],
                                    color: colors.primary,
                                    fontSize: 14,
                                    textAlign: 'center'
                                }}>
                                    Wujudkan Body Goalmu dengan Genory!
                                    Pilih Programmu Sekarang!
                                </Text>
                            </View>
                        </View>

                        <View style={{
                            alignItems: 'center',
                            marginTop: 10
                        }}>
                            <TouchableNativeFeedback onPress={nextPage}>
                                <View style={{
                                    padding: 10,
                                    backgroundColor: colors.primary,
                                    width: 174,
                                    borderRadius: 30,
                                    alignItems: 'center'

                                }}>
                                    <Text style={{
                                        fontFamily: fonts.primary[500],
                                        fontSize: 15,
                                        color: colors.white,
                                        textAlign: "center",
                                        top: 1.5
                                    }}>Pilih Program</Text>

                                </View>
                            </TouchableNativeFeedback>
                        </View>




                        {/* end */}
                        <View>
                            <View style={{
                                alignItems: 'center',
                                marginTop: 20
                            }}>
                                <Image style={{
                                    width: 73,
                                    height: 29,
                                }} source={require('../../assets/genory.png')} />
                            </View>

                            <View style={{}}>
                                <Text style={{
                                    fontFamily: fonts.primary[500],
                                    fontSize: 15,
                                    textAlign: "center",
                                    color: colors.primary,
                                }}>Make The Look You Want With, Genory!</Text>
                            </View>

                            <View style={{
                                alignItems: 'center',
                                marginTop: 20,
                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around',
                                    alignItems: "center",
                                    width: 159
                                }}>

                                    <TouchableOpacity onPress={() => Linking.openURL(medsos.instagram)}>
                                        <Image
                                            style={{ width: 24, height: 24 }}
                                            source={require('../../assets/instagram.png')}
                                        />
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => Linking.openURL(medsos.whatsapp)}>
                                        <Image
                                            style={{ width: 24, height: 24 }}
                                            source={require('../../assets/WA.png')}
                                        />
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => Linking.openURL(medsos.tiktok)}>
                                        <Image
                                            style={{ width: 24, height: 24 }}
                                            source={require('../../assets/tiktok.png')}
                                        />
                                    </TouchableOpacity>

                                </View>
                            </View>


                            <View style={{
                                alignItems: 'center',
                                marginTop: 25,
                            }}>
                                <Text style={{ fontFamily: fonts.primary[500], color: colors.primary, textAlign: 'center', fontSize: 12 }}>© <Text style={{ fontFamily: fonts.primary[800] }}> 2024</Text> GENORY. All Right Reserved</Text>
                            </View>

                        </View>

                    </View>

                </ScrollView>
            </ImageBackground>
        </View>
    )
}