import { View, Text, TouchableNativeFeedback, Image, Linking } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Color, colors, fonts } from '../../utils';
import { MyButton, MyGap, MyHeader, MyInput, MyPicker } from '../../components';
import axios from 'axios';
import { apiURL } from '../../utils/localStorage';
import { useToast } from 'react-native-toast-notifications';

export default function CalculatorHasil({ navigation, route }) {
    const user = route.params.user;
    console.log(user);
    const item = route.params.item;



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

    const MyInputData = ({ label, value, size = 12 }) => {
        return <View style={{
            padding: 10,
            backgroundColor: Color.blueGray[100],
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Text style={{ fontFamily: fonts.primary[600], fontSize: 12, }}>{label}</Text>
            <Text style={{ fontFamily: fonts.primary[400], fontSize: size }}>{value}</Text>
        </View>
    }

    const MyInputData2 = ({ label, value }) => {
        return <View style={{
            flexDirection: 'row',
            paddingVertical: 2,
        }}>
            <Text style={{ fontFamily: fonts.primary[600], fontSize: 12, flex: 1, }}>{label}</Text>
            <Text style={{ fontFamily: fonts.primary[400], fontSize: 12 }}>{value}</Text>
        </View>
    }
    return (
        <View style={{
            flex: 1,
            backgroundColor: colors.white
        }}>

            <View>
                <MyHeader title={route.params.judul} />
            </View>

            <View style={{
                flex: 1,
                padding: 10,
            }}>

                <MyInputData2 label="Berat Badan" value={`${item.berat_badan} kg`} />
                <MyInputData2 label="Tinggi Badan" value={`${item.tinggi_badan} cm`} />
                <MyInputData2 label="Jenis Kelamin" value={`${item.jenis_kelamin}`} />
                <MyInputData2 label="Usia" value={`${item.usia} Tahun`} />
                <MyInputData2 label="Tujuan Diet" value={`${item.tujuan}`} />
                <MyInputData2 label="Aktifitas Fisik" value={`${item.aktifitas}`} />
                <View style={{
                    borderBottomWidth: 1,
                    marginTop: 10,
                    borderBottomColor: Color.blueGray[200]
                }} />
                <Text style={{
                    marginTop: 10,
                    fontSize: 16,
                    fontFamily: fonts.primary[600],
                    color: user.tipe == 'Gain' ? colors.primary : colors.secondary
                }}>Kebutuhan Tubuhmu</Text>

                <View style={{

                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <View style={{
                        flex: 1,
                    }}>
                        <MyInputData label="Target Kalori Harian (kkal)" value={`${item.kalori}`} size={22} />
                    </View>
                </View>
                <View style={{
                    marginTop: 10,
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <View style={{
                        flex: 1,
                    }}>
                        <MyInputData label="TDEE (kkal)" value={`${item.tdee}`} />
                    </View>
                </View>
                <View style={{
                    marginTop: 10,
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <View style={{
                        flex: 1,
                        paddingRight: 5,
                    }}>
                        <MyInputData label="BMR (kkal)" value={`${item.bmr}`} />
                    </View>

                    <View style={{
                        flex: 1,
                        paddingLeft: 5,
                    }}>
                        <MyInputData label="BMI" value={`${item.bmi}`} />
                    </View>
                    <View style={{
                        flex: 1,
                        paddingLeft: 5,
                    }}>
                        <MyInputData label="BB Ideal (kg)" value={`${item.bb}`} />
                    </View>
                </View>

                <Text style={{
                    marginTop: 10,
                    fontSize: 16,
                    fontFamily: fonts.primary[600],
                    color: user.tipe == 'Gain' ? colors.primary : colors.secondary
                }}>Kebutuhan Makro Gizi</Text>
                <View style={{

                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <View style={{
                        flex: 1,
                        paddingRight: 5,
                    }}>
                        <MyInputData label="Protein (gr)" value={`${item.protein}`} />
                    </View>

                    <View style={{
                        flex: 1,
                        paddingLeft: 5,
                    }}>
                        <MyInputData label="Lemak (gr)" value={`${item.lemak}`} />
                    </View>
                    <View style={{
                        flex: 1,
                        paddingLeft: 5,
                    }}>
                        <MyInputData label="Karbo (gr)" value={`${item.karbohidrat}`} />
                    </View>
                </View>
            </View>

            <View style={{
                padding: 10,
            }}>
                <MyButton onPress={() => navigation.goBack()} warna={user.tipe == 'Gain' ? colors.primary : colors.secondary} Icons="refresh" iconColor={colors.white} title="Hitung Ulang" />
            </View>
        </View>
    );
}
