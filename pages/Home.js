import React from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  Pressable,
  RefreshControl,
  ScrollView,
  Platform,
} from "react-native";
import { Card } from "react-native-paper";
import {
  getProducts,
  getUsers,
  register,
  getProductsReview,
  getCategories,
  getProductsByCategory,
} from "../modules/database";
import { getItem } from "../store/store.js";
import { Page } from "../components/Page";
import { HomeHeader } from "../components/home/HomeHeader";
import icon_all from "../assets/logo/basic_logo.png";
import icon_fruit from "../assets/icons/icon_fruit.png";
import icon_legume from "../assets/icons/icon_legume.png";
import icon_viande from "../assets/icons/icon_viande.png";
import icon_fromage from "../assets/icons/icon_fromage.png";
import icon_boisson from "../assets/icons/icon_boisson.png";
import icon_alcool from "../assets/icons/icon_alcool.png";
import icon_autre from "../assets/icons/icon_autre.png";
import icon_dessert from "../assets/icons/icon_dessert.png";
import { isOnWeb } from "../modules/utils";
import Ionicons from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import map from "../assets/images/map.jpg";

export const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = React.useState([]);
  const [user, setUser] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [actualCat, setActualCat] = React.useState("all");

  React.useEffect(() => {
    getItem("user").then((user) => {
      let parsedUser = JSON.parse(user);
      setUser(parsedUser);
      getProducts(parsedUser.jwt).then((products) => {
        var promises = [];

        for (let product of products) {
          promises.push(
            getProductsReview(parsedUser.jwt, product.id).then((review) => {
              product.review = review;
            })
          );
        }

        Promise.all(promises).then(() => {
          setProducts(products);
        });
      });
    });
  }, []);

  React.useEffect(() => {
    if (products.length == 0) {
      setProducts([
        {
          id: 0,
          empty: true,
          text: "Aucun produit trouvé",
        },
      ]);
    }
  }, [products]);

  async function searchByCategory(cat) {
    setProducts([{ empty: true, id: 0, text: "Chargement..." }]);
    setActualCat(cat);
    let newProducts;
    if (cat == "all") {
      newProducts = await getProducts(user.jwt);
    } else {
      newProducts = await getProductsByCategory(user.jwt, cat);
    }
    var promises = [];

    for (let product of newProducts) {
      promises.push(
        getProductsReview(user.jwt, product._id).then((review) => {
          product.review = review;
        })
      );
    }

    Promise.all(promises).then(() => {
      setProducts(newProducts);
    });
  }

  const ItemCategory = ({ index, item }) => {
    function getColor(name) {
      switch (name.toLowerCase()) {
        case "legume":
          return "#C5EDAD";
        case "fruit":
          return "#F4E0AB";
        case "viande":
          return "#FFB6A6";
        case "fromage":
          return "#F1D058";
        case "dessert":
          return "#EEE7CC";
        case "boisson":
          return "#C5DFED";
        case "alcool":
          return "#B4CBC4";
        case "placeholder":
          return "#E6E6E6";
        default:
          return "#E1E1E1";
      }
    }
    function getIconLogo(name) {
      switch (name.toLowerCase()) {
        case "all":
          return icon_all;
        case "fruit":
          return icon_fruit;
        case "legume":
          return icon_legume;
        case "viande":
          return icon_viande;
        case "fromage":
          return icon_fromage;
        case "dessert":
          return icon_dessert;
        case "boisson":
          return icon_boisson;
        case "alcool":
          return icon_alcool;
        case "autre":
          return icon_autre;
        default:
          return icon_fruit;
      }
    }
    return (
      <Pressable
        onPress={() => {
          searchByCategory(item.name);
        }}
      >
        <View
          style={{
            ...styles.listContainer,
            backgroundColor: getColor(item.name),
          }}
        >
          {item.name != "placeholder" && (
            <View style={styles.listItemContainer}>
              <View style={styles.listItemIcon}>
                <Image
                  style={styles.listItemIconImage}
                  source={getIconLogo(item.name)}
                />
              </View>
              <Text style={styles.listItemName}>
                {item.name == "all"
                  ? "Tout"
                  : item.name.charAt(0).toUpperCase() + item.name.slice(1)}
              </Text>
            </View>
          )}
        </View>
      </Pressable>
    );
  };

  const CardsItem = ({ item, index }) => {
    if (item.empty) {
      return (
        <View>
          <View style={styles.emptyProductsContainer}>
            <Text style={styles.emptyProducts}>{item.text}</Text>
          </View>
        </View>
      );
    }
    return (
      <View>
        <Pressable
          onPress={() => {
            navigation.navigate("ProduitDetail", { product: item });
          }}
        >
          <Card style={styles.cardContainer}>
            <View
              style={{
                height: Dimensions.get("window").height / 3.5,
              }}
            >
              <Image source={{ uri: item.image }} style={styles.image}></Image>
            </View>
            <View style={styles.info}>
              <View>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>
                  {parseFloat(item.price).toFixed(2)}€ /{" "}
                  {item.pricetype.data.attributes.name.charAt(0).toUpperCase() +
                    item.pricetype.data.attributes.name.slice(1)}
                </Text>
              </View>
              <View style={styles.noteContainer}>
                <Text style={styles.note}>
                  {item.review == -1 ? "-" : parseFloat(item.review).toFixed(1)}
                </Text>
              </View>
            </View>
          </Card>
        </Pressable>
      </View>
    );
  };

  const CategoriesList = () => {
    const [data, setData] = React.useState([
      {
        id: 0,
        name: "placeholder",
      },
      {
        id: 1,
        name: "placeholder",
      },
      {
        id: 2,
        name: "placeholder",
      },
      {
        id: 3,
        name: "placeholder",
      },
    ]);

    async function fetchCats() {
      let cats = await getCategories(user.jwt);
      setData([{ id: 0, name: "all" }, ...cats]);
    }

    React.useEffect(() => {
      fetchCats();
    }, []);

    return (
      <FlatList
        horizontal={true}
        data={data}
        renderItem={ItemCategory}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  return (
    <Page>
      <HomeHeader />
      <View
        style={{
          // height: 260,
          height: 100,
        }}
      >
        <CategoriesList />
        {/* <View
          style={{
            backgroundColor: "#DE6E2F",
            height: 150,
            justifyContent: "space-between",
            alignItems: "center",
            // width: Dimensions.get("window").width,
            borderRadius: 10,
            marginTop: 10,
            marginBottom: 10,
            padding: 20,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <LinearGradient
            // Background Linear Gradient
            colors={["transparent", "#381704"]}
            style={{
              position: "absolute",
              right: 0,
              bottom: 0,
              height: "100%",
              width: "150%",
            }}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 20,
                fontFamily: "GibsonB",
              }}
            >
              Nouvelle recette d'automne disponible !
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 15,
                fontFamily: "GibsonB",

                marginTop: 10,
                marginBottom: 10,
              }}
            >
              Crumble de potiron au parmesan
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Text
              style={{
                color: "#FFC5A5",
                fontSize: 20,
                fontFamily: "GibsonB",
              }}
            >
              Découvrir
            </Text>
            <Ionicons
              style={{
                color: "#FFC5A5",
              }}
              name="arrow-forward"
              size={20}
            />
          </View>
        </View> */}
      </View>
      {isOnWeb() ? (
        <FlatList
          numColumns={3}
          contentContainerStyle={{ paddingBottom: 30 }}
          data={products}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  margin: 5,
                  width: Dimensions.get("window").width / 3,
                  height: Dimensions.get("window").height / 2.5,
                }}
              >
                <CardsItem item={item} index={index} />
              </View>
            );
          }}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                searchByCategory(actualCat);
              }}
            />
          }
        />
      ) : (
        <FlatList
          contentContainerStyle={{ paddingBottom: 20 }}
          data={products}
          renderItem={({ item, index }) => {
            return <CardsItem item={item} index={index} />;
          }}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                searchByCategory(actualCat);
              }}
            />
          }
        />
      )}
    </Page>
  );
};

const styles = StyleSheet.create({
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
    borderRadius: 10,
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
  listContainer: {
    backgroundColor: "#E1E1E1",
    height: 90,
    width: 90,
    borderRadius: 10,
    elevation: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    marginBottom: 10,
  },
  listItemContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: "100%",
    //padding: 5,
  },
  listItemIcon: {
    flex: 3,
    display: "flex",
    height: 50,
    width: 50,
  },
  listItemIconImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "contain",
  },
  listItemName: {
    fontFamily: "GibsonR",
    color: "#40693E",
    flex: 1,
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
