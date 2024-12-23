import { View, Text, TouchableNativeFeedback, ScrollView, Image, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors, fonts } from '../../utils';
import { MyHeader } from '../../components';
import { Icon } from 'react-native-elements';

export default function ProgramPertama({ navigation, route }) {
  const { week } = route.params || { week: 1 }; // Default ke minggu pertama jika tidak ada parameter
  const [currentWeek, setCurrentWeek] = useState(1);
  const [userInput, setUserInput] = useState(''); // State untuk menyimpan teks yang diketik pengguna
  const [videoWatched, setVideoWatched] = useState(false); // State to track video watched status
  const [currentContent, setCurrentContent] = useState('Default Content'); // State untuk elemen yang berubah

  useEffect(() => {
    // Atur minggu sesuai parameter yang diterima
    setCurrentWeek(week);
  }, [week]);

  useEffect(() => {
    if (route.params?.videoWatched) {
      setVideoWatched(true); // Set video watched to true if passed from VideoLatihan screen
    }
  }, [route.params?.videoWatched]);

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

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <View style={{
        padding:10,
        backgroundColor:colors.primary,
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
      }}>

      <View style={{
        flexDirection:'row',
        justifyContent:"center",
        alignItems:'center',
        padding:10
      }}>

      <View style={{
        left: -70
      }}>
      <TouchableNativeFeedback onPress={() => navigation.goBack()}>
      <Icon type='ionicon' name='arrow-back-outline' size={25} color='white'/>
      </TouchableNativeFeedback>
      </View>

      <View style={{}}>
        <Text style={{
          fontFamily:fonts.primary[600],
          fontSize:25,
          color:colors.white,
          textAlign:"center"
        }}>{currentWeek} Minggu</Text>

        <Text style={{
          fontFamily:fonts.primary[600],
          color:colors.white,
          fontSize:15,
          textAlign:"center"

        }}>Bersama Genory</Text>
      </View>

      </View>
      </View>

      <ScrollView>
        <View style={{ padding: 10 }}>
          <TouchableNativeFeedback onPress={() => navigation.navigate('PengingatProgram')}>
            <View
              style={{
                padding: 10,
                backgroundColor: colors.primary,
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
              color: colors.primary,
            }}
          >
            Tahapan
          </Text>

          {/* Kalendar Tahapan */}
          <View style={{}}>
            <View style={{ flexDirection: 'row', alignItems:'center', justifyContent:"flex-start"}}>
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
                        backgroundColor: colors.primary,
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
                  const isToday = dayAbsolute === currentDayNumber; // Check if the day is today
                  const backgroundColor = isToday
                    ? videoWatched
                      ? colors.secondary
                      : colors.primary
                    : '#E9E9E9'; // Background color
                  const textColor = isToday
                    ? videoWatched
                      ? colors.primary
                      : colors.white
                    : colors.white; // Text color

                  return (
                    <View
                      key={day}
                      style={{
                        padding: 10,
                        backgroundColor: backgroundColor,
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
                        height:62
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: fonts.primary[600],
                          fontSize: 10,
                          color: textColor,
                        }}
                      >
                        Hari
                      </Text>

                      {/* Render nomor hari */}
                      <Text
                        style={{
                          fontFamily: fonts.primary[600],
                          fontSize: 20,
                          color: textColor,
                          textAlign: 'center',
                        }}
                      >
                        {day}
                      </Text>
                    </View>
                  );
                })}
                {currentWeek === 1 && (
                  <TouchableNativeFeedback onPress={() => setCurrentWeek(2)}>
                    <View
                      style={{
                        height: 61, // Ukuran tombol Minggu ke 2
                        width: 70, // Lebar tombol diatur secara independen
                        backgroundColor: colors.primary,
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
                        left:-10
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
          <TouchableNativeFeedback onPress={() => navigation.navigate("VideoLatihan")}>
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
          </TouchableNativeFeedback>
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
                  borderColor: colors.primary,
                  marginTop: 20,
                  margin:10
                }}
              >
                <View
                  style={{
                    padding: 10,
                    backgroundColor: colors.primary,
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
                      color: colors.primary,
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
                  <TouchableNativeFeedback>
                    <View
                      style={{
                        padding: 10,
                        backgroundColor: colors.primary,
                        borderRadius: 100,
                        width: 40,
                        height: 40,
                      }}
                    >
                      <Icon
                        style={{ left: 1, top: -2 }}
                        type="ionicon"
                        name="create-outline"
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
                  borderColor: colors.primary,
                  marginTop: 20,
                  margin:10
                }}
              >
                <View
                  style={{
                    padding: 10,
                    backgroundColor: colors.primary,
                    borderRadius: 30,
                    zIndex: 0,
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
                      color: colors.primary,
                    }}
                  >
                    Perjalanan Kamu
                  </Text>
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
                    onPress={() =>
                      navigation.navigate('UpdateBeratBadan', {
                        currentDay: currentDayNumber,
                      })
                    }
                  >
                    <View
                      style={{
                        padding: 10,
                        backgroundColor: colors.primary,
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
                padding:10,
              }}>

              <View>

                <Text style={{
                  fontFamily:fonts.primary[600],
                  fontSize:15,
                  color:colors.primary
                }}>Produk Genory</Text>

                <View style={{
                  padding:10,
                  borderWidth:1,
                  borderColor:colors.primary,
                  borderRadius:10,
                  flexDirection:'row',
                  justifyContent:'space-between',
                  alignItems:'center'

                }}>

                {/* PRODUK */}
                <View>
                  <Image style={{
                    width:144,
                    height:142
                  }} source={require('../../assets/produk_genory.png')}/>
                </View>

                  <View style={{
                    marginTop:30
                  }}>
                    {/* JUDUL */}

                    <View>
                      <Text style={{fontFamily:fonts.primary[600], fontSize:11, color:colors.primary}}>Genory Susu Penggemuk{'\n'}
                      Badan Rasa Coklat</Text>
                    </View>

                    {/* RATE */}

                    <View>
                      <Text style={{fontFamily:fonts.primary[400], fontSize:10}}>⭐ 4,8</Text>
                    </View>

                    {/* Harga */}
                    <View style={{
                    
                    }}>
                    <Text style={{
                      fontFamily:fonts.primary[600],
                      color:colors.danger,
                      fontSize:15,

                    }}>Rp 168.000</Text>
                    </View>


                    <View style={{
                      flexDirection:"row",
                      justifyContent:'flex-end',
                      alignItems:'center',
                      marginTop:30
                    }}>
                      <View>
                      <TouchableNativeFeedback>
                        <View style={{
                          padding:10,
                          backgroundColor:colors.primary,
                          borderRadius:10,
                          flexDirection:"row",
                          alignItems:"center",
                          justifyContent:'space-between',
                          height:40
                        }}>
                        
                        <Icon type='ionicon' name='cart-outline' size={20} color='white'/>
                        <Text style={{
                          fontFamily:fonts.primary[400],
                          fontSize:10,
                          color:colors.white
                        }}>Beli Sekarang</Text>
                        </View>
                      </TouchableNativeFeedback>
                      </View>
                    </View>
                  </View>
                </View>

              </View>

              </View>
            </>
          )}
        </View>

      </ScrollView>
    </View>
  );
}