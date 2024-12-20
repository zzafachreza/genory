import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { colors } from '../../utils'
import { MyHeader } from '../../components'
import { Image } from 'react-native'

export default function MealPlan({navigation}) {
  return (
    <View style={{
        flex:1,
        backgroundColor:colors.white
    }}>
      <View>
        <MyHeader onPress={() => navigation.goBack()} title="Meal Plan"/>
      </View>

      <ScrollView>
        <View style={{
            padding:10
        }}>

        <View style={{
          alignItems:"center",
          padding:10
        }}>

        <Image style={{
          width:350,
          height:470
        }} source={require('../../assets/meal_plan_img.png')}/>

        </View>

        </View>
      </ScrollView>
      
    </View>
  )
}