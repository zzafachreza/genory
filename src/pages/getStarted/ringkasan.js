import { View, Text, ImageBackground, Image, TouchableNativeFeedback, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, fonts } from '../../utils'
import { apiURL, getData, storeData } from '../../utils/localStorage';
import moment from 'moment';
import axios from 'axios';


export default function RingkasanRencana({ navigation }) {
    const [user, setUser] = useState({});

    useEffect(() => {
        getData('user').then(u => {
            axios.post(apiURL + 'get_profile', {
                id: u.id_pengguna
            }).then(res => {
                console.log(res.data);
                setUser(res.data);
                storeData('user', res.data);
            })
        });
    }, [])
    return (
        <View style={{
            flex: 1,
            backgroundColor: colors.white
        }}>



            <ImageBackground source={user.tipe == 'Gain' ? require('../../assets/bgimg.png') : require('../../assets/bgloss.png')} style={{
                flex: 1,
                width: '100%',
                height: '100%',
            }}>


                <View style={{
                    padding: 20,
                    alignItems: "center"
                }}>

                    <View style={{
                        alignSelf: 'flex-start'
                    }}>
                        <Text style={{
                            fontFamily: fonts.primary[600],
                            fontSize: 20,
                            color: user.tipe == 'Gain' ? colors.primary : colors.secondary,
                            marginTop: 20,
                            textAlign: 'left'
                        }}>Ringkasan Rencana</Text>
                    </View>


                    <View style={{
                        width: 334,
                        height: 154,
                        marginTop: 10,
                        alignItems: "center"
                    }}>

                        <ImageBackground source={user.tipe == 'Gain' ? require('../../assets/motif_1.png') : require('../../assets/motif_2.png')} style={{
                            width: '100%',
                            height: "100%",
                        }}>

                            <View style={{
                                flexDirection: "row",
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                            }}>

                                {/* IMG GENDER MAN / WOMAN */}

                                <View style={{
                                    padding: 10
                                }}>
                                    {user.tipe == 'Gain' && <Image style={{
                                        width: 53,
                                        height: 138,
                                    }} source={user.jenis_kelamin == 'Perempuan' ? require('../../assets/img_gender.png') : require('../../assets/img_male.png')} />}

                                    {user.tipe == 'Loss' && <Image style={{
                                        width: 53,
                                        height: 138,
                                    }} source={user.jenis_kelamin == 'Perempuan' ? require('../../assets/img_genre2.png') : require('../../assets/img_male2.png')} />}
                                </View>


                                {/* HASIL DARI HALAMAN SEBELUMNYA */}
                                <View>

                                    {/* JENEIS KELAMIN */}
                                    <Text style={{ fontFamily: fonts.primary[700], fontSize: 17, color: user.tipe == 'Gain' ? colors.primary : colors.secondary, }}>• {user.jenis_kelamin}</Text>

                                    {/* USIA */}
                                    <Text style={{ fontFamily: fonts.primary[700], fontSize: 17, color: user.tipe == 'Gain' ? colors.primary : colors.secondary, }}>• {moment().diff(user.tanggal_lahir, 'year')} Tahun</Text>

                                    {/* IMT */}
                                    <Text style={{ fontFamily: fonts.primary[700], fontSize: 17, color: user.tipe == 'Gain' ? colors.primary : colors.secondary, }}>• IMT = {user.imt} ( {user.hasil} ) </Text>

                                    {/* TARGET */}
                                    <Text style={{ fontFamily: fonts.primary[700], fontSize: 17, color: user.tipe == 'Gain' ? colors.primary : colors.secondary, }}>• Target = {user.berat_target} Kg</Text>

                                </View>
                            </View>

                            <View style={{
                                marginTop: 10,
                                alignItems: "center"

                            }}>
                                <Text style={{
                                    fontFamily: fonts.primary[400],
                                    color: colors.black,
                                    textAlign: 'center',
                                    fontSize: 15,
                                    alignItems: "center"
                                }}>
                                    Kami sangat berharap, kamu bisa
                                    mengikuti program dari kami untuk pencapaian target kamu
                                </Text>
                            </View>


                            {/* PROGRAM */}

                            <View>
                                <Text style={{
                                    textAlign: "center",
                                    fontFamily: fonts.primary[600],
                                    fontSize: 20,
                                    color: user.tipe == 'Gain' ? colors.primary : colors.secondary,
                                }}>Program dari Kami</Text>

                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    flexWrap: "wrap",
                                    marginTop: 10

                                }}>

                                    <TouchableNativeFeedback>
                                        <View>
                                            <Image style={{ width: 162, height: 118 }} source={user.tipe == 'Gain' ? require('../../assets/video_program.png') : require('../../assets/video_program2.png')} />
                                        </View>
                                    </TouchableNativeFeedback>

                                    <TouchableNativeFeedback>
                                        <View>
                                            <Image style={{ width: 162, height: 118 }} source={user.tipe == 'Gain' ? require('../../assets/meal_program.png') : require('../../assets/meal_program2.png')} />
                                        </View>
                                    </TouchableNativeFeedback>

                                    <TouchableNativeFeedback>
                                        <View style={{ marginTop: 20 }}>
                                            <Image style={{ width: 162, height: 118 }} source={user.tipe == 'Gain' ? require('../../assets/monitoring_program.png') : require('../../assets/monitoring_program2.png')} />
                                        </View>
                                    </TouchableNativeFeedback>

                                    <TouchableNativeFeedback>
                                        <View style={{ marginTop: 20 }}>
                                            <Image style={{ width: 162, height: 118 }} source={user.tipe == 'Gain' ? require('../../assets/konsultasi_program.png') : require('../../assets/konsultasi_program2.png')} />
                                        </View>
                                    </TouchableNativeFeedback>


                                </View>


                            </View>
                            <View style={{
                                paddingHorizontal: 10,
                                // padding: 10,
                                marginTop: 10
                            }}>
                                <TouchableNativeFeedback onPress={() => navigation.navigate("MainApp")}>
                                    <View style={{
                                        backgroundColor: user.tipe == 'Gain' ? colors.primary : colors.secondary,
                                        padding: 10,
                                        borderRadius: 30
                                    }}>
                                        <Text style={{
                                            fontFamily: fonts.primary[600],
                                            color: colors.white,
                                            fontSize: 15,
                                            textAlign: 'center'
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