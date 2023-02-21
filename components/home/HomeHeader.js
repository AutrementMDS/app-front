import logo from "../../assets/logo/basic_logo.png";

import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Button,
  Dimensions,
  Pressable,
  Platform,
} from "react-native";
import { SearchBar } from "./SearchBar";
import { isOnWeb } from "../../modules/utils";

export const HomeHeader = (props) => {
  if (isOnWeb()) {
    return (
      <View style={{ ...styles.container, marginBottom: 30 }}>
        <View style={styles.containerImage}>
          <Image source={logo} alt="logo" style={styles.image} />
          <Text style={styles.appName}>Autrement</Text>
        </View>
        <SearchBar onSearchChange={props.onSearchChange} />
      </View>
    );
  } else {
    return (
      <View style={{ ...styles.containerWeb }}>
        <View style={styles.containerImage}>
          <Image source={logo} alt="logo" style={styles.image} />
          <Text style={styles.appName}>Autrement</Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <SearchBar onSearchChange={props.onSearchChange} />
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 5,
    width: "100%",
  },
  containerWeb: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginBottom: 5,
    width: "100%",
  },
  image: {
    // flex: 1,
    width: 50,
    height: 50,
    resizeMode: "contain",
    // alignSelf: "center",
  },
  containerImage: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
    // width: "100%",
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  appName: {
    fontSize: 30,
    fontFamily: "GibsonB",
    color: "#40693E",
    marginLeft: 10,
  },
});
