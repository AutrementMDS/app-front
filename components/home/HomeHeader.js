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
        <SearchBar />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        {/* <Image source={logo} alt="logo" style={styles.image} /> */}
        <SearchBar onSearchChange={props.onSearchChange} />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    justifyContent: "flex-start",
    alignItems: "center",
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
