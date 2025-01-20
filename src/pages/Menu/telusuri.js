import { View, Text, TouchableNativeFeedback, ScrollView, Image, TouchableWithoutFeedback } from 'react-native';
import React, { useEffect, useState } from 'react';
import { MyHeader } from '../../components';
import { Color, colors, fonts, windowWidth } from '../../utils';
import axios from 'axios';
import { apiURL, getData, webURL } from '../../utils/localStorage';
import { FlatList } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

export default function Telusuri({ navigation }) {

  const [data, setData] = useState([]);
  const isFocus = useIsFocused();
  const [user, setUser] = useState({});
  useEffect(() => {
    if (isFocus) {
      getData('user').then(u => {
        setUser(u);
        axios.post(apiURL + 'artikel', {
          tipe: u.tipe
        }).then(res => {
          console.log(res.data.filter(i => i.kategori == 'Banner'));

          setData(res.data);
        })
      })
    }
  }, [isFocus])
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
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
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
            </ScrollView>
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
                        width: windowWidth - 20,
                        resizeMode: 'contain',
                        height: 250,
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
              color: user.tipe == 'Gain' ? colors.primary : colors.secondary

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
              color: user.tipe == 'Gain' ? colors.primary : colors.secondary

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
              color: user.tipe == 'Gain' ? colors.primary : colors.secondary

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
          <View style={{
            padding: 10
          }}>


            <Text style={{
              fontFamily: fonts.primary[600],
              fontSize: 15,
              color: user.tipe == 'Gain' ? colors.primary : colors.secondary

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

          </View>
          <View>

          </View>

        </View>
      </ScrollView>
    </View>
  );
}
