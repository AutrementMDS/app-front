import * as React from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export function CustomButton(props) {
  let style = {
    ...styles.buttonContainer,
  };

  if (props.style) {
    style = {
      ...style,
      ...props.style,
    };
  }

  return (
    <View style={style}>
      <Pressable
        android_ripple={{
          color: "#849c79",
        }}
        style={
          props.type == "primary"
            ? styles.buttonPrimary
            : styles.buttonSecondary
        }
        onPress={() => props.onPress()}
      >
        <Text
          style={
            props.type == "primary"
              ? styles.buttonPrimaryText
              : styles.buttonSecondaryText
          }
        >
          {props.text}
        </Text>
      </Pressable>
    </View>
  );
}

export function CustomInput(props) {
  return (
    <TextInput
      secureTextEntry={props.type == "password" ? true : false}
      style={{ ...styles.textInput, ...(props.style || {}) }}
      onChangeText={(text) => {
        props.controller(text);
      }}
      value={props.value}
      placeholder={props.placeholder}
      keyboardType={props.type}
    />
  );
}

const styles = StyleSheet.create({
  textInput: {
    marginTop: 10,
    borderColor: "gray",
    backgroundColor: "#E1E7DF",
    elevation: 5,
    borderRadius: 10,
    borderBottomColor: "red",
    padding: 15,
    fontFamily: "GibsonR",
    fontSize: 15,
  },
  buttonContainer: {
    borderRadius: 1000,
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
  buttonPrimary: {
    width: "100%",
    backgroundColor: "#ADC8A1",
    borderRadius: 1000,
    // marginTop: 5,
    padding: 15,
    color: "white",
    display: "flex",
    alignItems: "center",
  },
  buttonPrimaryText: {
    color: "#40693E",
    fontFamily: "GibsonB",
    textTransform: "uppercase",
    fontSize: 15,
  },
  buttonSecondary: {
    width: "100%",
    borderColor: "#40693E",
    borderWidth: 3,
    borderRadius: 1000,
    // marginTop: 5,
    padding: 15,
    color: "white",
    display: "flex",
    alignItems: "center",
  },
  buttonSecondaryText: {
    color: "#40693E",
    fontFamily: "GibsonB",
    textTransform: "uppercase",
    fontSize: 15,
  },
});
