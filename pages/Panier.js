import * as React from "react";
import { Text, View, StyleSheet, Dimensions, Image } from "react-native";
import { IconButton } from "react-native-paper";
import { getProductById, postOrder } from "../modules/database";
import { getItem, setItem, removeItem } from "../store/store.js";
import { LinearGradient } from "expo-linear-gradient";
import { FlatList } from "react-native";
import { CustomButton } from "../components/CustomButton";
import { useFocusEffect } from "@react-navigation/native";
import { isOnWeb } from "../modules/utils";

export function PanierScreen({ route, navigation }) {
  const [products, setProducts] = React.useState([]);
  const [panier, setPanier] = React.useState([]);

  useFocusEffect(
    React.useCallback(() => {
      getItem("user").then((user) => {
        user = JSON.parse(user);

        getItem("panier").then((res) => {
          let panier = JSON.parse(res);
          setPanier(panier);

          let promises = [];
          let items = [];

          panier &&
            panier.map((item) => {
              promises.push(
                new Promise(async (resolve, reject) => {
                  item = JSON.parse(item);
                  let product = await getProductById(item.product);
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
    }, [])
  );

  React.useEffect(() => {
    let total_price = 0;
    products.map((item) => {
      total_price += item.total_price;
    });
    route.params.setPanierPrice(total_price);
    //navigation.params.total_price = total_price;
  }, [products]);

  const PanierProduct = ({ item, index }) => {
    function removeProductById(id) {
      getItem("panier").then((res) => {
        let panier = JSON.parse(res);

        panier = panier.filter((item) => {
          item = JSON.parse(item);
          return item.product != id;
        });

        setItem("panier", JSON.stringify(panier)).then(() => {
          setProducts(products.filter((item) => item.id != id));
        });
      });
    }

    return (
      <>
        <View style={styles.productContainer}>
          <IconButton
            icon="delete-outline"
            size={25}
            color="black"
            onPress={() => {
              removeProductById(item.id);
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
          <Image
            source={{
              uri: `https://back.autrement.site${item.image.data.attributes.url}`,
            }}
            style={styles.image}
          ></Image>

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
                  {`${item.total_quantity} ${
                    item.pricetype.data.attributes.name
                      .charAt(0)
                      .toUpperCase() +
                    item.pricetype.data.attributes.name.slice(1)
                  }`}
                </Text>
                <Text style={styles.price}>{`${parseFloat(
                  item.total_price
                ).toFixed(2)}€`}</Text>
              </View>
            </View>
          </View>
        </View>
        {index == products.length - 1 && (
          <View
            style={{
              margin: 10,
            }}
          >
            <CustomButton
              type="primary"
              text="Valider mon panier"
              onPress={async () => {
                getItem("user").then(async (user) => {
                  let total_price = 0;
                  panier.map((item) => {
                    item = JSON.parse(item);
                    total_price += item.price;
                  });
                  await postOrder(
                    JSON.parse(user).jwt,
                    JSON.parse(user).id,
                    total_price,
                    panier.length,
                    panier
                  );
                  removeItem("panier").then(() => {
                    setProducts([]);
                    navigation.navigate("Commande");
                  });
                });
              }}
            ></CustomButton>
          </View>
        )}
      </>
    );
  };

  if (products.length == 0) {
    return (
      <View>
        <View style={styles.emptyProductsContainer}>
          <Text style={styles.emptyProducts}>Panier vide</Text>
        </View>
      </View>
    );
  }

  let date = new Date();
  let actualDay = date.getDate(); // - 1; // like 13 janvier
  let actualDayInWeek = date.getDay(); // - 1; // like 13 janvier

  if (actualDayInWeek <= 3) {
    let path = 5 - actualDayInWeek;
    date.setDate(actualDay + path);
  } else {
    let path = 5 - actualDayInWeek + 7;
    date.setDate(actualDay + path);
  }

  return (
    <div style={isOnWeb() ? styles.webContainer : {}}>
      <View style={styles.livraisonContainer}>
        <View>
          <Text
            style={styles.livraisonText}
          >{`📆 Prochaine date de retrait le ${date.toLocaleDateString(
            "fr-FR"
          )}`}</Text>
        </View>
      </View>
      <FlatList
        contentContainerStyle={{ paddingBottom: 80 }}
        data={products}
        renderItem={PanierProduct}
        keyExtractor={(item, index) => String(index)}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    </div>
  );
}

const styles = StyleSheet.create({
  webContainer: {
    width: "30%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  livraisonContainer: {
    position: "relative",
    margin: 10,
    padding: 10,
    marginTop: 10,
    marginBottom: 5,
    backgroundColor: "#40693E",
    borderRadius: 10,
    overflow: "hidden",
  },
  livraisonText: {
    fontSize: 15,
    color: "#FAFAFA",
    fontFamily: "GibsonB",
  },
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
