import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { View, Text, ScrollView, Pressable, FlatList, StatusBar } from 'react-native';
import FastImage from 'react-native-fast-image';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';
import { MyHeader } from '../../components';
import { Color, colors, fonts, windowWidth } from '../../utils';
import { apiURL, getData, webURL } from '../../utils/localStorage';

export default function Telusuri({ navigation }) {
  const [data, setData] = useState([]);
  const [user, setUser] = useState({});
  const isFocused = useIsFocused();

  useEffect(() => {
    let isMounted = true;
    if (isFocused) {
      getData('user').then((u) => {
        if (isMounted) {
          setUser(u);
          axios
            .post(apiURL + 'artikel', { tipe: u.tipe })
            .then((res) => isMounted && setData(res.data));
        }
      });
    }
    return () => { isMounted = false; };
  }, [isFocused]);

  const categories = useMemo(() => [
    { id: 1, name: 'Latihan', color: Color.blueGray[100] },
    { id: 2, name: 'Latihan', color: Color.blueGray[100] },
    { id: 3, name: 'Latihan', color: Color.blueGray[100] },
  ], []);

  const rekomendasi = useMemo(() => [
    { id: 1, name: 'Menaikkan Berat Badan', color: Color.blueGray[100] },
    { id: 2, name: 'Artikel', color: Color.blueGray[100] },
    { id: 3, name: 'Latihan', color: Color.blueGray[100] },
    { id: 4, name: 'Rekomendasi Makanan Sehat', color: Color.blueGray[100] },
  ], []);

  const renderItem = useCallback(({ item }) => (
    <Pressable onPress={() => navigation.navigate('FaktaMitos', item)}>
      <View style={styles.card}>
        <FastImage source={{ uri: webURL + item.file_artikel }} style={styles.image} />
        <Text style={styles.overlayText}>{item.judul}</Text>
      </View>
    </Pressable>
  ), []);


  const renderItemBanner = useCallback(({ item }) => (
    <Pressable onPress={() => navigation.navigate('FaktaMitos', item)}>
      <View style={styles.card}>
        <FastImage source={{ uri: webURL + item.file_artikel }} style={styles.imageBanner} />
        <Text style={styles.overlayTextBanner}>{item.judul}</Text>
      </View>
    </Pressable>
  ), []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <MyHeader title="Telusuri" />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <CategoryList categories={categories} />

        <Section title="Banner">
          <FlatList
            data={data.filter(i => i.kategori === 'Banner')}
            renderItem={renderItemBanner}
            horizontal
            keyExtractor={(item) => item.id_artikel.toString()}
            showsHorizontalScrollIndicator={false}
            initialNumToRender={3}
          />
        </Section>

        <Section title="Mitos Atau Fakta?" color={user.tipe === 'Gain' ? colors.primary : colors.secondary}>
          <FlatList
            data={data.filter(i => i.kategori === 'Mitos atau Fakta')}
            renderItem={renderItem}
            horizontal
            keyExtractor={(item) => item.id_artikel.toString()}
            showsHorizontalScrollIndicator={false}
          />
        </Section>

        <Section title="Rekomendasi Makanan Sehat">
          <FlatList
            data={data.filter(i => i.kategori === 'Rekomendasi Makanan Sehat')}
            renderItem={renderItem}
            horizontal
            keyExtractor={(item) => item.id_artikel.toString()}
            showsHorizontalScrollIndicator={false}
          />
        </Section>

        <Section title="Asupan Kalori Tambahan">
          <FlatList
            data={data.filter(i => i.kategori === 'Asupan Kalori Tambahan')}
            renderItem={renderItem}
            horizontal
            keyExtractor={(item) => item.id_artikel.toString()}
            showsHorizontalScrollIndicator={false}
          />
        </Section>

        <Section title="Rekomendasi">
          <View style={styles.recommendationContainer}>
            {rekomendasi.map((item) => (
              <Pressable key={item.id} onPress={() => console.log(`Navigasi ke ${item.name}`)}>
                <View style={[styles.recommendationBox, { backgroundColor: item.color }]}>
                  <Text style={styles.recommendationText}>{item.name}</Text>
                </View>
              </Pressable>
            ))}
          </View>
        </Section>
      </ScrollView>
    </View>
  );
}

const CategoryList = ({ categories }) => (
  <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryList}>
    {categories.map((category) => (
      <Pressable key={category.id} onPress={() => console.log(`Navigasi ke ${category.name}`)}>
        <View style={[styles.categoryItem, { backgroundColor: category.color }]}>
          <Text style={styles.categoryText}>{category.name}</Text>
        </View>
      </Pressable>
    ))}
  </ScrollView>
);

const Section = ({ title, children, color }) => (
  <View style={styles.section}>
    <Text style={[styles.sectionTitle, { color: color || colors.black }]}>{title}</Text>
    {children}
  </View>
);

const styles = {
  container: { flex: 1, backgroundColor: colors.white },
  scrollContent: { padding: 10 },
  categoryList: { flexDirection: 'row', marginBottom: 20 },
  categoryItem: { padding: 10, borderRadius: 20, marginRight: 10, alignItems: 'center', width: 83, height: 35 },
  categoryText: { color: colors.black, fontSize: 12, fontFamily: fonts.primary[600] },
  section: { marginTop: 20, padding: 10 },
  sectionTitle: { fontFamily: fonts.primary[600], fontSize: 15 },
  recommendationContainer: { flexDirection: 'row', flexWrap: 'wrap' },
  recommendationBox: { padding: 10, borderRadius: 20, marginRight: 10, marginTop: 10, alignItems: 'center' },
  recommendationText: { color: colors.black, fontSize: 12, fontFamily: fonts.primary[600] },
  card: { marginRight: 10, borderRadius: 8, overflow: 'hidden' },
  image: { width: 160, height: 200, borderRadius: 8 },
  imageBanner: {
    width: windowWidth - 40, height: 220, borderRadius: 8
  },
  overlayText: {
    width: 160, height: 70, position: 'absolute', bottom: 0,
    color: colors.white, padding: 4, backgroundColor: '#00000080'
  },
  overlayTextBanner: {
    width: windowWidth - 40, height: 70, position: 'absolute', bottom: 0,
    color: colors.white, padding: 4, backgroundColor: '#00000080'
  },
};
