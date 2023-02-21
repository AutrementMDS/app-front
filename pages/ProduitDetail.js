import * as React from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Avatar, Card, Divider } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";
import { isOnWeb } from "../modules/utils";

export const ProduitDetail = ({ route, navigation }) => {
  let { product } = route.params;
  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.touchableOpacityStyle}
          onPress={() =>
            navigation.navigate("AddToPanier", {
              product: route.params?.product,
            })
          }
        >
          <Ionicons name="add-outline" size={28} color="white" />
        </TouchableOpacity>
        <Card
          style={isOnWeb() ? styles.cardContainerWeb : styles.cardContainer}
        >
          <View
            style={{
              height: Dimensions.get("window").height / 4,
            }}
          >
            <Image
              source={{
                uri: `https://back.autrement.site${product.image.data.attributes.url}`,
              }}
              style={styles.image}
            ></Image>
          </View>
          <View style={styles.info}>
            <View>
              <Text style={styles.name}>{product.name}</Text>
              <Text style={styles.price}>
                {parseFloat(product.price).toFixed(2)}€ /{" "}
                {product.pricetype.data.attributes.name
                  .charAt(0)
                  .toUpperCase() +
                  product.pricetype.data.attributes.name.slice(1)}
              </Text>
            </View>
            <View style={styles.noteContainer}>
              <Text style={styles.note}>
                {(product.review == -1
                  ? "-"
                  : parseFloat(product.review).toFixed(1)) + "/5"}
              </Text>
            </View>
          </View>
          <Pressable
            onPress={() => {
              navigation.navigate("Producteur", {
                producteur: product.producteur.data.attributes,
                producteurID: product.producteur.data.id,
              });
            }}
          >
            <View style={styles.producteur}>
              <View style={styles.prod_info}>
                <View style={styles.avatar}>
                  {product.producteur.data.attributes.image ? (
                    <Avatar.Image
                      size={70}
                      rounded
                      source={{
                        uri: product.producteur.data.attributes.image,
                      }}
                    />
                  ) : (
                    <Avatar.Text
                      color="white"
                      style={{
                        backgroundColor: "#40693E",
                      }}
                      size={70}
                      label={`${product.producteur.data.attributes.prenom.substr(
                        0,
                        1
                      )}${product.producteur.data.attributes.nom.substr(0, 1)}`}
                    />
                  )}
                </View>
                <View style={styles.personal_info}>
                  <View>
                    <Text style={styles.personal_info_name}>
                      {product.producteur.data.attributes.nom}{" "}
                      {product.producteur.data.attributes.prenom}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.personal_info_societe}>
                      {product.producteur.data.attributes.societe}
                    </Text>
                  </View>
                </View>
              </View>
              <Divider
                style={{
                  margin: 15,
                }}
              />
              <Text
                style={{
                  textAlign: "left",
                }}
              >
                {product.description}
              </Text>
            </View>
          </Pressable>
        </Card>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  // mobileContainer: {
  //   width: "100%",
  //   height: "80vh",
  // },
  webContainer: {
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
    minHeight: "80vh",
  },
  container: {
    flex: 1,
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
  prod_info: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  producteur: {
    padding: 15,
  },
  cardContainer: {
    marginBottom: 30,
    backgroundColor: "transparent",
    elevation: 0,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardContainerWeb: {
    marginBottom: 30,
    backgroundColor: "transparent",
    elevation: 0,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  image: {
    elevation: 3,
    flex: 1,
    width: null,
    height: null,
    resizeMode: "cover",
  },
  bgimage: {
    width: "100%",
    resizeMode: "contain",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  avatar: {
    marginRight: 10,
  },
  info: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 6,
    backgroundColor: "white",
    padding: 10,
  },
  name: {
    fontSize: 25,
    color: "black",
    fontFamily: "GibsonB",
  },
  price: {
    fontSize: 22,
    color: "black",
    fontFamily: "GibsonR",
  },
  noteContainer: {
    backgroundColor: "#E1E1E1",
    height: 50,
    width: 50,
    borderRadius: 5,
    elevation: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  note: {
    fontSize: 20,
    color: "black",
    fontFamily: "GibsonB",
  },
  touchableOpacityStyle: {
    position: "absolute",
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    right: 30,
    bottom: 30,
    backgroundColor: "#40693E",
    elevation: 6,
    borderRadius: 1000,
  },
});
