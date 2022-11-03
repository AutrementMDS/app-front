import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Dimensions,
  Image,
} from "react-native";
import { Card } from "react-native-paper";
import carrots from "../assets/images/carrots.jpg";
import { getProductById } from "../modules/database";
import { getItem, setItem } from "../store/store.native";
import { LinearGradient } from "expo-linear-gradient";

export function PanierScreen({ route }) {
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    getItem("user").then((user) => {
      user = JSON.parse(user);

      getItem("panier").then((res) => {
        let panier = JSON.parse(res);

        let promises = [];
        let items = [];

        panier.map((item) => {
          promises.push(
            new Promise(async (resolve, reject) => {
              item = JSON.parse(item);
              let product = await getProductById(user.jwt, item.product);
              product.total_quantity = item.quantity;
              product.total_price = item.price;
              items.push(product);
              resolve();
            })
          );
        });

        Promise.all(promises).then((res) => {
          setProducts(items);
        });
      });
    });
  }, [route]);

  return (
    <View>
      {products.map((product) => {
        return (
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
        );
      })}
    </View>
  );
}
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
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  flex: {
    flex: 1,
    display: "flex",
    justifyContent: "space-between",
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
