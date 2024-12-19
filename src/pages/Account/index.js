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
} from 'react-native';
import { windowWidth, fonts, MyDimensi } from '../../utils/fonts';
import { getData, MYAPP, storeData, urlAPI, urlApp, urlAvatar } from '../../utils/localStorage';
import { Color, colors } from '../../utils/colors';
import { MyButton, MyGap, MyHeader } from '../../components';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import { ScrollView } from 'react-native';

export default function ({ navigation, route }) {
    const [user, setUser] = useState({});
    const [com, setCom] = useState({});
    const isFocused = useIsFocused();
    const [wa, setWA] = useState('');
    const [open, setOpen] = useState(false);



    useEffect(() => {


        if (isFocused) {
            getData('user').then(res => {
                
                setOpen(true);
                setUser(res);

            });
        }




    }, [isFocused]);



    const btnKeluar = () => {
        Alert.alert(MYAPP, 'Apakah kamu yakin akan keluar ?', [
            {
                text: 'Batal',
                style: "cancel"
            },
            {
                text: 'Keluar',
                onPress: () => {
                    storeData('user', null);

                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Splash' }],
                    });
                }
            }
        ])
    };

    const MyList = ({ label, value }) => {
        return (
            <View
                style={{
                    marginVertical: 2,
                    padding: 5,
                    paddingHorizontal: 10,
                    backgroundColor: Color.blueGray[50],
                    borderRadius: 5,
                }}>
                <Text
                    style={{
                        ...fonts.headline5,
                        color: Color.primary[900],
                    }}>
                    {label}
                </Text>
                <Text
                    style={{
                        ...fonts.body3,
                        color: Color.blueGray[900],
                    }}>
                    {value}
                </Text>
            </View>
        )
    }
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>


            <MyHeader title="Akun Saya" onPress={() => navigation.goBack()} />
            {!open && <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>}
            <ScrollView showsVerticalScrollIndicator={false}>
                {open &&

                    <View style={{
                        margin: 5,
                        flex: 1,
                    }}>
                        <View style={{
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            flexDirection:"row",
                            padding:10

                        }}>
                            <View style={{
                                width: 60,
                                height: 60,
                                borderWidth: 1,
                                borderColor: colors.primary,
                                overflow: 'hidden',
                                borderRadius: 100,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>

                                <Image source={require('../../assets/profile.jpg')} style={{
                                    width: 55,
                                    height: 55,
                                    borderRadius:100

                                }} />

                            </View>

                            <View style={{
                                marginLeft:20
                            }}>
                                <Text style={{
                                    fontFamily:fonts.primary[600],
                                    fontSize:15,
                                    color:colors.primary,

                                }}>Halo Kak Jone Done</Text>

                                 <Text style={{
                                    fontFamily:fonts.primary[400],
                                    fontSize:13,
                                    color:Color.blueGray[400],

                                }}>Testing Weight Gain Program</Text>
                            </View>
                        </View>
                        <View style={{ padding: 10, }}>
                           
                        </View>
                        {/* data detail */}
                    </View>

                }

                <View style={{
                    padding:10,
                }}>

                <View style={{
                    flexDirection:'row',
                    justifyContent:"space-between",
                    flexWrap:'wrap',
                    alignItems:"center"
                }}>

                {/* PROGRES */}

                <View style={{
                    padding:10,
                    width:160,
                    backgroundColor:colors.primary,
                    borderRadius:10,
                    marginTop:10
                }}>
                <Text style={{
                    fontFamily:fonts.primary[700],
                    color:colors.white,
                    fontSize:15,
                    textAlign:"center"
                }}>Progres Saya</Text>
                <Text>{``}</Text>
                </View>

                {/* USIA */}
                <View style={{
                    padding:10,
                    width:160,
                    backgroundColor:colors.primary,
                    borderRadius:10
                }}>
                <Text style={{
                    fontFamily:fonts.primary[700],
                    color:colors.white,
                    fontSize:15,
                    textAlign:"center"
                }}>Usia</Text>
                <Text>{``}</Text>
                </View>


                {/* Berat Badan */}
                <View style={{
                    padding:10,
                    width:160,
                    backgroundColor:colors.primary,
                    borderRadius:10,
                    marginTop:10
                }}>
                <Text style={{
                    fontFamily:fonts.primary[700],
                    color:colors.white,
                    fontSize:15,
                    textAlign:"center"
                }}>Berat Badan</Text>
                <Text>{``}</Text>
                </View>
                
                {/* TINGGI BADAN */}
                <View style={{
                    padding:10,
                    width:160,
                    backgroundColor:colors.primary,
                    borderRadius:10
                }}>
                <Text style={{
                    fontFamily:fonts.primary[700],
                    color:colors.white,
                    fontSize:15,
                    textAlign:"center"
                }}>Tinggi Badan</Text>
                <Text>{``}</Text>
                </View>

                {/* JENIS KELAIN */}
                <View style={{
                    padding:10,
                    width:160,
                    backgroundColor:colors.primary,
                    borderRadius:10,
                    marginTop:10
                }}>
                <Text style={{
                    fontFamily:fonts.primary[700],
                    color:colors.white,
                    fontSize:15,
                    textAlign:"center"
                }}>Jenis Kelamin</Text>
                <Text>{``}</Text>
                </View>


                {/*  TARGRT */}
                <View style={{
                    padding:10,
                    width:160,
                    backgroundColor:colors.primary,
                    borderRadius:10,
                    marginTop:10
                }}>
                <Text style={{
                    fontFamily:fonts.primary[700],
                    color:colors.white,
                    fontSize:15,
                    textAlign:"center"
                }}>Target Kamu</Text>
                <Text>{``}</Text>
                </View>

                </View>

                {/* Indesk masa tubuh */}

                <View style={{
                    padding:10,
                    borderWidth:1,
                    borderColor:colors.primary,
                    borderRadius:10,
                    marginTop:20
                }}>

                <Text style={{
                    fontFamily:fonts.primary[600],
                    fontSize:15,
                    color:colors.primary,
                }}>Indeks Masa Tubuh</Text>

                </View>


                {/* Perjalanan kamu */}
                <View style={{
                    padding:10,
                    borderWidth:1,
                    borderColor:colors.primary,
                    borderRadius:10,
                    marginTop:20
                }}>

                <Text style={{
                    fontFamily:fonts.primary[600],
                    fontSize:15,
                    color:colors.primary,
                }}>Perjalanan Kamu</Text>

                </View>

                {/*  HASIL RENCANA KAMU */}
                <View style={{
                    padding:10,
                    borderWidth:1,
                    borderColor:colors.primary,
                    borderRadius:10,
                    marginTop:20
                }}>

                <Text style={{
                    fontFamily:fonts.primary[600],
                    fontSize:15,
                    color:colors.primary,
                }}>Hasil Rencana Kamu</Text>

                </View>


                </View>
                <View style={{
                    padding: 20,
                }}>
                    <MyButton warna={colors.primary} title="Edit Profile" Icons="create-outline" onPress={() => navigation.navigate('AccountEdit', user)} />
                    <MyGap jarak={10} />
                    <MyButton onPress={btnKeluar} warna={Color.blueGray[300]} title="Log Out" Icons="log-out-outline" iconColor={colors.white} colorText={colors.white} />
                </View>
            </ScrollView>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({});
