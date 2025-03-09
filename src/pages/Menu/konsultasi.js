import { View, Text, TouchableNativeFeedback, Image, Linking } from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors, fonts } from '../../utils';
import { MyHeader } from '../../components';
import axios from 'axios';
import { apiURL } from '../../utils/localStorage';
import FastImage from 'react-native-fast-image';

export default function Konsultasi() {

    const [medsos, setMedsos] = useState({
        whatsapp: '',
        tiktok: '',
        instagram: ''
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

    return (
        <View style={{
            flex: 1,
            backgroundColor: colors.white
        }}>

            <View>
                <MyHeader title="Konsultasi" />
            </View>

            <View style={{
                padding: 10,
                marginTop: 20
            }}>

                <TouchableNativeFeedback onPress={() => Linking.openURL(medsos.whatsapp)} >
                    <View style={{
                        alignItems: 'center'
                    }}>
                        <FastImage style={{
                            width: 253,
                            height: 255,
                        }} source={require('../../assets/WA.png')} />
                    </View>
                </TouchableNativeFeedback>

            </View>

            <View style={{
                marginTop: 10
            }}>
                <Text style={{
                    fontFamily: fonts.primary[600],
                    color: colors.primary,
                    fontSize: 18,
                    textAlign: "center"
                }}>Konsultasi bersama Genory!</Text>
            </View>

            <View style={{
                marginTop: '10%'
            }}>
                <Text style={{
                    fontFamily: fonts.primary[700],
                    fontSize: 20,
                    color: colors.primary,
                    textAlign: 'center'
                }}>Ikuti Kami : </Text>


                <TouchableNativeFeedback onPress={() => Linking.openURL(medsos.instagram)}>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 20
                    }}>

                        <FastImage style={{
                            width: 24,
                            height: 24
                        }} source={require('../../assets/instagram.png')} />
                        <Text style={{ fontFamily: fonts.primary[600], fontSize: 12, marginLeft: 5, }}>@genory.official</Text>
                    </View>
                </TouchableNativeFeedback>



                <TouchableNativeFeedback onPress={() => Linking.openURL(medsos.tiktok)}>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 10
                    }}>

                        <FastImage style={{
                            width: 24,
                            height: 24
                        }} source={require('../../assets/tiktok.png')} />
                        <Text style={{ fontFamily: fonts.primary[600], fontSize: 12, marginLeft: 5, }}>@genory.official</Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        </View>
    );
}
