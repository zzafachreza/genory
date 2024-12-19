import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import { Color, colors } from '../../utils/colors';
import { fonts } from '../../utils';

export default function BottomNavigator({ state, descriptors, navigation }) {
  const windowWidth = Dimensions.get('window').width;

  // Map label to corresponding images and sizes
  const getImageDetails = (label) => {
    switch (label) {
      case 'Home':
        return { source: require('../../assets/program_bottom.png'), width: 26, height: 26 };
      case 'Rencana':
        return { source: require('../../assets/rencana_bottom.png'), width: 31, height: 28 };
      case 'Konsultasi':
        return { source: require('../../assets/konsultasi_bottom.png'), width: 25, height: 25 };
      case 'Telusuri':
        return { source: require('../../assets/search_bottom.png'), width: 25, height: 26 };
      case 'Profile':
        return { source: require('../../assets/profile_bottom.png'), width: 26, height: 26 };
      default:
        return { source: null, width: 20, height: 20 };
    }
  };

  return (
    <View
      style={{
        backgroundColor: colors.primary,
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: Color.blueGray[100],
        height: 65,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
      }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, {
              key: 0,
            });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const { source, width, height } = getImageDetails(label);

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
              }}>
              <Image
                source={source}
                style={{
                  width,
                  height,
                  resizeMode: 'contain',
                  tintColor: isFocused ? colors.white : colors.white,
                }}
              />
              <Text
                style={{
                  marginTop: 4,
                  fontFamily: fonts.body2.fontFamily,
                  textAlign: 'center',
                  fontSize: 12,
                  color: isFocused ? colors.white : colors.white,
                }}>
                {label}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({});
