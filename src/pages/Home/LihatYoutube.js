import React, { useState, useEffect } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import YouTubeIframe from 'react-native-youtube-iframe';
import { useNavigation } from '@react-navigation/native';

export default function LihatYoutube({ route }) {
    const item = route.params;
    const navigation = useNavigation();
    const [playing, setPlaying] = useState(true);

    useEffect(() => {
        // Sembunyikan StatusBar untuk tampilan fullscreen
        StatusBar.setHidden(true);
        return () => StatusBar.setHidden(false); // Kembalikan StatusBar saat keluar
    }, []);

    return (
        <View style={styles.container}>
            <YouTubeIframe
                height={'100%'}
                width={'100%'}
                videoId={item.youtube}
                play={playing}
                webViewProps={{
                    allowsFullscreenVideo: true, // Pastikan bisa fullscreen
                    scalesPageToFit: true,
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000', // Warna hitam agar fullscreen lebih baik
    },
});
