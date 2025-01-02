import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Splash,
  Home,
  Login,
  Register,
  Account,
  AccountEdit,
  KalkulatorKompos,
  Petunjuk,
  PertamaNextSlide,
  KeduaNextSlide,
  GainRegister,
  LossRegister,
  GetStarted,
  InfoLengkapTubuh,
  TargetBerat,
  RingkasanRencana,
  ProgramPertama,
  UpdateBeratBadan,
  VideoLatihan,
  PengingatProgram,
  MealPlan,
  Konsultasi,
  Telusuri,
  FaktaMitos,
  RekomendasiMakanan,
  AsupanKaloriMakanan,
  VideoData,
  VideoDetail,



} from '../pages';
import { colors } from '../utils';
import { Icon } from 'react-native-elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigator } from '../components';



const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

const MainApp = () => {
  return (
    <Tab.Navigator initialRouteName='Produk' tabBar={props => <BottomNavigator {...props} />}>
      <Tab.Screen name="Program" component={Home} />
      <Tab.Screen name="Rencana" component={ProgramPertama} initialParams={{ week: 1 }} />
      <Tab.Screen name="Konsultasi" component={Konsultasi} />
      <Tab.Screen name="Telusuri" component={Telusuri} />
      <Tab.Screen name="Profile" component={Account} />

    </Tab.Navigator>
  );
};

export default function Router() {
  return (
    <Stack.Navigator initialRouteName='Splash'>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />





      <Stack.Screen
        name="Account"
        component={Account}
        options={{
          headerShown: false,

        }}
      />

      <Stack.Screen
        name="KalkulatorKompos"
        component={KalkulatorKompos}
        options={{
          headerShown: false,

        }}
      />

      <Stack.Screen
        name="VideoData"
        component={VideoData}
        options={{
          headerShown: false,

        }}
      />


      <Stack.Screen
        name="VideoDetail"
        component={VideoDetail}
        options={{
          headerShown: false,

        }}
      />


      <Stack.Screen
        name="Petunjuk"
        component={Petunjuk}
        options={{
          headerShown: false,

        }}
      />

      <Stack.Screen
        name="PertamaNextSlide"
        component={PertamaNextSlide}
        options={{
          headerShown: false,

        }}
      />

      <Stack.Screen
        name="KeduaNextSlide"
        component={KeduaNextSlide}
        options={{
          headerShown: false,

        }}
      />
      <Stack.Screen
        name="GainRegister"
        component={GainRegister}
        options={{
          headerShown: false,

        }}
      />

      <Stack.Screen
        name="LossRegister"
        component={LossRegister}
        options={{
          headerShown: false,

        }}
      />


      <Stack.Screen
        name="GetStarted"
        component={GetStarted}
        options={{
          headerShown: false,

        }}
      />

      <Stack.Screen
        name="InfoLengkap"
        component={InfoLengkapTubuh}
        options={{
          headerShown: false,

        }}
      />

      <Stack.Screen
        name="TargetBerat"
        component={TargetBerat}
        options={{
          headerShown: false,

        }}
      />


      <Stack.Screen
        name="RingkasanRencana"
        component={RingkasanRencana}
        options={{
          headerShown: false,

        }}
      />


      <Stack.Screen
        name="ProgramPertama"
        component={ProgramPertama}
        options={{
          headerShown: false,

        }}
      />

      <Stack.Screen
        name="UpdateBeratBadan"
        component={UpdateBeratBadan}
        options={{
          headerShown: false,

        }}
      />

      <Stack.Screen
        name="VideoLatihan"
        component={VideoLatihan}
        options={{
          headerShown: false,

        }}
      />


      <Stack.Screen
        name="PengingatProgram"
        component={PengingatProgram}
        options={{
          headerShown: false,

        }}
      />


      <Stack.Screen
        name="MealPlan"
        component={MealPlan}
        options={{
          headerShown: false,

        }}
      />

      <Stack.Screen
        name="Konsultasi"
        component={MainApp}
        options={{
          headerShown: false,

        }}
      />

      <Stack.Screen
        name="Telusuri"
        component={MainApp}
        options={{
          headerShown: false,

        }}
      />

      <Stack.Screen
        name="FaktaMitos"
        component={FaktaMitos}
        options={{
          headerShown: false,

        }}
      />

      <Stack.Screen
        name="RekomendasiMakananSehat"
        component={RekomendasiMakanan}
        options={{
          headerShown: false,

        }}
      />
      <Stack.Screen
        name="AsupanKaloriTambahan"
        component={AsupanKaloriMakanan}
        options={{
          headerShown: false,

        }}
      />

      <Stack.Screen
        name="AccountEdit"
        component={AccountEdit}
        options={{
          headerShown: false,
          headerTitle: 'Edit Profile',
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerTintColor: '#000',
        }}
      />


      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{
          headerShown: false,
        }}
      />
















    </Stack.Navigator>
  );
}
