import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { colors, fonts, windowWidth } from '../../utils'
import { MyHeader } from '../../components';
import { Image } from 'react-native';
import { webURL } from '../../utils/localStorage';
import RenderHTML from 'react-native-render-html';

export default function FaktaMitos({ navigation, route }) {
    const item = route.params;

    const systemFonts = [fonts.body3.fontFamily, fonts.headline4.fontFamily];

    return (
        <View style={{
            flex: 1,
            backgroundColor: colors.white
        }}>

            <View>
                <MyHeader title={route.params.kategori} />
            </View>
            <ScrollView style={{
                padding: 10,
            }}>
                <Text style={{
                    ...fonts.headline3,
                    color: colors.black,
                    marginBottom: 10,
                }}>{item.judul}</Text>
                <Image
                    source={{
                        uri: webURL + item.file_artikel
                    }}
                    style={{
                        width: '100%',
                        height: 200,
                        borderRadius: 10,
                        alignSelf: 'center',
                    }}
                />
                <RenderHTML

                    tagsStyles={{
                        p: {
                            fontFamily: fonts.body3.fontFamily,
                            textAlign: 'justify',
                            lineHeight: 26,
                        },
                    }}
                    systemFonts={systemFonts}
                    contentWidth={windowWidth}
                    source={{
                        html: item.konten
                    }}
                />
            </ScrollView>

        </View>
    )
}