import { View, Text, ImageBackground, Image, TouchableNativeFeedback, ScrollView, Alert } from 'react-native'
import React from 'react'
import { fonts, colors } from '../../utils'
import { MySecondPicker } from '../../components'
import { Icon } from 'react-native-elements'
import { useState } from 'react'
import { showMessage } from 'react-native-flash-message'

export default function KeduaNextSlide({ navigation }) {
    const [selectedProgram, setSelectedProgram] = useState(null); // State untuk menyimpan program yang dipilih
    const [isProgramSelected, setIsProgramSelected] = useState(false); // State untuk melacak apakah sudah memilih program

    const handleProgramChange = (value) => {
        setSelectedProgram(value); // Update nilai yang dipilih
        setIsProgramSelected(true);
        console.log("Kamu Memilih : ", value)
    };

    const handleNextSlide = () => {
        if (isProgramSelected) {
            if (selectedProgram === 'Testing Weight Gain Program') {
                navigation.navigate('GainRegister', {
                    tipe: 'Gain'
                });
            } else if (selectedProgram === 'Testing Weight Loss Program') {
                navigation.navigate('GainRegister', {
                    tipe: 'Loss'
                });
            }
        } else {
            showMessage({
                type: 'danger',
                backgroundColor: colors.white,
                color: colors.danger,
                message: 'Mohon pilih program terlebih dahulu',
                position: "top",

            })
        }
    }

    return (
        <View style={{
            flex: 1,
            backgroundColor: colors.white
        }}>
            <ImageBackground source={require('../../assets/bgimg.png')} style={{
                flex: 1,
                width: '100%',
                height: '100%'

            }}>

                <View style={{
                    padding: 10,
                }}>
                    <ScrollView>
                        <View style={{
                            marginTop: 70,
                            alignItems: "center"
                        }}>
                            <View style={{
                                width: 310
                            }}>
                                <Text style={{
                                    fontFamily: fonts.primary[500],
                                    textAlign: "center",
                                    fontSize: 15,
                                    color: colors.primary
                                }}>Wujudkan Body Goalmu dengan Genory!
                                    Pilih Programmu Sekarang!</Text>
                            </View>
                        </View>

                        <View style={{
                            alignItems: "center"
                        }}>
                            <MySecondPicker
                                value={selectedProgram}
                                onChange={handleProgramChange}
                                label="Pilih Program"
                                data={[
                                    { label: 'Testing Weight Gain Program', value: 'Testing Weight Gain Program' },
                                    { label: 'Testing Weight Loss Program', value: 'Testing Weight Loss Program' },
                                ]} />
                        </View>

                        <View style={{
                            alignItems: 'center',
                            marginTop: 0,
                        }}>
                            <Image style={{
                                width: 251,
                                height: 335,

                            }} source={require('../../assets/cewe_2.png')} />
                        </View>



                        <View style={{
                            alignItems: 'center',
                            marginTop: 10
                        }}>
                            <TouchableNativeFeedback onPress={handleNextSlide}>
                                <View style={{
                                    padding: 10,
                                    backgroundColor: colors.primary,
                                    width: 310,
                                    borderRadius: 30,
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    justifyContent: "center"

                                }}>
                                    <Text style={{
                                        fontFamily: fonts.primary[500],
                                        fontSize: 15,
                                        color: colors.white,
                                        textAlign: "center",
                                        top: 1.5
                                    }}>Selanjutnya</Text>

                                    <Icon type='ionicon' name='chevron-forward-outline' size={20} color={colors.white} />

                                </View>


                            </TouchableNativeFeedback>
                        </View>



                    </ScrollView>



                    {/* end */}

                    <View>
                        <View style={{
                            alignItems: 'center',
                            marginTop: 20
                        }}>
                            <Image style={{
                                width: 73,
                                height: 29,
                            }} source={require('../../assets/genory.png')} />
                        </View>

                        <View style={{}}>
                            <Text style={{
                                fontFamily: fonts.primary[500],
                                fontSize: 15,
                                textAlign: "center",
                                color: colors.primary,
                            }}>Make The Look You Want With, Genory!</Text>
                        </View>

                        <View style={{
                            alignItems: 'center',
                            marginTop: 20,
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                                alignItems: "center",
                                width: 159
                            }}>

                                <TouchableNativeFeedback>
                                    <Image style={{
                                        width: 24,
                                        height: 24
                                    }} source={require('../../assets/instagram.png')} />
                                </TouchableNativeFeedback>


                                <TouchableNativeFeedback>
                                    <Image style={{
                                        width: 24,
                                        height: 24
                                    }} source={require('../../assets/WA.png')} />
                                </TouchableNativeFeedback>


                                <TouchableNativeFeedback>
                                    <Image style={{
                                        width: 24,
                                        height: 24
                                    }} source={require('../../assets/tiktok.png')} />
                                </TouchableNativeFeedback>

                            </View>
                        </View>


                        <View style={{
                            alignItems: 'center',
                            marginTop: 60,
                        }}>
                            <Text style={{ fontFamily: fonts.primary[500], color: colors.primary, textAlign: 'center', fontSize: 12 }}>© <Text style={{ fontFamily: fonts.primary[800] }}> 2024</Text> GENORY. All Right Reserved</Text>
                        </View>

                    </View>
                </View>

            </ImageBackground>
        </View>
    )
}