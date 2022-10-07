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
} from "react-native";
import { SearchBar } from "./SearchBar";

export const HomeHeader = (props) => {
  return (
    <View style={styles.container}>
      <Image source={logo} alt="logo" style={styles.image} />
      <SearchBar />
    </View>
  );
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
    width: Dimensions.get("window").width / 6,
    height: 50,
    resizeMode: "contain",
    // alignSelf: "center",
  },
});
