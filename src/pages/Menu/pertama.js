import { View, Text, TouchableNativeFeedback, ScrollView, Image, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors, fonts } from '../../utils';
import { MyHeader } from '../../components';
import { Icon } from 'react-native-elements';

export default function ProgramPertama({ navigation, route }) {
  const [currentWeek, setCurrentWeek] = useState(1);
  const [userInput, setUserInput] = useState(''); // State untuk menyimpan teks yang diketik pengguna
  const [videoWatched, setVideoWatched] = useState(false); // State to track video watched status

  useEffect(() => {
    if (route.params?.videoWatched) {
      setVideoWatched(true); // Set video watched to true if passed from VideoLatihan screen
    }
  }, [route.params?.videoWatched]);


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
      <View>
        <MyHeader title={`${currentWeek} Minggu Bersama Genory`} />
      </View>

      <ScrollView>
        <View style={{ padding: 10 }}>
          <TouchableNativeFeedback>
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
                }}
              >
                Pengingat
              </Text>
            </View>
          </TouchableNativeFeedback>
        </View>

        {/* Tahapan Header */}
        <View style={{ padding: 10 }}>
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
          <View style={{ flexDirection: 'row' }}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ marginTop: 10 }}
            >
              {days.map((day) => {
                const dayAbsolute = currentWeek === 1 ? day : day + 7; // Map day to absolute day
                const isToday = dayAbsolute === currentDayNumber; // Check if the day is today
                const backgroundColor = isToday ? (videoWatched ? colors.secondary : colors.primary) : '#E9E9E9'; // Background color
                const textColor = isToday ? (videoWatched ? colors.primary : colors.white) : colors.white; // Text color

                return (
                  <View
                    key={day}
                    style={{
                      padding: 10,
                      backgroundColor: backgroundColor,
                      borderRadius: 10,
                      marginRight: 10,
                      alignItems: 'center',
                      width: 50,
                      borderWidth: 0.8,
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
              <View style={{ padding: 10 }}>
                {currentWeek === 1 && (
                  <TouchableNativeFeedback onPress={() => setCurrentWeek(2)}>
                    <View
                      style={{
                        padding: 10,
                        backgroundColor: colors.primary,
                        borderRadius: 10,
                        alignItems: 'center',
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: fonts.primary[600],
                          fontSize: 15,
                          color: colors.white,
                        }}
                      >
                        Minggu ke 2
                      </Text>
                    </View>
                  </TouchableNativeFeedback>
                )}

                {currentWeek === 2 && (
                  <TouchableNativeFeedback onPress={() => setCurrentWeek(1)}>
                    <View
                      style={{
                        padding: 10,
                        backgroundColor: colors.primary,
                        borderRadius: 10,
                        alignItems: 'center',
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: fonts.primary[600],
                          fontSize: 15,
                          color: colors.white,
                        }}
                      >
                        Minggu ke 1
                      </Text>
                    </View>
                  </TouchableNativeFeedback>
                )}
              </View>
            </ScrollView>
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

          {/* Rencana */}
          <View
            style={{
              marginTop: 20,
            }}
          >
            <View
              style={{
                padding: 10,
                borderWidth: 2,
                borderRadius: 10,
                borderColor: colors.primary,
             
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

              <View
                style={{
                  marginTop: 10,
                }}
              >
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
              <View
                style={{
                  marginTop: 10,
                }}
              >
                <TextInput
                  style={{
                    height: 150,
                    textAlignVertical: 'top', // Teks dimulai dari atas
                    borderRadius: 10,
                    padding: 10,
                    fontFamily: fonts.primary[400],
                    fontSize: 12,
                    color: colors.black,
                    backgroundColor:'#F7F7F7'
                  }}
                  multiline
                  placeholder="Belum ada rencana"
                  placeholderTextColor="#aaa"
                  value={userInput}
                  onChangeText={setUserInput}
                />
              </View>

              <View style={{
                flexDirection:'row',
                justifyContent:'flex-end',
                padding:10,
                marginTop:10
                
              }}>
                <TouchableNativeFeedback>
                 <View style={{
                    padding:10,
                    backgroundColor:colors.primary,
                    borderRadius:100,
                    width:40,
                    height:40
                 }}>
                 <Icon style={{left:1, top: -2}} type='ionicon' name='create-outline' size={20} color={colors.white}/>
                 </View>
                </TouchableNativeFeedback>
              </View>

            </View>


                 {/* UPDATE BERAT BADAN */}
            <View
              style={{
                padding: 10,
                borderWidth: 2,
                borderRadius: 10,
                borderColor: colors.primary,
                marginTop:50
             
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
                  Update Berat Badan
                </Text>
              </View>

              <View
                style={{
                  marginTop: 10,
                }}
              >
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

         
              <View style={{
                flexDirection:'row',
                justifyContent:'flex-end',
                padding:10,
                marginTop:10
                
              }}>
                <TouchableNativeFeedback onPress={() => navigation.navigate('UpdateBeratBadan', {currentDay: currentDayNumber})}>
                 <View style={{
                    padding:10,
                    backgroundColor:colors.primary,
                    borderRadius:100,
                    width:40,
                    height:40
                 }}>
                 <Icon style={{left:1, top: -2}} type='ionicon' name='add-outline' size={20} color={colors.white}/>
                 </View>
                </TouchableNativeFeedback>
              </View>

            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
