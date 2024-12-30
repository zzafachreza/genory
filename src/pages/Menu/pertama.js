import { View, Text, TouchableNativeFeedback, ScrollView, Image, TextInput, Alert, FlatList, Linking } from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors, fonts, windowWidth } from '../../utils';
import { MyHeader } from '../../components';
import { Icon } from 'react-native-elements';
import { apiURL, getData, storeData, webURL } from '../../utils/localStorage';
import { Toast, useToast } from 'react-native-toast-notifications';
import axios from 'axios';
import Carousel from 'react-native-snap-carousel';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import MyLoading from '../../components/MyLoading';
import 'intl';
import 'intl/locale-data/jsonp/en';
import { useIsFocused } from '@react-navigation/native';
import moment from 'moment';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

export default function ProgramPertama({ navigation, route }) {
  const week = route.params.week; // Default ke minggu pertama jika tidak ada parameter
  const [currentWeek, setCurrentWeek] = useState(route.params.week);
  const [userInput, setUserInput] = useState(''); // State untuk menyimpan teks yang diketik pengguna
  const [videoWatched, setVideoWatched] = useState(false); // State to track video watched status
  const [currentContent, setCurrentContent] = useState('Default Content'); // State untuk elemen yang berubah
  const [mulai, setMulai] = useState('');
  const [user, setUser] = useState({});
  const toast = useToast();
  const [loading, setLoading] = useState(true);

  const __getVideo = () => {
    getData('user').then(u => {
      setUser(u);
      axios.post(apiURL + 'youtube', {
        fid_pengguna: u.id_pengguna
      }).then(res => {

        setTimeout(() => {
          setLoading(false);
          getData('mulai').then(ml => {
            if (ml) {

              setMulai(ml);
              let ARR = [];
              for (let index = 1; index <= 14; index++) {
                ARR.push({
                  minggu: index <= 7 ? 'Pertama' : 'Kedua',
                  hari: index,
                  tanggal: moment(ml).add(index - 1, 'day').format('YYYY-MM-DD'),
                })
              }
              setCekTanggal(ARR);

              let arr = ARR.filter(i => i.tanggal == moment().format('YYYY-MM-DD'))[0];

              let videoPilih = res.data.filter(i => i.hari == arr.hari);
              setFilter(videoPilih);
              setYotube(res.data);

            } else {
              setYotube(res.data);
            }
          })
        }, 1000);
      })
    });

  }

  const [produk, setProduk] = useState([]);
  const __getProduk = () => {
    axios.post(apiURL + 'produk').then(res => {
      // console.log('produk', res.data)
      setProduk(res.data);
      setTimeout(() => {
        setLoading(false)
      }, 500);
    })

  }
  const isFocus = useIsFocused();
  const [youtube, setYotube] = useState([]);
  const [filter, setFilter] = useState([]);
  const [cekTanggal, setCekTanggal] = useState([]);



  const filterVideo = (filterTanggal = moment().format('YYYY-MM-DD')) => {
    let arr = [...cekTanggal].filter(i => i.tanggal == filterTanggal)[0];
    console.log('filter', arr);
    let videoPilih = youtube.filter(i => i.hari == arr.hari);
    setFilter(videoPilih);
  }


  const [grafik, setGrafik] = useState({
    label: [0],
    value: [0]
  })
  const __getIMT = () => {
    getData('user').then(u => {
      axios.post(apiURL + 'imt_saya', {
        fid_pengguna: u.id_pengguna,
      }).then(res => {
        console.log(res.data)
        if (res.data.length > 0) {
          let lb = [];
          let vl = [];
          console.log(res.data);
          res.data.map((i, index) => {
            lb.push(index + 1);
            vl.push(parseFloat(i.imt));
          });



          setGrafik({
            label: lb,
            value: vl
          })
        }
      })
    })
  }

  useEffect(() => {
    __getProduk();





    getData('plan').then(p => {
      if (!p) {
        setUserInput('');
      } else {
        setUserInput(p)
      }
    })

    if (isFocus) {
      __getIMT();


      __getVideo();

    }

    // Atur minggu sesuai parameter yang diterima

  }, [isFocus]);



  // Fungsi untuk mengganti konten berdasarkan minggu
  const handleWeekChange = (week) => {
    setCurrentWeek(week);
    setCurrentContent(week === 1 ? 'Konten untuk Minggu Pertama' : 'Konten untuk Minggu Kedua');
  };

  const days = currentWeek === 1
    ? Array.from({ length: 7 }, (_, i) => i + 1) // Days 1-7 for Week 1
    : Array.from({ length: 7 }, (_, i) => i + 8); // Days 8-14 for Week 2

  const today = new Date(); // Get today's date
  const startDate = new Date(today.getFullYear(), today.getMonth(), 17); // Starting date (e.g., 17th)
  const currentDayNumber = Math.ceil(
    (today - startDate) / (1000 * 60 * 60 * 24)
  ); // Calculate the current day number relative to startDate

  const handlePengingatClick = () => {
    const startDay = currentWeek === 1 ? 1 : 8;
    const endDay = currentWeek === 1 ? 7 : 14;
    navigation.navigate('PengingatProgram', { startDay, endDay, currentWeek });
  };


  const _renderItem = ({ item, index }) => {
    return (

      <TouchableWithoutFeedback onPress={() => navigation.navigate('VideoLatihan', {
        ...item,
        index: index + 1,
      })}>
        <View style={{
          // marginBottom: 10,
          width: 300,
          height: 190,
          // borderWidth: 1,
          overflow: 'hidden',
          borderRadius: 10,
        }}>
          <Image style={{
            width: 300,
            height: 190,
            // borderRadius: 10,
          }} source={{
            uri: `https://i.ytimg.com/vi/${item.youtube}/hq720.jpg`
          }} />
          {item.cek == 0 &&

            <View style={{
              width: 300,
              padding: 10,
              backgroundColor: user.tipe == 'Gain' ? colors.primary : colors.secondary,
              position: 'absolute',
              bottom: 0,
            }}>
              {/* <Text>Minggu Ke {item.minggu}</Text> */}
              <Text style={{
                color: colors.white,
                ...fonts.subheadline3
              }}>Hari Ke {item.hari} & Video {index + 1}</Text>

            </View>
          }
          {item.cek > 0 &&
            <View style={{
              width: 300,
              padding: 10,
              backgroundColor: colors.success,
              position: 'absolute',
              bottom: 0,
              flexDirection: 'row'
            }}>
              {/* <Text>Minggu Ke {item.minggu}</Text> */}
              <Text style={{
                flex: 1,
                color: colors.white,
                ...fonts.headline5
              }}>Sudah di tonton</Text>
              <Icon type='ionicon' name='checkmark-circle' color={colors.white} />

            </View>

          }
        </View>
      </TouchableWithoutFeedback >

    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <MyHeader title={`${currentWeek} Minggu Bersama Genory `} />

      <ScrollView>

        {/* pengingat */}
        <View style={{ padding: 10 }}>
          <TouchableNativeFeedback onPress={handlePengingatClick}>
            <View
              style={{
                padding: 10,
                backgroundColor: user.tipe == 'Gain' ? colors.primary : colors.secondary,
                flexDirection: 'row',
                borderRadius: 30,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Icon type="ionicon" name="alarm-outline" size={25} color="white" />
              <Text
                style={{
                  fontFamily: fonts.primary[600],
                  fontSize: 15,
                  color: colors.white,
                  marginLeft: 10,
                }}>
                Pengingat
              </Text>
            </View>
          </TouchableNativeFeedback>
        </View>

        {/* Tahapan Header */}
        <View style={{ padding: 10, }}>
          <Text
            style={{
              fontFamily: fonts.primary[600],
              fontSize: 20,
              color: user.tipe == 'Gain' ? colors.primary : colors.secondary,
            }}
          >
            Tahapan
          </Text>
          {mulai.length > 0 && <Text style={{ fontSize: 11, fontFamily: fonts.primary[400] }}>{moment(mulai).format('DD MMM YYYY') + ' - ' + moment(mulai).add(13, 'day').format('DD MMM YYYY')}</Text>}
          {/* Kalendar Tahapan */}
          <View style={{}}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "flex-start" }}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ marginTop: 10 }}
              >
                {currentWeek === 2 && (
                  <TouchableNativeFeedback onPress={() => setCurrentWeek(1)}>
                    <View
                      style={{
                        height: 61, // Ukuran tombol Minggu ke 1
                        width: 70, // Lebar tombol diatur secara independen
                        backgroundColor: user.tipe == 'Gain' ? colors.primary : colors.secondary,
                        borderRadius: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                        elevation: 5,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        marginRight: 10, // Posisikan tombol ke kanan
                        zIndex: 10, // Pastikan tombol berada di depan
                        display: 'flex', // Pastikan tombol dapat ditampilkan
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: fonts.primary[600],
                          fontSize: 12,
                          color: colors.white,
                          textAlign: 'center',
                        }}
                      >
                        Minggu{'\n'}
                        ke{'\n'}
                        1
                      </Text>
                    </View>
                  </TouchableNativeFeedback>
                )}
                {days.map((day) => {
                  const dayAbsolute = currentWeek === 1 ? day : day + 7; // Map day to absolute day
                  const MYBACK = user.tipe == 'Gain' ? colors.primary : colors.secondary;
                  let TANGGAL = moment(mulai).add(day - 1, 'day').format('DD/MM/YY');
                  let TANGGAL_DATA = moment(mulai).add(day - 1, 'day').format('YYYY-MM-DD');
                  return (
                    <TouchableWithoutFeedback onPress={() => {
                      if (moment().format('YYYY-MM-DD') >= moment(TANGGAL_DATA).format('YYYY-MM-DD')) {
                        filterVideo(TANGGAL_DATA);
                      } else {
                        toast.show(`Maaf hari ke ${day} belum bisa di akses !`)
                      }

                    }}>
                      <View
                        key={day}
                        style={{
                          padding: 10,
                          backgroundColor: moment().format('YYYY-MM-DD') >= moment(TANGGAL_DATA).format('YYYY-MM-DD') ? MYBACK : colors.border,
                          borderRadius: 10,
                          marginRight: 10,
                          alignItems: 'center',
                          width: 42,
                          marginBottom: 10, // Add space for better visibility
                          // Shadow properties
                          elevation: 8, // Android shadow
                          shadowColor: '#000', // iOS shadow color
                          shadowOffset: { width: 0, height: 4 }, // iOS shadow offset
                          shadowOpacity: 0.3, // iOS shadow opacity
                          shadowRadius: 4.65, // iOS shadow radius
                          zIndex: 1, // Ensure it's above other element,
                          height: 62
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: fonts.primary[600],
                            fontSize: 10,
                            color: colors.white,
                          }}
                        >
                          Hari
                        </Text>

                        {/* Render nomor hari */}
                        <Text
                          style={{
                            fontFamily: fonts.primary[600],
                            fontSize: 20,
                            color: colors.white,
                            textAlign: 'center',
                          }}
                        >
                          {day}
                        </Text>
                        <Text style={{
                          fontSize: 5,
                          position: 'absolute',
                          bottom: 0,
                          fontFamily: fonts.primary[400],
                          color: colors.white
                        }}>{TANGGAL}</Text>
                      </View>
                    </TouchableWithoutFeedback>
                  );
                })}
                {currentWeek === 1 && (
                  <TouchableNativeFeedback onPress={() => setCurrentWeek(2)}>
                    <View
                      style={{
                        height: 61, // Ukuran tombol Minggu ke 2
                        width: 70, // Lebar tombol diatur secara independen
                        backgroundColor: user.tipe == 'Gain' ? colors.primary : colors.secondary,
                        borderRadius: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                        elevation: 5,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        marginLeft: 10, // Posisikan tombol ke kiri
                        zIndex: 10, // Pastikan tombol berada di depan
                        display: 'flex', // Pastikan tombol dapat ditampilkan
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: fonts.primary[600],
                          fontSize: 12,
                          color: colors.white,
                          textAlign: 'center',
                        }}
                      >
                        Minggu{'\n'}
                        ke{'\n'}
                        2
                      </Text>
                    </View>
                  </TouchableNativeFeedback>
                )}
              </ScrollView>
            </View>
          </View>
        </View>

        {/* VIDEO */}
        <View>
          {/* <TouchableNativeFeedback onPress={() => navigation.navigate("VideoLatihan")}>
            <View
              style={{
                alignItems: 'center',
                padding: 20,
              }}
            >
              <Image
                style={{
                  width: 350,
                  height: 200,
                }}
                source={require('../../assets/thumbnail_video.png')}
              />
            </View>
          </TouchableNativeFeedback> */}

          {loading && <MyLoading />}
          {!loading && <Carousel
            autoplay
            layoutCardOffset={0}
            // ref={(c) => { this._carousel = c; }}
            data={cekTanggal.length > 0 ? filter : youtube.filter(i => i.minggu == 'Pertama' && i.hari == 1)}
            renderItem={_renderItem}
            sliderWidth={windowWidth}
            itemWidth={300}
          />}
        </View>

        {/* Konten Dinamis Berdasarkan Minggu */}
        <View>
          {currentWeek === 1 ? (
            // Konten untuk Minggu Pertama
            <>
              {/* Rencana */}
              <View
                style={{
                  padding: 10,
                  borderWidth: 2,
                  borderRadius: 10,
                  borderColor: user.tipe == 'Gain' ? colors.primary : colors.secondary,
                  marginTop: 20,
                  margin: 10
                }}
              >
                <View
                  style={{
                    padding: 10,
                    backgroundColor: user.tipe == 'Gain' ? colors.primary : colors.secondary,
                    borderRadius: 30,
                    zIndex: 2,
                    marginTop: -30,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: fonts.primary[600],
                      fontSize: 15,
                      textAlign: 'center',
                      color: colors.white,
                    }}
                  >
                    Rencana
                  </Text>
                </View>

                <View style={{ marginTop: 10 }}>
                  <Text
                    style={{
                      fontFamily: fonts.primary[500],
                      fontSize: 15,
                      color: user.tipe == 'Gain' ? colors.primary : colors.secondary,
                    }}
                  >
                    • Minggu Pertama
                  </Text>
                </View>

                {/* TEXT AREA */}
                <View style={{ marginTop: 10 }}>
                  <TextInput
                    style={{
                      height: 150,
                      textAlignVertical: 'top', // Teks dimulai dari atas
                      borderRadius: 10,
                      padding: 10,
                      fontFamily: fonts.primary[400],
                      fontSize: 12,
                      color: colors.black,
                      backgroundColor: '#F7F7F7',
                    }}
                    multiline
                    placeholder="Belum ada rencana"
                    placeholderTextColor="#aaa"
                    value={userInput}
                    onChangeText={setUserInput}
                  />
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    padding: 10,
                    marginTop: 10,
                  }}
                >
                  <TouchableNativeFeedback onPress={() => {
                    storeData('mulai', moment().format('2024-12-30'))
                    storeData('plan', userInput);
                    toast.show('Rencana berhasil disimpan !', {
                      type: 'success'
                    })

                  }}>
                    <View
                      style={{
                        padding: 10,
                        backgroundColor: user.tipe == 'Gain' ? colors.primary : colors.secondary,
                        borderRadius: 100,
                        width: 40,
                        height: 40,
                      }}
                    >
                      <Icon
                        style={{ left: 1, top: -2 }}
                        type="ionicon"
                        name="checkmark-outline"
                        size={20}
                        color={colors.white}
                      />
                    </View>
                  </TouchableNativeFeedback>
                </View>
              </View>

              {/* Update Berat Badan */}
              <View
                style={{
                  padding: 10,
                  borderWidth: 2,
                  borderRadius: 10,
                  borderColor: user.tipe == 'Gain' ? colors.primary : colors.secondary,
                  marginTop: 20,
                  margin: 10
                }}
              >
                <View
                  style={{
                    padding: 10,
                    backgroundColor: user.tipe == 'Gain' ? colors.primary : colors.secondary,
                    borderRadius: 30,
                    zIndex: 2,
                    marginTop: -30,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: fonts.primary[600],
                      fontSize: 15,
                      textAlign: 'center',
                      color: colors.white,
                    }}
                  >
                    Update Berat Badan
                  </Text>
                </View>

                <View style={{ marginTop: 10 }}>
                  <Text
                    style={{
                      fontFamily: fonts.primary[500],
                      fontSize: 15,
                      color: user.tipe == 'Gain' ? colors.primary : colors.secondary,
                    }}
                  >
                    Perjalanan Kamu
                  </Text>

                  <LineChart
                    data={{
                      labels: grafik.label,
                      datasets: [
                        {
                          data: grafik.value
                        }
                      ]
                    }}
                    width={windowWidth / 1.15} // from react-native
                    height={220}
                    yAxisLabel=""
                    yAxisSuffix=""
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={{

                      backgroundColor: user.tipe == 'Gain' ? colors.primary : colors.secondary,
                      backgroundGradientFrom: user.tipe == 'Gain' ? colors.primary : colors.secondary,
                      backgroundGradientTo: user.tipe == 'Gain' ? colors.primary : colors.secondary,
                      decimalPlaces: 2, // optional, defaults to 2dp
                      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                      style: {
                        borderRadius: 16,
                        fontSize: 9,
                      },
                      propsForDots: {
                        r: "5",
                        strokeWidth: "2",
                        stroke: "#ffa726",
                        strokeDasharray: [0, 2]
                      }
                    }}
                    bezier
                    style={{
                      marginVertical: 8,
                      borderRadius: 16
                    }}
                  />
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    padding: 10,
                    marginTop: 10,
                  }}
                >
                  <TouchableNativeFeedback
                    onPress={() => {

                      getData('mulai').then(ml => {
                        if (!ml) {

                          toast.show('Silahkan tonton video terlebih dahulu agar dapat mengisi data ini', {
                            type: 'warning'
                          })

                        } else {

                          let ARR = [];
                          for (let index = 1; index <= 14; index++) {
                            ARR.push({
                              minggu: index <= 7 ? 'Pertama' : 'Kedua',
                              hari: index,
                              tanggal: moment(ml).add(index - 1, 'day').format('YYYY-MM-DD'),
                            })
                          }
                          let arr = ARR.filter(i => i.tanggal == moment().format('YYYY-MM-DD'))[0];


                          navigation.navigate('UpdateBeratBadan', {
                            currentDay: arr.hari,
                          })
                        }
                      })

                    }}
                  >
                    <View
                      style={{
                        padding: 10,
                        backgroundColor: user.tipe == 'Gain' ? colors.primary : colors.secondary,
                        borderRadius: 100,
                        width: 40,
                        height: 40,
                      }}
                    >
                      <Icon
                        style={{ left: 1, top: -2 }}
                        type="ionicon"
                        name="add-outline"
                        size={20}
                        color={colors.white}
                      />
                    </View>
                  </TouchableNativeFeedback>
                </View>
              </View>
            </>
          ) : (
            // Konten untuk Minggu Kedua
            <>

              <View style={{
                padding: 10,
              }}>

                <View>

                  <Text style={{
                    fontFamily: fonts.primary[600],
                    fontSize: 15,
                    color: user.tipe == 'Gain' ? colors.primary : colors.secondary,
                  }}>Produk Genory</Text>

                  <FlatList data={produk} renderItem={({ item, index }) => {
                    return (
                      <View style={{
                        marginBottom: 4,
                        padding: 10,
                        borderWidth: 1,
                        borderColor: user.tipe == 'Gain' ? colors.primary : colors.secondary,
                        borderRadius: 10,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'

                      }}>

                        {/* PRODUK */}
                        <View>
                          <Image style={{
                            width: 144,
                            height: 142
                          }} source={{
                            uri: webURL + item.file_produk
                          }} />
                        </View>

                        <View style={{
                          marginTop: 30
                        }}>
                          {/* JUDUL */}

                          <View>
                            <Text style={{ fontFamily: fonts.primary[600], fontSize: 11, color: user.tipe == 'Gain' ? colors.primary : colors.secondary, }}>Genory Susu Penggemuk{'\n'}
                              {item.nama_produk}</Text>
                          </View>

                          {/* RATE */}

                          <View>
                            <Text style={{ fontFamily: fonts.primary[400], fontSize: 10 }}>⭐ {item.rating}</Text>
                          </View>

                          {/* Harga */}
                          <View style={{

                          }}>
                            <Text style={{
                              fontFamily: fonts.primary[600],
                              color: colors.danger,
                              fontSize: 15,

                            }}>Rp {new Intl.NumberFormat().format(item.harga)}</Text>
                          </View>


                          <View style={{
                            flexDirection: "row",
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            marginTop: 30
                          }}>
                            <View>
                              <TouchableNativeFeedback onPress={() => Linking.openURL(item.link_olshop)}>
                                <View style={{
                                  padding: 10,
                                  backgroundColor: user.tipe == 'Gain' ? colors.primary : colors.secondary,
                                  borderRadius: 10,
                                  flexDirection: "row",
                                  alignItems: "center",
                                  justifyContent: 'space-between',
                                  // height: 40
                                }}>

                                  <Icon type='ionicon' name='cart-outline' size={20} color='white' />
                                  <Text style={{
                                    left: 5,
                                    fontFamily: fonts.primary[400],
                                    fontSize: 10,
                                    color: colors.white
                                  }}>Beli Sekarang</Text>
                                </View>
                              </TouchableNativeFeedback>
                            </View>
                          </View>
                        </View>
                      </View>

                    )
                  }} />
                </View>

              </View>
            </>
          )}
        </View>

      </ScrollView>
    </View>
  );
}