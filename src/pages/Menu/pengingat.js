import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Switch, StyleSheet, ScrollView, FlatList, TextInput, Alert } from 'react-native';
import { Color, colors, fonts } from '../../utils';
import { MyHeader, MyTimePicker } from '../../components';
import { getData, MYAPP, storeData } from '../../utils/localStorage';
import { useToast } from 'react-native-toast-notifications';
import moment from 'moment';
import { useIsFocused } from '@react-navigation/native';
import PushNotification from "react-native-push-notification";
import { maskJs, maskCurrency } from 'mask-js';

export default function PengingatProgram({ navigation, route }) {
  const week = route.params.week;
  const [user, setUser] = useState({});
  const [mulai, setMulai] = useState('');
  const [data, setData] = useState([]);

  const toast = useToast();
  const __getTransaction = () => {
    getData('user').then(u => {
      setUser(u);
    });


    getData('mulai').then(ml => {
      console.log(ml);
      if (!ml) {

        toast.show('Silahkan tonton video terlebih dahulu agar dapat mengunakan fitur ini !', {
          type: 'warning'
        });
        navigation.goBack();
      } else {

        getData('alarm').then(al => {
          if (!al) {
            let ARR = [];
            for (let index = 1; index <= 14; index++) {
              ARR.push({
                id: index,
                minggu: index <= 7 ? 'Pertama' : 'Kedua',
                hari: index,
                jam: '00:00',
                tanggal: moment(ml).add(index - 1, 'day').format('YYYY-MM-DD'),
                cek: 0,
              })
            }
            console.log(ARR);
            storeData('alarm', ARR);
            setData(ARR)
          } else {
            setData(al)
          }
        })

      }
    })
  }
  const WEEK = ['Pertama', 'Kedua']
  const isFocus = useIsFocused();
  useEffect(() => {

    if (isFocus) {
      __getTransaction()
    }


  }, [isFocus])

  return (
    <View style={styles.container}>
      <MyHeader onPress={() => navigation.goBack()} title={`Pengingat Minggu ${WEEK[week - 1]}`} />
      <View style={{
        flex: 1,
        paddingVertical: 16
      }}>
        <FlatList data={week == 1 ? data.filter(i => i.hari <= 7) : data.filter(i => i.hari > 7)} renderItem={({ item, index }) => {
          return (
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',

              borderBottomWidth: 1,
              borderBottomColor: Color.blueGray[300],
              paddingHorizontal: 16,
              paddingVertical: 8,
            }}>
              <View style={{
                flex: 1,
              }}>

                <MyTimePicker realvalue={item.jam} onTimeChange={x => {

                  let tmp = [...data];
                  tmp[index].jam = moment(x).format('HH:mm');
                  setData(tmp);
                  storeData('alarm', tmp)
                }} />
                {/* <TextInput maxLength={5} onChangeText={x => {

                  let tmp = [...data];
                  tmp[index].jam = maskJs('99:99', x);
                  setData(tmp);
                  storeData('alarm', tmp)
                }} keyboardType='number-pad' style={{
                  fontFamily: fonts.primary[800],
                  fontSize: 30,
                  width: 130,
                  // textAlign: 'center',
                  // height: 50,
                  // borderWidth: 1,
                  color: user.tipe == 'Gain' ? colors.primary : colors.secondary,
                }}
                  value={item.jam}
                /> */}
                <Text style={{
                  fontFamily: fonts.primary[400],
                  fontSize: 11,
                  color: user.tipe == 'Gain' ? colors.primary : colors.secondary,
                }}>Hari ke {item.hari} | Minggu {item.minggu}</Text>
                <Text style={{
                  fontFamily: fonts.primary[600],
                  fontSize: 11,
                  color: user.tipe == 'Gain' ? colors.primary : colors.secondary,
                }}>{moment(item.tanggal).format('DD MMMM YYYY')}</Text>
              </View>
              <View>
                <Switch
                  trackColor={{ false: '#767577', true: user.tipe == 'Gain' ? colors.secondary : colors.primary }}
                  thumbColor={item.cek ? user.tipe == 'Gain' ? colors.primary : colors.secondary : '#F4f4f4'}

                  onValueChange={x => {
                    if (x) {
                      Alert.alert(MYAPP, `Apakah kamu yakin akan menyakalan alarm pada tanggal\n${moment(item.tanggal).format('DD MMMM YYYY')} Pukul ${item.jam} ?`, [
                        {
                          text: 'Tidak'
                        },
                        {
                          text: 'Ya',
                          onPress: () => {
                            let jam_alarm = new Date(moment(`${item.tanggal} ${item.jam}:00`).valueOf());
                            // let jam_alarm = new Date(Date.now() + 3 * 1000);
                            console.log(jam_alarm);

                            let tmp = [...data];
                            tmp[index].cek = x;
                            setData(tmp);
                            storeData('alarm', tmp);
                            PushNotification.localNotificationSchedule({
                              id: x,
                              channelId: "genory",
                              title: 'PENGINGAT GENORY',

                              //... You can use all the options from localNotifications
                              message: "Hallo ini adalah alarm genory", // (required)
                              date: jam_alarm, // in 60 secs
                              allowWhileIdle: true, // (optional) set notification to work while on doze, default: false

                            });
                          }
                        }
                      ])
                    } else {
                      let tmp = [...data];
                      tmp[index].cek = x;
                      setData(tmp);
                      storeData('alarm', tmp);
                      PushNotification.cancelLocalNotification({ id: `${x}` })
                    }
                  }}
                  value={item.cek}
                />
              </View>
            </View>
          )
        }} />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  row: {
    padding: 15,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  timeText: {
    fontSize: 25,
    fontFamily: fonts.primary[600],
    color: colors.primary,
  },
  dayText: {
    fontFamily: fonts.primary[400],
    fontSize: 13,
    color: colors.primary,
  },
  switchContainer: {
    width: 50,
    height: 25,
    borderRadius: 25,
    justifyContent: 'center',
    padding: 3,
  },
  switchEnabled: {
    backgroundColor: '#808040',
  },
  switchDisabled: {
    backgroundColor: '#f5f5f5',
  },
  switchThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  thumbEnabled: {
    backgroundColor: colors.white,
    alignSelf: 'flex-end',
  },
  thumbDisabled: {
    backgroundColor: colors.white,
    alignSelf: 'flex-start',
  },
});
