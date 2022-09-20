import * as React from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import logo from "../assets/logo/Logo_carré.png";

const Separator = () => <View style={styles.separator} />;
const SeparatorText = () => <View style={styles.separatorText} />;

export function LandingPageScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.column}>
        <Separator />
        <View style={{ alignItems: "center" }}>
          <Image source={logo} style={{ width: 339, height: 259 }} />
        </View>
        <SeparatorText />
        <View>
          <Text style={[styles.text, { textAlign: "left" }]}>
            Commencez à consommer local autrement.
          </Text>
        </View>
        <SeparatorText />
        <View>
          <Text style={[styles.text, { textAlign: "right" }]}>
            Soutenez les producteurs français près de chez vous.
          </Text>
        </View>
        <Separator />
        <View style={{ alignItems: "center" }}>
          <Button
            onPress={() => navigation.navigate("Home")}
            style={styles.btn}
            title="Commencer"
          ></Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E1E7DF",
  },
  column: {
    margin: 15,
  },
  text: {
    fontSize: 36,
    color: "#7E8B78",
    marginLeft: 5,
    marginRight: 5,
    fontFamily: "GibsonR",
  },
  btn: {
    backgroundColor: "#ADC8A1",
    alignItems: "center",
    padding: 10,
    borderRadius: 8,
    elevation: 5,
    width: "50%",
  },
  btnText: {
    fontSize: 25,
    color: "#fff",
    fontFamily: "GibsonR",
  },
  separator: {
    marginVertical: 38,
  },
  separatorText: {
    marginVertical: 25,
  },
});
