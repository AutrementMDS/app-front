import * as React from "react";
import { Pressable, StyleSheet, Text, TextInput } from "react-native";

export function CustomButton(props) {
  return (
    <Pressable
      style={
        props.type == "primary" ? styles.buttonPrimary : styles.buttonSecondary
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
  );
}

export function CustomInput(props) {
  const [textInputValue, setTextInputValue] = React.useState("");

  return (
    <TextInput
      secureTextEntry={props.type == "password" ? true : false}
      style={styles.textInput}
      onChangeText={(text) => {
        setTextInputValue(text);
        props.controller(text);
      }}
      value={textInputValue}
      placeholder={props.placeholder}
    />
  );
}

const styles = StyleSheet.create({
  textInput: {
    marginTop: 10,
    borderColor: "gray",
    backgroundColor: "#E1E7DF",
    elevation: 5,
    borderRadius: 5,
    borderBottomColor: "red",
    padding: 15,

    fontFamily: "GibsonR",
    fontSize: 15,
  },
  buttonPrimary: {
    backgroundColor: "#ADC8A1",
    borderRadius: 5,
    marginTop: 20,
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
    borderColor: "#40693E",
    borderWidth: 3,
    borderRadius: 5,
    marginTop: 5,
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
