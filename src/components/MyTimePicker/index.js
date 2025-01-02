import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Color, colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';
import moment from 'moment';

export default function MyTimePicker({
  label,
  iconname = 'time',
  onTimeChange,
  value,
  realvalue,
  borderColor = Color.blueGray[300],
}) {
  const [show, setShow] = useState(false);
  const [time, setTime] = useState(value || new Date());

  const onChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShow(false);
    setTime(currentTime);
    onTimeChange(currentTime);
  };

  const showTimepicker = () => {
    setShow(true);
  };

  return (
    <View style={{}}>
      {/* <Text style={{
        ...fonts.subheadline3,
        color: colors.primary,
        marginBottom: 8,
      }}>{label}</Text> */}
      <TouchableOpacity onPress={showTimepicker} style={{
        // height: 100,
        width: 130,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: borderColor,
        backgroundColor: 'white',
      }}>

        <Text style={{
          // ...fonts.body3,
          flex: 1,
          fontSize: 30,
          fontFamily: fonts.primary[800],
          color: Color.blueGray[900],
        }}>
          {realvalue}
          {/* {time ? moment(time).format('HH:mm') : 'Pilih Waktu'} */}
        </Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          testID="timePicker"
          value={time}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
