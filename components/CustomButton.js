import * as React from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

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
  if (props.textArea) {
    return (
      <View style={styles.textInputContainer}>
        {props.left && (
          <Ionicons style={styles.textInputIcon} name={props.left} size={20} />
        )}
        <TextInput
          secureTextEntry={props.type == "password" ? true : false}
          style={{ ...styles.textInput, ...(props.style || {}) }}
          onChangeText={(text) => {
            props.controller(text);
          }}
          value={props.value}
          placeholder={props.placeholder}
          keyboardType={props.type}
          // numberOfLines={10}
          multiline={true}
          min="0"
          step="1"
        />
      </View>
    );
  } else {
    return (
      <View style={styles.textInputContainer}>
        {props.left && (
          <Ionicons style={styles.textInputIcon} name={props.left} size={20} />
        )}
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    borderRadius: 20,
    elevation: 5,
    backgroundColor: "#E1E7DF",
  },
  textInputIcon: {
    marginLeft: 10,
    color: "#40693E",
  },
  textInput: {
    borderColor: "gray",
    color: "#40693E",
    padding: 15,
    fontFamily: "NunitoR",
    fontSize: 20,
    flex: 1,
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
