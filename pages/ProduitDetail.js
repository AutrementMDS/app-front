import * as React from "react";
import { Text, View, Image, StyleSheet, Dimensions } from "react-native";
import { Avatar, Card, Divider } from "react-native-paper";

export const ProduitDetail = ({ route, navigation }) => {
  let { product } = route.params;
  navigation.title = "test";
  return (
    <View style={styles.container}>
      <Card style={styles.cardContainer}>
        <View
          style={{
            height: Dimensions.get("window").height / 4,
          }}
        >
          <Image source={{ uri: product.image }} style={styles.image}></Image>
        </View>
        <View style={styles.info}>
          <View>
            <Text style={styles.name}>{product.name}</Text>
            <Text style={styles.price}>
              {parseInt(product.price).toFixed(2)}€ /{" "}
              {product.pricetype.data.attributes.name.charAt(0).toUpperCase() +
                product.pricetype.data.attributes.name.slice(1)}
            </Text>
          </View>
          <View style={styles.noteContainer}>
            <Text style={styles.note}>
              {product.review == -1
                ? "-"
                : parseFloat(product.review).toFixed(1)}
            </Text>
          </View>
        </View>
        <View style={styles.producteur}>
          <View style={styles.prod_info}>
            <View style={styles.avatar}>
              {/* <Avatar rounded title="MD" /> */}
              <Avatar.Image
                size={50}
                source="https://htmlcolorcodes.com/assets/images/colors/gray-color-solid-background-1920x1080.png"
              />
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
              textAlign: "center",
            }}
          >
            {product.description}
          </Text>
        </View>
      </Card>
    </View>
    </Page>
  );
};
const styles = StyleSheet.create({
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
  avatar: {
    marginRight: 10,
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
    width: 100,
    height: 100,
    borderWidth: 2,
    borderRadius: 75
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
    fontSize: 22,
    color: "black",
    fontFamily: "GibsonB",
  },
});
