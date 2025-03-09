import { View, Text, TouchableNativeFeedback, Image, Linking, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors, fonts } from '../../utils';
import { MyButton, MyGap, MyHeader, MyInput, MyPicker } from '../../components';
import axios from 'axios';
import { apiURL } from '../../utils/localStorage';
import { useToast } from 'react-native-toast-notifications';
import MyLoading from '../../components/MyLoading';
import { Icon } from 'react-native-elements';
import FastImage from 'react-native-fast-image'

export default function Calculator({ navigation, route }) {
    const user = route.params.user;
    console.log(user);

    const [medsos, setMedsos] = useState({
        whatsapp: '',
        tiktok: '',
        instagram: ''
    });
    const __GetMedsos = () => {
        axios.post(apiURL + 'medsos').then(res => {
            console.log(res.data);
            setMedsos(res.data);
        })

    }

    useEffect(() => {
        __GetMedsos();
    }, []);


    const TJN = [
        {
            label: 'Turun Berat Badan',
            value: 0,
        },
        {
            label: 'Kontrol Maintenance',
            value: 1,
        },
        {
            label: 'Menaikan Berat Badan',
            value: 2,
        }
    ];

    const TJN_DATA = [
        {
            label: 'Turun Berat Badan',
            value: 'Turun Berat Badan',
        },
        {
            label: 'Kontrol Maintenance',
            value: 'Kontrol Maintenance',
        },
        {
            label: 'Menaikan Berat Badan',
            value: 'Menaikan Berat Badan',
        }
    ];

    const ACT = [
        {
            label: 'Tidak atau sedikit aktif olahraga',
            value: 1.2
        },
        {
            label: 'Olahraga 1-3 kali per minggu',
            value: 1.375
        },
        {
            label: 'Olahraga 3-5 kali per minggu',
            value: 1.55
        },
        {
            label: 'Olahraga 6-7 kali per minggu',
            value: 1.725
        },
        {
            label: 'Olahraga 2 kali dalam sehari',
            value: 1.9
        },

    ]

    const ACT_DATA = [
        {
            label: 'Tidak atau sedikit aktif olahraga',
            value: 'Tidak atau sedikit aktif olahraga',
        },
        {
            label: 'Olahraga 1-3 kali per minggu',
            value: 'Olahraga 1-3 kali per minggu',
        },
        {
            label: 'Olahraga 3-5 kali per minggu',
            value: 'Olahraga 3-5 kali per minggu',
        },
        {
            label: 'Olahraga 6-7 kali per minggu',
            value: 'Olahraga 6-7 kali per minggu',
        },
        {
            label: 'Olahraga 2 kali dalam sehari',
            value: 'Olahraga 2 kali dalam sehari',
        },

    ]
    const [kirim, setKirim] = useState({
        berat_badan: '',
        tinggi_badan: '',
        usia: '',
        jenis_kelamin: 'Laki-laki',
        tujuan: 'Turun Berat Badan',
        aktifitas: 'Tidak atau sedikit aktif olahraga'
    });

    const toast = useToast();
    const [loading, setLoading] = useState(true);

    function hitungBMR(jenisKelamin, beratBadan, tinggiBadan, usia) {
        var bmr;

        if (jenisKelamin === 'Laki-laki') {
            bmr = (10 * beratBadan) + (6.25 * tinggiBadan) - (5 * usia) + 5;
        } else if (jenisKelamin === 'Perempuan') {
            bmr = (10 * beratBadan) + (6.25 * tinggiBadan) - (5 * usia) - 161;
        } else {
            throw new Error('Jenis kelamin harus "pria" atau "wanita"');
        }

        return bmr.toFixed(1);
    }


    function hitungBMI(beratBadan, tinggiBadan) {
        if (beratBadan <= 0 || tinggiBadan <= 0) {
            throw new Error("Berat badan dan tinggi badan harus lebih besar dari 0");
        }

        var bmi = beratBadan / Math.pow(tinggiBadan / 100, 2);
        return bmi.toFixed(1);
    }

    function hitungBBIdealBroca(tinggiBadan, jenisKelamin) {
        if (tinggiBadan <= 0) {
            throw new Error("Tinggi badan harus lebih besar dari 0");
        }

        let bbIdeal;

        if (jenisKelamin === 'Laki-laki') {
            bbIdeal = (tinggiBadan - 100) - ((tinggiBadan - 150) / 4);
        } else if (jenisKelamin === 'Perempuan') {
            bbIdeal = (tinggiBadan - 100) - ((tinggiBadan - 145) / 4);
        } else {
            throw new Error("Jenis kelamin harus 'pria' atau 'wanita'");
        }

        return `${bbIdeal - 3.6} - ${bbIdeal - 0.2}`;

    }




    const sendData = () => {

        if (kirim.berat_badan.length == 0) {
            toast.show('Berat Badan harus diisi !', { type: 'warning' })
        } else if (kirim.tinggi_badan.length == 0) {
            toast.show('Tinggi Badan harus diisi !', { type: 'warning' })
        } else if (kirim.usia.length == 0) {
            toast.show('Usia harus diisi !', { type: 'warning' })
        } else {
            setLoading(true);
            let TMP_TJN = TJN.filter(i => i.label == kirim.tujuan)[0].value;
            let TMP_ACT = ACT.filter(i => i.label == kirim.aktifitas)[0].value;



            let BMR = hitungBMR(kirim.jenis_kelamin, kirim.berat_badan, kirim.tinggi_badan, kirim.usia);
            let TDEE = parseFloat(BMR * TMP_ACT).toFixed(1);
            let BMI = hitungBMI(kirim.berat_badan, kirim.tinggi_badan);
            let BB = hitungBBIdealBroca(kirim.tinggi_badan, kirim.jenis_kelamin);

            let KAL = 0;
            if (TMP_TJN == 0) {
                KAL = parseFloat(TDEE * 0.85).toFixed(1);
            } else if (TMP_TJN == 1) {
                KAL = TDEE;
            } else if (TMP_TJN == 2) {
                KAL = parseFloat(TDEE * 1.1).toFixed(1);
            }

            let karbohidrat = parseFloat(KAL * 0.1).toFixed(1);
            let protein = parseFloat(KAL * 0.0625).toFixed(1);
            let lemak = parseFloat(KAL * 0.0389).toFixed(1);

            console.log(`protenin ${protein} - lemat ${lemak} - karbo : ${karbohidrat}`)

            setTimeout(() => {

                navigation.navigate('CalculatorHasil', {
                    user: user,
                    judul: route.params.judul,
                    item: {
                        ...kirim,
                        tjn_nilai: TMP_TJN,
                        act_nilai: TMP_ACT,
                        bmr: BMR,
                        tdee: TDEE,
                        kalori: KAL,
                        bmi: BMI,
                        bb: BB,
                        karbohidrat: karbohidrat,
                        protein: protein,
                        lemak: lemak
                    }
                })

                setKirim({
                    berat_badan: '',
                    tinggi_badan: '',
                    usia: '',
                    jenis_kelamin: 'Laki-laki',
                    tujuan: 'Turun Berat Badan',
                    aktifitas: 'Tidak atau sedikit aktif olahraga'
                })
                setLoading(false)
            }, 1200);

        }


    }

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, [])

    return (
        <View style={{
            flex: 1,
            backgroundColor: colors.white
        }}>

            <View>
                <View style={{
                    marginTop: 0,
                    marginHorizontal: 0,
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: user.tipe == 'Gain' ? colors.primary : colors.secondary,
                    paddingHorizontal: 10,
                    justifyContent: 'center',
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,

                }}>

                    <TouchableOpacity onPress={() => navigation.replace('MainApp')} style={{
                        zIndex: 99,
                        height: 70,
                        width: 80,
                        justifyContent: 'center',
                        alignItems: 'center',
                        // padding: 10,
                    }}>
                        <Icon type='ionicon' name='arrow-back-outline' size={24} color={colors.white} />
                    </TouchableOpacity>


                    <Text style={{
                        ...fonts.headline4,
                        flex: 1,
                        textAlign: 'center',
                        marginLeft: -50,

                        color: colors.white
                    }}>{route.params.judul}</Text>

                </View>
            </View>

            {!loading &&
                <>
                    <View style={{
                        flex: 1,
                        padding: 10,
                    }}>
                        <View>
                            <Text style={{
                                fontFamily: fonts.primary[700],
                                fontSize: 20,
                                color: user.tipe == 'Gain' ? colors.primary : colors.secondary,
                                textAlign: 'center'
                            }}>Informasi Utama</Text>

                            <View style={{
                                marginBottom: 0,
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <View style={{
                                    flex: 1,
                                    paddingRight: 5
                                }}>
                                    <MyInput borderColor={user.tipe == 'Gain' ? colors.primary : colors.secondary} value={kirim.berat_badan} onChangeText={x => setKirim({ ...kirim, berat_badan: x })} iconname='speedometer-outline' keyboardType='number-pad' label="Berat Badan" placeholder="kg" />
                                </View>
                                <View style={{
                                    flex: 1,
                                    paddingLeft: 5
                                }}>
                                    <MyInput borderColor={user.tipe == 'Gain' ? colors.primary : colors.secondary} value={kirim.tinggi_badan} onChangeText={x => setKirim({ ...kirim, tinggi_badan: x })} iconname='body-outline' keyboardType='number-pad' label="Tinggi Badan" placeholder="cm" />
                                </View>
                            </View>
                            <View style={{
                                marginBottom: 0,
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <View style={{
                                    flex: 1,
                                    paddingRight: 5
                                }}>
                                    <MyInput borderColor={user.tipe == 'Gain' ? colors.primary : colors.secondary} value={kirim.usia} onChangeText={x => setKirim({ ...kirim, usia: x })} iconname='person-outline' keyboardType='number-pad' label="Usia" placeholder="tahun" />
                                </View>
                                <View style={{
                                    flex: 1,
                                    paddingLeft: 5
                                }}>
                                    <MyPicker borderColor={user.tipe == 'Gain' ? colors.primary : colors.secondary} value={kirim.jenis_kelamin} onChange={x => setKirim({
                                        ...kirim,
                                        jenis_kelamin: x
                                    })} label="Jenis Kelamin" data={[
                                        { label: 'Laki-laki', value: 'Laki-laki' },
                                        {
                                            label: 'Perempuan', value: 'Perempuan'
                                        }
                                    ]} />

                                </View>

                            </View>

                            <MyPicker borderColor={user.tipe == 'Gain' ? colors.primary : colors.secondary} value={kirim.tujuan} onChange={x => setKirim({
                                ...kirim,
                                tujuan: x
                            })} label="Tujuan Diet" data={TJN_DATA} />

                            <MyPicker borderColor={user.tipe == 'Gain' ? colors.primary : colors.secondary} value={kirim.aktifitas} onChange={x => setKirim({
                                ...kirim,
                                aktifitas: x
                            })} label="Aktivitas Fisik" data={ACT_DATA} />

                            <MyGap jarak={20} />
                            {!loading && <MyButton onPress={sendData} warna={user.tipe == 'Gain' ? colors.primary : colors.secondary} Icons="speedometer" iconColor={colors.white} title="Hitung" />}

                            {loading && <View style={{
                                marginTop: 20,
                            }}>
                                <MyLoading color={user.tipe == 'Gain' ? colors.primary : colors.secondary} />
                            </View>}
                        </View>
                    </View>

                    <View style={{
                        padding: 10,
                    }}>
                        <Text style={{
                            fontFamily: fonts.primary[700],
                            fontSize: 20,
                            color: user.tipe == 'Gain' ? colors.primary : colors.secondary,
                            textAlign: 'center'
                        }}>Ikuti Kami : </Text>


                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <TouchableNativeFeedback onPress={() => Linking.openURL(medsos.instagram)}>
                                <View style={{
                                    marginRight: 10,
                                    flexDirection: "row",
                                    justifyContent: 'center',
                                    alignItems: 'center',

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
                </>

            }

            {loading && <View style={{
                marginTop: 20,
                flex: 1,
            }}>
                <MyLoading color={user.tipe == 'Gain' ? colors.primary : colors.secondary} />
            </View>}
        </View>
    );
}
