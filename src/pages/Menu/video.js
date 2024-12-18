import { View, Text, ScrollView, TouchableNativeFeedback, Alert } from 'react-native'
import React from 'react'
import { colors, fonts } from '../../utils'
import { MyHeader } from '../../components'
import YouTubeIframe from 'react-native-youtube-iframe'

export default function VideoLatihan({ navigation }) {

    const nontonVideo = () => {
        Alert.alert(
            "Konfirmasi",
            "Apakah kamu yakin ingin melanjutkan?",
            [
              {
                text: "Tidak",
                onPress: () => console.log("Tidak dipilih"),
                style: "cancel"
              },
              {
                text: "Oke",
                onPress: () => navigation.navigate("ProgramPertama", { videoWatched: true }) // Pass video watched state
              }
            ]
          );
    }

  return (
    <View style={{
        flex: 1,
        backgroundColor: colors.white
    }}>

    <View>
        <MyHeader title="Judul Olahraga"/>
    </View>

    <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
        <View style={{ marginTop: 20, width: '100%', justifyContent: 'center', alignItems: 'center', padding: 10 }}>
            {/* YouTube Player */}
            <YouTubeIframe
                height={300}
                width={"100%"}
                videoId="XtFUovn_VBo"
                play={false}
                onChangeState={event => console.log(event)}
                onReady={event => console.log("Video is ready")}
            />
        </View>
    </ScrollView>

    <View style={{
        padding: 10,
        marginBottom: 10,
    }}>
        <TouchableNativeFeedback onPress={nontonVideo}>
            <View style={{
                padding: 10,
                backgroundColor: colors.primary,
                borderRadius: 30,
            }}> 
                <Text style={{
                    fontFamily: fonts.primary[600],
                    fontSize: 15,
                    textAlign: "center",
                    color: colors.white
                }}>Sudah Menonton Video</Text>
            </View>
        </TouchableNativeFeedback>
    </View>

    </View>
  )
}
