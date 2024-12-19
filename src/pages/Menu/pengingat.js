import { View, Text, Switch } from 'react-native';
import React, { useState } from 'react';
import { colors } from '../../utils';
import { MyHeader } from '../../components';

export default function PengingatProgram({navigation}) {
  const [isEnabled, setIsEnabled] = useState(false); // State untuk mengatur posisi switch

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={{
        flex: 1,
        backgroundColor: colors.white
    }}>

        <View>
            <MyHeader onPress={() => navigation.goBack()} title="Pengingat"/>
        </View>

        <View style={{
            padding: 15,
            marginTop: 20,
            flexDirection: 'row', // Mengatur agar elemen berada dalam satu baris
            justifyContent: 'space-between', // Menjaga jarak antara jam dan switch
            alignItems: 'center', // Vertikal center untuk menyelaraskan jam dan switch
        }}>
            <Text style={{
                fontSize: 16,
                fontWeight: 'bold',
            }}>
                09.00
            </Text>

            <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                onValueChange={toggleSwitch}
                value={isEnabled}
            />
        </View>
    </View>
  );
}
