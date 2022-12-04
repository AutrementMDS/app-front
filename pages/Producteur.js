import * as React from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Avatar, Card, Divider } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Page } from "../components/Page";

export const ProducteurScreen = ({ route, navigation }) => {
  const { producteur } = route.params;
  console.log(producteur);

  /**
   * Set screen's title with the producteur's name
   */
  navigation.setOptions({
    title: (
      <View>
        <Text
          style={styles.title}
        >{`${producteur.prenom} ${producteur.nom}`}</Text>
        <Text style={styles.subTitle}>{producteur.societe}</Text>
      </View>
    ),
  });

  /**
   * Retun main component
   */
  return (
    <View style={styles.container}>
      <View style={styles.user_info}>
        <View style={styles.avatar}>
          {producteur?.avatar ? (
            <Avatar.Image
              size={70}
              rounded
              source={{
                uri: producteur.image,
              }}
            />
          ) : (
            <Avatar.Text
              backgroundColor="#40693E"
              size={70}
              label={`${producteur?.prenom.substr(0, 1).toUpperCase()}`}
            />
          )}
        </View>
        <View style={styles.personal_info}>
          <View>
            <Text
              style={styles.personal_info_name}
            >{`${producteur?.prenom}`}</Text>
          </View>
          <View>
            <Text style={styles.personal_info_societe}>
              {`${producteur?.nom}`}
            </Text>
          </View>
        </View>
      </View>

      <Text style={styles.contentTitle}>A PROPOS</Text>
      <Text style={styles.description}>{producteur.description}</Text>

      <Text style={styles.contentTitle}>LE METIER</Text>
    </View>
  );
};

/**
 * CSS Styles
 */
const styles = StyleSheet.create({
  description: {
    fontSize: 15,
    color: "black",
    fontFamily: "GibsonR",
    marginTop: 5,
  },
  contentTitle: {
    fontSize: 20,
    color: "black",
    fontFamily: "GibsonB",
    marginTop: 40,
  },
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    color: "black",
    fontFamily: "GibsonB",
  },
  subTitle: {
    fontSize: 15,
    color: "black",
    fontFamily: "GibsonR",
  },
  personal_info_name: {
    fontSize: 20,
    color: "black",
    fontFamily: "GibsonB",
  },
  personal_info_societe: {
    fontSize: 18,
    color: "black",
    fontFamily: "GibsonR",
  },
  personal_info: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  user_info: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "center",
  },

  containerUser: {
    padding: 15,
  },
  image: {
    elevation: 3,
    flex: 1,
    width: null,
    height: null,
    resizeMode: "cover",
  },
  avatar: {
    marginRight: 10,
  },
});
