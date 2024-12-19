import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { colors, fonts } from '../../utils'
import { MyHeader } from '../../components';
import { Image } from 'react-native';

export default function RekomendasiMakanan({navigation, route}) {
    const { id } = route.params; // Mendapatkan ID dari navigasi

    const RekomendasiMakanan = [
        {
          id: 1,
          title: 'Rekomendasi Makanan Sehat 1',
          description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
          image: require('../../assets/makanan_sehat1.png'),
        },
        {
          id: 2,
          title: 'Rekomendasi Makanan Sehat 2',
          description: 'Rekomendasi Makanan Sehat 2',
          image: require('../../assets/makanan_sehat2.png'),
        },
        {
          id: 3,
          title: 'Rekomendasi Makanan Sehat 3',
          description: 'Rekomendasi Makanan Sehat 3',
          image: require('../../assets/makanan_sehat3.png'),
        },
        {
          id: 4,
          title: 'Rekomendasi Makanan Sehat 4',
          description: 'Rekomendasi Makanan Sehat 4',
          image: require('../../assets/makanan_sehat4.png'),
        },
      ];

      const selectedItem = RekomendasiMakanan.find((item) => item.id === id);

  return (
    <View style={{
        flex:1,
        backgroundColor:colors.white
    }}>

    <View>
        <MyHeader title="Rekomendasi Makanan Sehat"/>
    </View>
     <ScrollView>
        {selectedItem ? (
            <>
                <View style={{
                    padding:10,
                }}>

                <Text style={{
                    fontFamily:fonts.primary[600],
                    fontSize:18,
                    textAlign:"center",
                    color:colors.primary
                }}>
                    {selectedItem.title}
                </Text>

                <View style={{
                    alignItems:'center'
                }}>
                    <Image style={{
                        width:288,
                        height:194,
                        borderRadius:10
                    }} source={selectedItem.image}/>
                </View>

                <View style={{
                    padding:10
                }}>
                    <Text style={{
                        fontFamily:fonts.primary[500],
                        fontSize:12,
                        color:colors.primary,
                        textAlign:"justify"
                    }}>{selectedItem.description}</Text>
                </View>

                </View>
            </>
        ) : (
            <Text>id tidak di temukan...</Text>
        )}
     </ScrollView>
    </View>
  )
}