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
      <Tab.Screen name="Home" component={Home} />

    </Tab.Navigator>
  );
};

export default function Router() {
  return (
    <Stack.Navigator initialRouteName='InfoLengkap'>
      <Stack.Screen
        name="Splash"
        component={Splash}
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
