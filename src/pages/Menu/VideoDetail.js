import { View, StyleSheet, Text, TouchableNativeFeedback, ScrollView, Image, TouchableWithoutFeedback, SafeAreaView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { MyHeader } from '../../components';
import { Color, colors, fonts } from '../../utils';
import axios from 'axios';
import { apiURL, webURL } from '../../utils/localStorage';
import { FlatList } from 'react-native';
import { Icon } from 'react-native-elements';
export default function VideoDetail({ navigation, route }) {
    const user = route.params.user;
    const minggu = route.params.minggu;
    const hari = route.params.hari;

    const [data, setData] = useState([]);

    useEffect(() => {
        axios.post(apiURL + 'youtube', {
            fid_pengguna: route.params.user.id_pengguna
        }).then(res => {
            console.log(res.data);
            setData(res.data);
        })
    }, [])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
            <MyHeader title={`Hari ke ${hari} | Minggu ${minggu}`} />
            <View style={{
                flex: 1,
                padding: 16,
            }}>
                <FlatList data={data.filter(i => i.hari == hari)} renderItem={({ item, index }) => {
                    let pekan = item.hari <= 7 ? 'Pertama' : 'Kedua';
                    return (
                        <TouchableOpacity onPress={() => navigation.navigate('VideoDetail', {
                            user: user,
                            minggu: pekan,
                            hari: item.hari
                        })}>
                            <View style={{
                                flexDirection: 'row',
                                marginVertical: 8,
                                alignItems: 'center'
                            }}>
                                <View style={{
                                    flex: 1,
                                }}>
                                    <Text style={{
                                        color: user.tipe == 'Gain' ? colors.primary : colors.secondary,
                                        fontFamily: fonts.primary[800],
                                        fontSize: 16,
                                    }}>{item.judul}</Text>
                                    <Text style={{
                                        color: item.cek > 0 ? colors.border : colors.black,
                                        fontFamily: fonts.primary[400],
                                        fontSize: 14,
                                    }}>{item.cek > 0 ? 'Sudah Ditonton' : 'Belum Ditonton'}</Text>

                                </View>

                                <Icon type='ionicon' name='checkmark-circle' size={30} color={item.cek > 0 ? colors.success : colors.border} />
                            </View>
                        </TouchableOpacity>
                    )
                }} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})