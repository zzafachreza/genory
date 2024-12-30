import { View, StyleSheet, Text, TouchableNativeFeedback, ScrollView, Image, TouchableWithoutFeedback, SafeAreaView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { MyHeader } from '../../components';
import { Color, colors, fonts } from '../../utils';
import axios from 'axios';
import { apiURL, webURL } from '../../utils/localStorage';
import { FlatList } from 'react-native';
import { Icon } from 'react-native-elements';
export default function VideoData({ navigation, route }) {
    const user = route.params;

    const [data, setData] = useState([]);

    useEffect(() => {
        axios.post(apiURL + 'daftar_nonton', {
            fid_pengguna: route.params.id_pengguna
        }).then(res => {
            console.log(res.data);
            setData(res.data);
        })
    }, [])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
            <MyHeader title="Jumlah Video" />
            <View style={{
                flex: 1,
                padding: 16,
            }}>
                <FlatList data={data} renderItem={({ item, index }) => {
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
                                        fontSize: 18,
                                    }}>Hari ke {item.hari}</Text>
                                    <Text style={{
                                        color: user.tipe == 'Gain' ? colors.primary : colors.secondary,
                                        fontFamily: fonts.primary[400],
                                        fontSize: 14,
                                    }}>Minggu {pekan}</Text>
                                </View>
                                <Text style={{
                                    right: 5,
                                    color: user.tipe == 'Gain' ? colors.primary : colors.secondary,
                                    fontFamily: fonts.primary[400],
                                    fontSize: 14,
                                }}>{item.cek == null ? 0 : item.cek} / {item.semua}</Text>
                                <Icon type='ionicon' name='chevron-forward-circle-outline' size={30} color={user.tipe == 'Gain' ? colors.primary : colors.secondary} />
                            </View>
                        </TouchableOpacity>
                    )
                }} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})