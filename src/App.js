import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Router from './routes';
import { LogBox, StatusBar, View, Text, PermissionsAndroid } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { Color, colors, fonts } from './utils';
import { ToastProvider } from 'react-native-toast-notifications'
import { Icon } from 'react-native-elements';
import PushNotification, { Importance } from "react-native-push-notification";
import { storeData } from './utils/localStorage';
export default function App() {
  LogBox.ignoreAllLogs();


  PushNotification.createChannel(
    {
      channelId: "genory", // (required)
      channelName: "genory", // (required)
      channelDescription: "A channel genory", // (optional) default: undefined.
      playSound: false, // (optional) default: true
      soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
      importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
    },
    (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
  );


  // Must be outside of any component LifeCycle (such as `componentDidMount`).
  PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function (token) {
      console.log("TOKEN:", token.token);
      storeData('token', token.token);
    },

    // (required) Called when a remote is received or opened, or local notification is opened
    onNotification: function (notification) {
      console.log("NOTIFICATION:", notification);

      // process the notification

      // (required) Called when a remote is received or opened, or local notification is opened

    },

    // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
    onAction: function (notification) {
      console.log("ACTION:", notification.action);
      console.log("NOTIFICATION:", notification);

      // process the action
    },

    // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
    onRegistrationError: function (err) {
      console.error(err.message, err);
    },


    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    /**
     * (optional) default: true
     * - Specified if permissions (ios) and token (android and ios) will requested or not,
     * - if not, you must call PushNotificationsHandler.requestPermissions() later
     * - if you are not using remote notification or do not have Firebase installed, use this:
     *     requestPermissions: Platform.OS === 'ios'
     */
    requestPermissions: true,
  });

  return (
    <NavigationContainer>
      <StatusBar hidden backgroundColor={colors.white} barStyle="dark-content" />
      <ToastProvider
        duration={2000}
        placement="bottom"
        animationDuration={250}
        animationType='zoom-in'
        successColor={Color.blueGray[50]}
        successIcon={<Icon type='ionicon' name='checkmark-circle' color={Color.tealGreen[500]} size={24} />}
        dangerColor={<Icon type='ionicon' name='close-circle' color={Color.tealGreen[500]} size={24} />}
        renderToast={(toast) => {
          return (
            <View style={{
              backgroundColor: Color.blueGray[50],
              padding: 10,
              width: '85%',
              borderRadius: 10,
              borderWidth: 1,
              borderColor: Color.blueGray[100],
              flexDirection: 'row',
            }}>
              {toast.type == 'success' ? <Icon type='ionicon' name='checkmark-circle' color={Color.tealGreen[500]} size={24} /> : toast.type == 'warning' ? <Icon type='ionicon' name='information-circle' color={Color.blueGray[400]} size={24} /> : <Icon type='ionicon' name='close-circle' color={Color.red[500]} size={24} />}
              <Text style={{
                left: 10,
                flex: 1,
                ...fonts.body3,
                color: Color.primary[900]
              }}>{toast.message}</Text>
              {/* <Pressable>
                <Icon type='ionicon' name='close' color={Color.blueGray[400]} />
              </Pressable> */}
            </View>
          )
        }}
      >
        <Router />
      </ToastProvider>

      <FlashMessage position="bottom" />
    </NavigationContainer>
  );
}
