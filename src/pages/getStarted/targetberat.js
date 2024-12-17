import { View, Text } from 'react-native';
import React from 'react';

export default function TargetBerat({ navigation, route }) {
    const { tinggi_badan, berat_badan, jenis_kelamin, tanggal_lahir } = route.params;

    // Pastikan tinggi_badan dan berat_badan dalam bentuk angka
    const tinggiDalamMeter = parseFloat(tinggi_badan) / 100;  // Tinggi dalam meter
    const beratDalamKg = parseFloat(berat_badan);  // Berat dalam kg

    // Validasi input
    if (isNaN(tinggiDalamMeter) || tinggiDalamMeter < 1 || tinggiDalamMeter > 2.5) {
        return (
            <View>
                <Text>Tinggi badan tidak valid. Mohon masukkan nilai yang benar!</Text>
            </View>
        );
    }

    if (isNaN(beratDalamKg) || beratDalamKg < 20 || beratDalamKg > 300) {
        return (
            <View>
                <Text>Berat badan tidak valid. Mohon masukkan nilai yang benar!</Text>
            </View>
        );
    }

    // Perhitungan BMI
    const bmi = beratDalamKg / (tinggiDalamMeter * tinggiDalamMeter); // Rumus BMI
    let kategoriBMI = '';
    if (bmi < 18.5) kategoriBMI = 'Kurus';
    else if (bmi >= 18.5 && bmi < 24.9) kategoriBMI = 'Normal';
    else if (bmi >= 25 && bmi < 29.9) kategoriBMI = 'Overweight';
    else kategoriBMI = 'Obesitas';

    return (
        <View>
            <Text>IMT: {bmi.toFixed(2)}</Text>
            <Text>Kategori: {kategoriBMI}</Text>
        </View>
    );
}
