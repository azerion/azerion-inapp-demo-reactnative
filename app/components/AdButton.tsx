import { StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native';
import React, { useState, useEffect } from 'react';
import LinearGradient from "react-native-linear-gradient";

export interface AdButtonProperties {
  title: string;
  onPress: () => void;
  active: boolean;
}

const AdButton: React.FC<AdButtonProperties> = ({ title, onPress, active }) => {
  const [isActive, setIsActive] = useState(active);

  useEffect(() => {
    setIsActive(active);
  }, [active]);

  return (
    <TouchableOpacity
      key={title}
      onPress={isActive ? onPress : undefined}
      style={isActive ? style.activeButton : style.inactiveButton}
    >
      {/* <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={isActive ? ['#0975E0', '#504DE4', '#7022FF'] : ['#555', '#555', '#555']}
        style={isActive ? style.activeButton : style.inactiveButton}
      > */}
      <Text style={style.buttonText}>{title}</Text>
      {/* </LinearGradient> */}
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  tabButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 50,
  },
  activeButton: {
    backgroundColor: '#9747FF',
    margin: 5,
    borderRadius: 15,
    paddingHorizontal: 30,
    paddingVertical: 5,
    overflow: 'hidden',
    minWidth: 100,
    minHeight: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inactiveButton: {
    backgroundColor: '#303030',
    margin: 5,
    borderRadius: 15,
    paddingHorizontal: 30,
    paddingVertical: 5,
    overflow: 'hidden',
    minWidth: 100,
    minHeight: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: Platform.select({
      ios: '600',
      android: 'bold',
    }),
    lineHeight: 20,
    textAlign: 'center',
    // ANDROID-SPECIFIC STYLES
    includeFontPadding: false,
    textAlignVertical: 'center',
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto',
    })
  },
})

export default AdButton;