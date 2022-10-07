import * as React from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Button,
  Dimensions,
  Pressable,
} from "react-native";
import logo from "../assets/logo/Logo_carre.png";

export function LandingPageScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.column}>
        <View>
          <Image source={logo} style={styles.image} />
        </View>
        <View>
          <Text style={[styles.text, { textAlign: "left" }]}>
            Commencez à consommer local autrement.
          </Text>
        </View>
        <View>
          <Text style={[styles.text, { textAlign: "right" }]}>
            Soutenez les producteurs français près de chez vous.
          </Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Pressable
            onPress={() => navigation.navigate("Home")}
            style={styles.btn}
          >
            <Text style={styles.btnText}>Commencer</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 4,
    resizeMode: "contain",
    alignSelf: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#E1E7DF",
  },
  column: {
    margin: 15,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    height: Dimensions.get("window").height,
  },
  text: {
    fontSize: 28,
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
