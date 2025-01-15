import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    Linking,
    Alert,
    ActivityIndicator,
    ScrollView,
} from 'react-native';
import { windowWidth, fonts } from '../../utils/fonts';
import { apiURL, getData, MYAPP, storeData, urlAPI, urlApp, urlAvatar } from '../../utils/localStorage';
import { Color, colors } from '../../utils/colors';
import { MyButton, MyCalendar, MyGap, MyHeader, MyInput, MyPicker } from '../../components';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import moment from 'moment';
import SweetAlert from 'react-native-sweet-alert';
import MyLoading from '../../components/MyLoading';
import { useToast } from 'react-native-toast-notifications';

export default function AccountEdit({ navigation, route }) {

    const TIPE = route.params.tipe;
    const [kirim, setKirim] = useState(route.params);
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const sendServer = () => {
        setLoading(true);
        console.log(kirim);
        axios.post(apiURL + 'update_profile', kirim).then(res => {
            console.log(res.data)

            setLoading(false);

            if (res.data.status == 200) {

                toast.show(res.data.message, {
                    type: 'success'
                });
                storeData('user', res.data.data);
                navigation.replace('MainApp');

            }
        })
    }

    useEffect(() => {
        setKirim({
            ...kirim,
            newfoto_user: null,
        })
    }, [])

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white,
        }}>
            <MyHeader title="Edit Profile" onPress={() => navigation.goBack()} />
            <ScrollView showsVerticalScrollIndicator={false} style={{
                paddingHorizontal: 20,
            }}>

                <View style={{
                    padding: 10,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <TouchableOpacity onPress={() => {


                        launchImageLibrary({
                            includeBase64: true,
                            quality: 1,
                            mediaType: "photo",
                            maxWidth: 200,
                            maxHeight: 200
                        }, response => {

                            setKirim({
                                ...kirim,
                                newfoto_user: `data:${response.assets[0].type};base64, ${response.assets[0].base64}`,
                            });
                        });



                    }} style={{
                        width: 100,
                        height: 100,
                        borderWidth: 1,
                        borderColor: Color.blueGray[100],
                        overflow: 'hidden',
                        borderRadius: 20,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Image style={{
                            width: 100,
                            height: 100,
                        }} source={{
                            uri: kirim.newfoto_user !== null ? kirim.newfoto_user : kirim.file_pengguna,
                        }} />
                    </TouchableOpacity>
                </View>


                <MyInput borderColor={TIPE == 'Gain' ? colors.primary : colors.lossColor} value={kirim.nama}
                    placeholder="Isi Nama"
                    backgroundColor='#F7F7F7'
                    label="Nama"
                    onChangeText={(x) => setKirim({ ...kirim, 'nama': x })}
                />

                <MyPicker
                    borderColor={TIPE == 'Gain' ? colors.primary : colors.lossColor}
                    onChange={x => setKirim({
                        ...kirim,
                        jenis_kelamin: x
                    })}
                    value={kirim.jenis_kelamin}
                    label="Pilih Jenis Kelamin"
                    backgroundColor='#F7F7F7'
                    data={[
                        { label: 'Laki-laki', value: 'laki-laki' },
                        { label: 'Perempuan', value: 'perempuan' },
                    ]}
                />

                <MyInput
                    borderColor={TIPE == 'Gain' ? colors.primary : colors.lossColor}
                    placeholder="Isi Email"
                    backgroundColor='#F7F7F7'
                    label="Email"
                    value={kirim.email}
                    onChangeText={(x) => setKirim({ ...kirim, 'email': x })}
                />

                <MyInput
                    borderColor={TIPE == 'Gain' ? colors.primary : colors.lossColor}
                    placeholder="Isi Nomor Telepon (Contoh 081xxx) "
                    backgroundColor='#F7F7F7'
                    keyboardType="phone-pad"
                    label="Nomor Telepon (Contoh 081xxx)"
                    value={kirim.telepon}
                    onChangeText={(x) => setKirim({ ...kirim, 'telepon': x })}
                />



                <MyCalendar
                    borderColor={TIPE == 'Gain' ? colors.primary : colors.lossColor}
                    onDateChange={x => setKirim({
                        ...kirim,
                        tanggal_lahir: x
                    })}
                    value={kirim.tanggal_lahir}
                    label="Pilih Tanggal Lahir"
                    backgroundColor='#F7F7F7'
                    data={[
                        { label: 'Laki-laki', value: 'laki-laki' },
                        { label: 'Perempuan', value: 'perempuan' },
                    ]}
                />


                <MyInput
                    borderColor={TIPE == 'Gain' ? colors.primary : colors.lossColor}
                    keyboardType="number-pad"
                    placeholder="Isi Tinggi Badan (cm)"
                    backgroundColor='#F7F7F7'
                    label="Tinggi Badan (cm)"
                    value={kirim.tinggi_badan}
                    onChangeText={(x) => setKirim({ ...kirim, 'tinggi_badan': x })}
                />

                <MyInput
                    borderColor={TIPE == 'Gain' ? colors.primary : colors.lossColor}
                    placeholder="Isi Berat Badan (kg)"
                    keyboardType="number-pad"
                    backgroundColor='#F7F7F7'
                    label="Berat Badan (kg)"
                    value={kirim.berat_badan}
                    onChangeText={(x) => setKirim({ ...kirim, 'berat_badan': x })}
                />

                {/* <MyInput backgroundColor='#F7F7F7' borderColor={TIPE == 'Gain' ? colors.primary : colors.lossColor} label="Password" secureTextEntry={true} onChangeText={x => setKirim({ ...kirim, newpassword: x })} placeholder="Kosongkan jika tidak diubah" /> */}
                <MyGap jarak={20} />
                {loading && <MyLoading />}

                {!loading && <MyButton warna={kirim.tipe == 'Gain' ? colors.primary : colors.secondary} colorText={colors.white} iconColor={colors.white} onPress={sendServer} title="Simpan Perubahan" Icons="download-outline" />}
                <MyGap jarak={20} />
            </ScrollView>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({})