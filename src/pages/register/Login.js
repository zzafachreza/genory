
import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    Image,
    Animated,
    ImageBackground,
    TouchableWithoutFeedback,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    Linking
} from 'react-native';
import { MyButton, MyGap, MyInput, MyInputLogin, MyRadio } from '../../components';
import { MyDimensi, colors, fonts, windowHeight, windowWidth, Color } from '../../utils';
import { MYAPP, apiURL, api_token, getData, storeData } from '../../utils/localStorage';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { color } from 'react-native-reanimated';
import axios from 'axios';
import MyLoading from '../../components/MyLoading';
import { useToast } from 'react-native-toast-notifications';

export default function Login({ navigation, route }) {
    const TIPE = route.params.tipe;
    const BGPILIH = TIPE == 'Gain' ? require('../../assets/bgimg.png') : require('../../assets/bgloss.png');
    const [loading, setLoading] = useState(false)
    const img = new Animated.Value(0.8);
    const card = new Animated.Value(50);

    const toast = useToast();

    const masuk = () => {
        if (kirim.telepon.length == 0 && kirim.length == 0) {
            toast.show('Telepon dan kata sandi tidak boleh kosong', { type: 'warning' })

        } else if (kirim.telepon.length == 0) {
            toast.show('Telepon tidak boleh kosong', { type: 'warning' })
        } else if (kirim.password.length == 0) {
            toast.show('Kata sandi tidak boleh kosong', { type: 'warning' })
        } else {
            setLoading(true);
            console.log(kirim);
            axios.post(apiURL + 'login', kirim)
                .then(res => {
                    setLoading(false);
                    console.log(res.data);
                    if (res.data.status == 404) {
                        toast.show(res.data.message, { type: 'danger' })
                    } else {
                        storeData('user', res.data.data);
                        navigation.replace('MainApp')
                    }
                });
        }
    }

    const [kirim, setKirim] = useState({
        api_token: api_token,
        telepon: '',
        password: '',
    })

    const [comp, setComp] = useState({})

    useEffect(() => {

        Animated.timing(img, {
            toValue: 1,
            duration: 750,
            useNativeDriver: true,
        }).start();
        Animated.timing(card, {
            toValue: 1,
            duration: 750,
            useNativeDriver: true,
        }).start();
        axios.post(apiURL + 'company').then(res => {
            setComp(res.data.data);
        })
    }, []);

    return (
        <SafeAreaView style={{
            flex: 1,
        }}
        >

            <ImageBackground style={{
                flex: 1,

            }} source={BGPILIH}>

                <ScrollView>

                    <View style={{
                        padding: 10
                    }}>

                        <View style={{
                            alignItems: 'center',
                            marginTop: 0,
                        }}>
                            <Image style={{
                                width: 332,
                                height: 280,
                                resizeMode: 'contain'

                            }} source={require('../../assets/pasang_produk.png')} />
                        </View>


                        <View style={{
                            paddingHorizontal: 20,
                            marginTop: '0%'
                        }}>
                            {/* FORM VIEW */}

                            {/* telepon */}
                            <MyInput
                                borderColor={TIPE == 'Gain' ? colors.primary : colors.secondary}
                                label="Telepon"
                                placeholder="Isi telepon"
                                value={kirim.telepon}
                                keyboardType='phone-pad'
                                onChangeText={(x) => setKirim({ ...kirim, telepon: x })} />

                            <MyGap jarak={5} />
                            {/* Pasword */}
                            <MyInput
                                borderColor={TIPE == 'Gain' ? colors.primary : colors.secondary}
                                label="Kode Akses"
                                placeholder="Isi Kode Akses"
                                value={kirim.password}
                                onChangeText={(x) => setKirim({ ...kirim, password: x })}
                                secureTextEntry={true}
                            />
                            <TouchableOpacity onPress={() => {
                                Linking.openURL('https://wa.me/' + comp.tlp + '?text=Halo *Admin* saya lupa kata sandi')
                            }} style={{
                                padding: 10,
                            }}>
                                <Text style={{
                                    color: TIPE == 'Gain' ? colors.primary : colors.secondary,
                                    textAlign: 'right',
                                    ...fonts.subheadline3,

                                }}>Lupa Kata Sandi?</Text>
                            </TouchableOpacity>
                            {/* Button */}
                            <MyGap jarak={5} />
                            <MyButton warna={TIPE == 'Gain' ? colors.primary : colors.secondary} onPress={masuk} title="Masuk" />
                            <MyGap jarak={10} />
                            <View style={{
                                alignItems: 'center',
                                marginTop: 0
                            }}>
                                <Image style={{
                                    width: 100,
                                    height: 49,
                                    resizeMode: 'contain'
                                }} source={require('../../assets/genory.png')} />
                            </View>

                            <View style={{}}>
                                <Text style={{
                                    fontFamily: fonts.primary[500],
                                    fontSize: 12,
                                    textAlign: "center",
                                    color: TIPE == 'Gain' ? colors.primary : colors.secondary
                                }}>Make The Look You Want With, Genory!</Text>
                            </View>



                        </View>

                    </View>

                </ScrollView>


            </ImageBackground>

        </ SafeAreaView>
    );
}

const styles = StyleSheet.create({});
