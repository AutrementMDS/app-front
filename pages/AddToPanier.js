import * as React from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Card } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { CustomInput } from "../components/CustomButton";
import { getItem, setItem, removeItem } from "../store/store.js";
import Ionicons from "@expo/vector-icons/Ionicons";

export const AddToPanier = ({ route, navigation }) => {
  let { product } = route.params;
  const [value, setValue] = React.useState("");
  const [actualItem, setActualItem] = React.useState(null);

  function calculatePrice(nv) {
    nv = nv ? nv : value;
    if (!nv) nv = 0;
    return parseFloat(nv.toString().replace(",", ".")) * product.price;
  }

  const INT = ["botte", "pièce"];

  function handleChange(nv) {
    if (INT.includes(product.pricetype.data.attributes.name)) {
      nv = nv.replace(/[^0-9]/g, "");
    } else {
      nv = nv.replace(/[^0-9,]/g, "");
      let group = nv.split(",");
      if (group[1]) {
        if (group[1].length > 2) {
          nv = group[0] + "," + group[1].substring(0, 2);
        }
      }
    }
    if (!nv) nv = "";
    setValue(nv);
    setActualItem(
      JSON.stringify({
        id: Math.random().toString(36).substr(2, 9),
        product: product.id,
        quantity: nv,
        price: calculatePrice(nv),
        producteur: product.producteur.data.id,
      })
    );
  }

  function addProductToPanier() {
    getItem("panier").then((panier) => {
      if (panier) {
        panier = JSON.parse(panier);
        panier.push(actualItem);
        setItem("panier", JSON.stringify(panier));
      } else {
        let np = [];
        np.push(actualItem);
        setItem("panier", JSON.stringify(np));
      }
      navigation.popToTop();
      navigation.navigate("Panier", {
        paramPropKey: "paramPropValue",
      });
    });
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        disabled={!value || value == 0}
        activeOpacity={0.7}
        style={{
          ...styles.touchableOpacityStyle,
          backgroundColor: !value || value == 0 ? "#ccc" : "#40693E",
        }}
        onPress={async () => {
          addProductToPanier();
        }}
      >
        <Ionicons name="cart-outline" size={28} color="white" />
      </TouchableOpacity>
      <Card style={styles.cardContainer}>
        <View
          style={{
            height: Dimensions.get("window").height / 4,
            position: "relative",
          }}
        >
          <Image
            source={{
              uri: `http://51.210.104.99:1556${product.image.data.attributes.url}`,
            }}
            style={styles.image}
          ></Image>

          <LinearGradient
            // Background Linear Gradient
            colors={["transparent", "rgba(0,0,0,0.8)"]}
            style={styles.fade}
          />
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
          </View>
        </View>

        <View
          style={{
            margin: 20,
            marginTop: 5,
            display: "flex",
            flexDirection: "column",
            // justifyContent: "space-between",
            height: Dimensions.get("window").height / 2,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <CustomInput
              style={{
                flex: 1,
                width: "100%",
              }}
              type="numeric"
              placeholder={
                INT.includes(product.pricetype.data.attributes.name)
                  ? "0"
                  : "0,00"
              }
              value={value}
              controller={handleChange}
            />
            {/* <Text
              style={{
                fontSize: 22,
                color: "black",
                fontFamily: "GibsonB",
                marginLeft: 10,
              }}
            >
              {product.pricetype.data.attributes.name}
            </Text> */}
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 15,
            }}
          >
            <Text
              style={{
                fontSize: 30,
                color: "black",
                fontFamily: "GibsonB",
              }}
            >
              Total :
            </Text>
            <Text
              style={{
                fontSize: 22,
                color: "black",
                fontFamily: "GibsonR",
              }}
            >
              {`${value} ${product.pricetype.data.attributes.name}`}
            </Text>
            <Text
              style={{
                fontSize: 22,
                color: "black",
                fontFamily: "GibsonR",
              }}
            >
              {`${calculatePrice(value).toFixed(2)}€`}
            </Text>
          </View>
        </View>
      </Card>
    </View>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1 },
  fade: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "50%",
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
  info: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "transparent",
    padding: 10,
    position: "absolute",
    width: "100%",
    bottom: 0,
  },
  name: {
    fontSize: 25,
    color: "#FAFAFA",
    fontFamily: "GibsonB",
  },
  price: {
    fontSize: 22,
    color: "#FAFAFA",
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
