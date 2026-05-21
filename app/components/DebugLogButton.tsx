import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

type ButtonProps = {
  clickHandler: () => void;
}

const DebugLogButton = (props: ButtonProps) => {
  return (
    <View style={style.headerRight}>
      {/*
                <Text style={styles.icon}>⚙️</Text>
                <Text style={styles.icon}>📑</Text>
                <Text style={styles.icon}>ℹ️</Text>
                */}
      <TouchableOpacity
        style={style.button}
        onPress={props.clickHandler}
      >
        <Text style={style.icon}>📑</Text>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  icon: {
    fontSize: 20,
    color: '#fff',
    marginLeft: 0,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  button: {
    marginLeft: 10,
  },
});

export default DebugLogButton;