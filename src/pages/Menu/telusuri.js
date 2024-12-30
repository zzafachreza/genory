import { View, Text, TouchableNativeFeedback, ScrollView, Image, TouchableWithoutFeedback } from 'react-native';
import React, { useEffect, useState } from 'react';
import { MyHeader } from '../../components';
import { Color, colors, fonts } from '../../utils';
import axios from 'axios';
import { apiURL, webURL } from '../../utils/localStorage';
import { FlatList } from 'react-native';

export default function Telusuri({ navigation }) {

  const [data, setData] = useState([]);
  useEffect(() => {
    axios.post(apiURL + 'artikel').then(res => {
      console.log(res.data.filter(i => i.kategori == 'Banner'));

      setData(res.data);
    })
  }, [])
  // Daftar kategori
  const categories = [
    { id: 1, name: 'Latihan', color: Color.blueGray[100] },
    { id: 2, name: 'Latihan', color: Color.blueGray[100] },
    { id: 3, name: 'Latihan', color: Color.blueGray[100] },
    { id: 4, name: 'Latihan', color: Color.blueGray[100] },
    { id: 5, name: 'Latihan', color: Color.blueGray[100] },
  ];

  const rekomendasi = [
    { id: 1, name: 'Menaikkan Berat Badan', color: Color.blueGray[100] },
    { id: 2, name: 'Artikel', color: Color.blueGray[100] },
    { id: 3, name: 'Latihan', color: Color.blueGray[100] },
    { id: 4, name: 'Rekomendasi Makanan Sehat', color: Color.blueGray[100] },
  ];

  // Daftar gambar untuk ditampilkan dalam scroll
  const images = [
    { id: 1, source: require('../../assets/slider1.png') },
    { id: 2, source: require('../../assets/slider2.png') },
    { id: 3, source: require('../../assets/slider1.png') },

  ];

  const fakta_or_mitor = [
    { id: 1, source: require('../../assets/mitos_1.png'), navigateTo: 'FaktaMitos', params: { id: 1 } },
    { id: 2, source: require('../../assets/mitos_2.png'), navigateTo: 'FaktaMitos', params: { id: 2 } },
    { id: 3, source: require('../../assets/mitos_3.png'), navigateTo: 'FaktaMitos', params: { id: 3 } },
    { id: 4, source: require('../../assets/mitos_4.png'), navigateTo: 'FaktaMitos', params: { id: 4 } },

  ];

  const makanan_sehat = [
    { id: 1, source: require('../../assets/makanan_sehat1.png'), navigateTo: 'RekomendasiMakananSehat', params: { id: 1 } },
    { id: 2, source: require('../../assets/makanan_sehat2.png'), navigateTo: 'RekomendasiMakananSehat', params: { id: 2 } },
    { id: 3, source: require('../../assets/makanan_sehat3.png'), navigateTo: 'RekomendasiMakananSehat', params: { id: 3 } },
    { id: 4, source: require('../../assets/makanan_sehat4.png'), navigateTo: 'RekomendasiMakananSehat', params: { id: 4 } },

  ];

  const asupan_kalori = [
    { id: 1, source: require('../../assets/makanan_sehat1.png'), navigateTo: 'AsupanKaloriTambahan', params: { id: 1 } },
    { id: 2, source: require('../../assets/makanan_sehat2.png'), navigateTo: 'AsupanKaloriTambahan', params: { id: 2 } },
    { id: 3, source: require('../../assets/makanan_sehat3.png'), navigateTo: 'AsupanKaloriTambahan', params: { id: 3 } },
    { id: 4, source: require('../../assets/makanan_sehat4.png'), navigateTo: 'AsupanKaloriTambahan', params: { id: 4 } },
  ]

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.white,
      }}
    >
      {/* Header */}
      <View>
        <MyHeader title="Telusuri" />
      </View>

      {/* ScrollView untuk konten */}
      <ScrollView>
        <View
          style={{
            padding: 10,
          }}
        >
          {/* CATEGORY */}
          <View>
            {/* Menghilangkan indikator scroll dengan showsHorizontalScrollIndicator={false} */}
            {/* <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              <View
                style={{
                  flexDirection: 'row',
                }}
              >
                {categories.map((category) => (
                  <TouchableNativeFeedback
                    key={category.id}
                    onPress={() => console.log(`Navigasi ke ${category.name}`)}
                  >
                    <View
                      style={{
                        backgroundColor: category.color,
                        padding: 10,
                        borderRadius: 20,
                        marginRight: 10,
                        alignItems: 'center',

                        width: 83,
                        height: 35
                      }}
                    >
                      <Text
                        style={{
                          color: colors.black,
                          fontSize: 12,
                          fontFamily: fonts.primary[600],
                        }}
                      >
                        {category.name}
                      </Text>
                    </View>
                  </TouchableNativeFeedback>
                ))}
              </View>
            </ScrollView> */}
          </View>

          {/* SCROLL GALLERY (Gambar) */}
          <View style={{ marginTop: 20 }}>
            <FlatList showsHorizontalScrollIndicator={false} horizontal data={data.filter(i => i.kategori == 'Banner')} renderItem={({ item, index }) => {
              return (
                <TouchableWithoutFeedback onPress={() => navigation.navigate('FaktaMitos', item)}>
                  <View
                    // key={item.id_artikel}
                    style={{
                      marginRight: 10,
                      borderRadius: 8,
                      overflow: 'hidden',
                    }}
                  >
                    <Image
                      source={{
                        uri: webURL + item.file_artikel
                      }}
                      style={{
                        width: 353,
                        height: 288,
                        borderRadius: 8,
                      }}
                    />

                  </View>
                </TouchableWithoutFeedback>
              )
            }} />
          </View>


          {/* MITOS ATAU FAKTA */}
          <View style={{
            marginTop: 20,
            padding: 10,
          }}>
            <Text style={{
              fontFamily: fonts.primary[600],
              fontSize: 15,
              color: colors.primary

            }}>Mitos Atau Fakta?</Text>
            <FlatList showsHorizontalScrollIndicator={false} horizontal data={data.filter(i => i.kategori == 'Mitos atau Fakta')} renderItem={({ item, index }) => {
              return (
                <TouchableWithoutFeedback onPress={() => navigation.navigate('FaktaMitos', item)}>
                  <View
                    // key={item.id_artikel}
                    style={{
                      marginRight: 10,
                      borderRadius: 8,
                      overflow: 'hidden',
                    }}
                  >
                    <Image
                      source={{
                        uri: webURL + item.file_artikel
                      }}
                      style={{
                        width: 160,
                        height: 200,
                        borderRadius: 8,
                      }}
                    />
                    <Text style={{
                      width: 160,
                      height: 70,
                      maxWidth: 160,
                      position: 'absolute',
                      bottom: 0,
                      // margin: 4,
                      color: colors.white,
                      padding: 4,
                      backgroundColor: '#00000080'
                    }}>{item.judul}</Text>

                  </View>
                </TouchableWithoutFeedback>
              )
            }} />
          </View>

          {/* MAKANAN SEHAT */}

          <View style={{
            marginTop: 20,
            padding: 10,
          }}>
            <Text style={{
              fontFamily: fonts.primary[600],
              fontSize: 15,
              color: colors.primary

            }}>Rekomendasi{'\n'}
              Makanan Sehat

            </Text>
            <FlatList showsHorizontalScrollIndicator={false} horizontal data={data.filter(i => i.kategori == 'Rekomendasi Makanan Sehat')} renderItem={({ item, index }) => {
              return (
                <TouchableWithoutFeedback onPress={() => navigation.navigate('FaktaMitos', item)}>
                  <View
                    // key={item.id_artikel}
                    style={{
                      marginRight: 10,
                      borderRadius: 8,
                      overflow: 'hidden',
                    }}
                  >
                    <Image
                      source={{
                        uri: webURL + item.file_artikel
                      }}
                      style={{
                        width: 160,
                        height: 200,
                        borderRadius: 8,
                      }}
                    />
                    <Text style={{
                      width: 160,
                      height: 70,
                      maxWidth: 160,
                      position: 'absolute',
                      bottom: 0,
                      // margin: 4,
                      color: colors.white,
                      padding: 4,
                      backgroundColor: '#00000080'
                    }}>{item.judul}</Text>

                  </View>
                </TouchableWithoutFeedback>
              )
            }} />
          </View>


          {/* ASUPAN KALORI TAMBAHAN */}
          <View style={{
            marginTop: 20,
            padding: 10,
          }}>
            <Text style={{
              fontFamily: fonts.primary[600],
              fontSize: 15,
              color: colors.primary

            }}>Asupan Kalori{'\n'}
              Tambahan

            </Text>
            <FlatList showsHorizontalScrollIndicator={false} horizontal data={data.filter(i => i.kategori == 'Asupan Kalori Tambahan')} renderItem={({ item, index }) => {
              return (
                <TouchableWithoutFeedback onPress={() => navigation.navigate('FaktaMitos', item)}>
                  <View
                    // key={item.id_artikel}
                    style={{
                      marginRight: 10,
                      borderRadius: 8,
                      overflow: 'hidden',
                    }}
                  >
                    <Image
                      source={{
                        uri: webURL + item.file_artikel
                      }}
                      style={{
                        width: 160,
                        height: 200,
                        borderRadius: 8,
                      }}
                    />
                    <Text style={{
                      width: 160,
                      height: 70,
                      maxWidth: 160,
                      position: 'absolute',
                      bottom: 0,
                      // margin: 4,
                      color: colors.white,
                      padding: 4,
                      backgroundColor: '#00000080'
                    }}>{item.judul}</Text>

                  </View>
                </TouchableWithoutFeedback>
              )
            }} />
          </View>


          {/* REKOMENDASI */}
          {/* <View style={{
            padding: 10
          }}>


            <Text style={{
              fontFamily: fonts.primary[600],
              fontSize: 15,
              color: colors.primary,

            }}>Rekomendasi</Text>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap'
              }}
            >
              {rekomendasi.map((rekomendasi) => (
                <TouchableNativeFeedback
                  key={rekomendasi.id}
                  onPress={() => console.log(`Navigasi ke ${rekomendasi.name}`)}
                >
                  <View
                    style={{
                      backgroundColor: rekomendasi.color,
                      padding: 10,
                      borderRadius: 20,
                      marginRight: 10,
                      alignItems: 'center',

                      marginTop: 10,

                    }}
                  >
                    <Text
                      style={{
                        color: colors.black,
                        fontSize: 12,
                        fontFamily: fonts.primary[600],
                      }}
                    >
                      {rekomendasi.name}
                    </Text>
                  </View>
                </TouchableNativeFeedback>
              ))}
            </View>

          </View> */}
          <View>

          </View>

        </View>
      </ScrollView>
    </View>
  );
}
