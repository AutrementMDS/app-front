import * as React from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
  Pressable,
} from "react-native";
import { Card } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { CustomInput } from "../components/CustomButton";
import { getItem, setItem, removeItem } from "../store/store.native";

export const AddToPanier = ({ route, navigation }) => {
  let { product, test } = route.params;
  navigation.title = "test";
  const [value, setValue] = React.useState(0);

  function calculatePrice(nv) {
    nv = nv ? nv : value;
    return parseFloat(nv.toString().replace(",", ".")) * product.price;
  }

  function handleChange(nv) {
    setValue(nv);
    setItem(
      "actualItem",
      JSON.stringify({
        product: product.id,
        quantity: nv,
        price: calculatePrice(nv),
      })
    );
  }

  return (
    <View style={styles.container}>
      <Card style={styles.cardContainer}>
        <View
          style={{
            height: Dimensions.get("window").height / 4,
            position: "relative",
          }}
        >
          <Image source={{ uri: product.image }} style={styles.image}></Image>

          <LinearGradient
            // Background Linear Gradient
            colors={["transparent", "rgba(0,0,0,0.8)"]}
            style={styles.fade}
          />
          <View style={styles.info}>
            <View>
              <Text style={styles.name}>{product.name}</Text>
              <Text style={styles.price}>
                {parseInt(product.price).toFixed(2)}€ /{" "}
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
            justifyContent: "space-between",
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
                flex: 5,
              }}
              type="numeric"
              placeholder="0.00"
              value={value}
              controller={handleChange}
            />
            <View
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 22,
                  color: "black",
                  fontFamily: "GibsonB",
                }}
              >
                Kg
              </Text>
            </View>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "column",
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
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontSize: 22,
                  color: "black",
                  fontFamily: "GibsonR",
                }}
              >
                {value}
                {product.pricetype.data.attributes.name}
              </Text>
              <Text
                style={{
                  fontSize: 22,
                  color: "black",
                  fontFamily: "GibsonR",
                }}
              >
                {calculatePrice().toFixed(2)}€
              </Text>
            </View>
          </View>
        </View>
      </Card>
    </View>
  );
};
const styles = StyleSheet.create({
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
});
