import { View, Text, ImageBackground, ScrollView, TouchableNativeFeedback, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors, fonts } from '../../utils';
import { Image } from 'react-native';
import { MyInput } from '../../components';
import { apiURL, getData, storeData } from '../../utils/localStorage';
import axios from 'axios';
import { Toast, useToast } from 'react-native-toast-notifications';

export default function TargetBerat({ navigation, }) {
    const toast = useToast();
    const [user, setUser] = useState({});
    const [target, setTarget] = useState({
        a: '',
        b: '',
    });

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
                height: '100%'
            }}>

                <ScrollView>
                    <View style={{
                        padding: 20
                    }}>

                        <Text style={{
                            fontFamily: fonts.primary[600],
                            fontSize: 20,
                            color: user.tipe == 'Gain' ? colors.primary : colors.secondary,
                            marginTop: 20

                        }}>Berapa Target Berat{'\n'}
                            Badanmu</Text>

                        <View style={{

                        }}>

                            <Text style={{
                                fontFamily: fonts.primary[400],
                                fontSize: 15,
                            }}>
                                Info ini kami perlukan untuk membuat program intermittent fasting yang paling cocok
                            </Text>
                        </View>

                        {/* IMT */}
                        <View style={{
                            padding: 10,
                        }}>

                            {/* HASIL PERHITUNGAN IMT */}

                            <View style={{
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    fontFamily: fonts.primary[600],
                                    fontSize: 30,
                                    color: user.tipe == 'Gain' ? colors.primary : colors.secondary,
                                    textAlign: "center"
                                }}>IMT = {user.imt}</Text>
                            </View>

                            <View style={{
                                flexDirection: "row",
                                // justifyContent: 'center',
                                alignItems: 'center',

                            }}>

                                <View style={{
                                    flex: 1,
                                    // width: 100,
                                    // margin: 10,

                                }}>
                                    <TextInput maxLength={3} keyboardType='number-pad' style={{
                                        ...fonts.headline1,
                                        textAlign: 'center',
                                        borderWidth: 2,
                                        borderRadius: 10,
                                        color: user.tipe == 'Gain' ? colors.primary : colors.secondary,
                                        borderColor: user.tipe == 'Gain' ? colors.primary : colors.secondary
                                    }} onChangeText={x => setTarget({ ...target, a: x })} />

                                </View>
                                <View style={{
                                    flex: 0.1,

                                    justifyContent: 'center',
                                    alignItems: 'center',

                                }}>
                                    <Text style={{
                                        color: user.tipe == 'Gain' ? colors.primary : colors.secondary,
                                        textAlign: 'center',
                                        ...fonts.headline0
                                    }}>.</Text>
                                </View>

                                <View style={{
                                    flex: 1,
                                    // width: 100,


                                }}>
                                    <TextInput maxLength={2} keyboardType='number-pad' style={{
                                        ...fonts.headline1,
                                        textAlign: 'center',
                                        borderWidth: 2,
                                        borderRadius: 10,
                                        color: user.tipe == 'Gain' ? colors.primary : colors.secondary,
                                        borderColor: user.tipe == 'Gain' ? colors.primary : colors.secondary
                                    }} onChangeText={x => setTarget({ ...target, b: x })} />

                                </View>

                                <View style={{
                                    paddingLeft: 10,
                                }}>
                                    <Text style={{
                                        fontFamily: fonts.primary[600],
                                        fontSize: 20,

                                    }}>kg</Text>
                                </View>

                            </View>

                        </View>

                    </View>
                </ScrollView>

                <View style={{
                    padding: 10,
                    marginBottom: 20
                }}>
                    <TouchableNativeFeedback onPress={() => {
                        let TARGET = parseFloat(target.a + '.' + target.b);
                        axios.post(apiURL + 'target', {
                            id: user.id_pengguna,
                            nama: user.nama,
                            imt: user.imt,
                            hasil: user.hasil,
                            telepon: user.telepon,
                            target: TARGET,
                        }).then(res => {
                            console.log(res.data);
                            if (res.data.status == 200) {
                                toast.show(res.data.message, {
                                    type: 'success'
                                });

                            }
                            navigation.navigate('RingkasanRencana')
                        })
                    }}>
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
    );
}
