import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../../utils'
import { MyHeader } from '../../components'
import { Image } from 'react-native'
import Pdf from 'react-native-pdf';
import { apiURL, webURL } from '../../utils/localStorage'
import axios from 'axios'
export default function MealPlan({ navigation }) {

  const [data, setData] = useState({
    file_meal: ''
  });
  useEffect(() => {
    axios.post(apiURL + 'meal').then(res => {
      setData(res.data)
    })
  }, [])

  return (
    <View style={{
      flex: 1,
      backgroundColor: colors.white
    }}>
      <View>
        <MyHeader onPress={() => navigation.goBack()} title="Meal Plan" />
      </View>

      <View style={{
        flex: 1,
        backgroundColor: colors.white
      }}>

        <Pdf
          trustAllCerts={false}
          // source={{ uri: webURL + data.foto_pdf, cache: true }}
          source={{
            uri: webURL + data.file_meal, cache: true
          }}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`Number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`Current page: ${page}`);
          }}
          onError={(error) => {
            console.log(error);
          }}
          onPressLink={(uri) => {
            console.log(`Link pressed: ${uri}`);
          }}
          style={{
            flex: 1,

          }} />
      </View>

    </View>
  )
}