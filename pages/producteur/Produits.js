import * as React from "react";
import { Text, View, StyleSheet, Dimensions, Image } from "react-native";
import { IconButton } from "react-native-paper";
import { getProductsByProducteur } from "../../modules/database";
import { getItem, setItem, removeItem } from "../../store/store.native";
import { LinearGradient } from "expo-linear-gradient";
import { FlatList } from "react-native";
import { CustomButton } from "../../components/CustomButton";
import { useFocusEffect } from "@react-navigation/native";

export function ProducteurProductsScreen({ route, navigation }) {
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    let products = await getProductsByProducteur();
    setProducts(products);
  }

  const Product = ({ item, index }) => {
    return (
      <>
        <View style={styles.productContainer}>
          <IconButton
            icon="pencil-outline"
            size={25}
            color="black"
            onPress={() => {
              //removeProductById(item.id);
            }}
            style={{
              backgroundColor: "white",
              margin: 0,
              position: "absolute",
              top: 5,
              right: 5,
              zIndex: 300,
            }}
            animated={true}
          />
          <Image source={{ uri: item.image }} style={styles.image}></Image>

          <LinearGradient
            colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.8)"]}
            style={styles.fade}
          />
          <View style={styles.info}>
            <View
              style={{
                width: "100%",
              }}
            >
              <Text style={styles.name}>{item.name}</Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.price}>
                  {`${item.stock} ${
                    item.pricetype.data.attributes.name
                      .charAt(0)
                      .toUpperCase() +
                    item.pricetype.data.attributes.name.slice(1)
                  }`}
                </Text>
                <Text style={styles.price}>{`${item.price}€ / ${
                  item.pricetype.data.attributes.name.charAt(0).toUpperCase() +
                  item.pricetype.data.attributes.name.slice(1)
                }`}</Text>
              </View>
            </View>
          </View>
        </View>
      </>
    );
  };

  if (products.length == 0) {
    return (
      <View>
        <View style={styles.emptyProductsContainer}>
          <Text style={styles.emptyProducts}>Aucun produit</Text>
        </View>
      </View>
    );
  }

  return (
    <FlatList
      contentContainerStyle={{ paddingBottom: 80 }}
      data={products}
      renderItem={Product}
      keyExtractor={(item, index) => String(index)}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  productContainer: {
    height: Dimensions.get("window").height / 4,
    position: "relative",
    margin: 10,
    borderRadius: 10,
  },
  fade: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "50%",
    borderRadius: 10,
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
    borderRadius: 10,
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
  emptyProductsContainer: {
    display: "flex",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyProducts: {
    textAlign: "center",
    fontFamily: "GibsonB",
    color: "#40693E",
  },
});
