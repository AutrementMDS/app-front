import * as React from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  FlatList,
  Pressable,
} from "react-native";
import { Avatar } from "react-native-paper";
import {
  getProducteurImages,
  getProductsByProducteur,
} from "../modules/database";
import { isOnWeb } from "../modules/utils";
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { CustomButton } from "../components/CustomButton";

const Product = ({ navigation, item, index }) => {
  return (
    <Pressable
      onPress={() => {
        navigation.navigate("ProduitDetail", { product: item });
      }}
    >
      <View style={styles.productContainer}>
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
              <Text style={styles.price}>{`${item.price}€ / ${
                item.pricetype.data.attributes.name.charAt(0).toUpperCase() +
                item.pricetype.data.attributes.name.slice(1)
              }`}</Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export const ProducteurScreen = ({ route, navigation }) => {
  const { producteur, producteurID } = route.params;
  const [images, setImages] = React.useState([]);
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
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
     * Get producer's images
     */
    getImages();
  }, []);

  async function getImages() {
    let images = await getProducteurImages(producteurID);
    setImages(images);
  }

  useFocusEffect(
    React.useCallback(() => {
      fetchProducts();
    }, [])
  );

  async function fetchProducts() {
    let products = await getProductsByProducteur(producteurID);
    setProducts(products);
  }

  function getProducteurProduct() {
    if (isOnWeb()) {
      return (
        <FlatList
          numColumns={3}
          data={products}
          renderItem={({ item, index }) => {
            return (
              <>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "column",
                    margin: 5,
                    width: Dimensions.get("window").width / 3,
                    height: Dimensions.get("window").height / 3,
                  }}
                >
                  <Product navigation={navigation} item={item} index={index} />
                </View>
              </>
            );
          }}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
      );
    } else {
      return (
        <FlatList
          contentContainerStyle={{ paddingBottom: 80 }}
          data={products}
          renderItem={({ item, index }) => {
            return (
              <>
                <Product navigation={navigation} item={item} index={index} />
              </>
            );
          }}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
      );
    }
  }

  /**
   * Retun main component
   */
  return (
    <ScrollView>
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
                color="white"
                style={{
                  backgroundColor: "#40693E",
                }}
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

        <FlatList
          numColumns={isOnWeb() ? 3 : 1}
          data={images}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  justifyContent: "center",
                  margin: 5,
                  width:
                    Dimensions.get("window").width / (isOnWeb() ? 3 : 1.15),
                  height: Dimensions.get("window").height / 3,
                }}
              >
                {isOnWeb() ? (
                  <Image
                    style={styles.image}
                    source={{
                      uri: item.attributes.link,
                    }}
                  />
                ) : (
                  <View key={index} style={styles.imageContainer}>
                    <Image
                      style={styles.image}
                      source={{
                        uri: item.attributes.link,
                      }}
                    />
                  </View>
                )}
              </View>
            );
          }}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />

        <Text style={styles.contentTitle}>SES PRODUITS</Text>

        {getProducteurProduct()}
        {/* {images.map((image, index) => {
          return (
            <View key={index} style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={{
                  uri: image.attributes.link,
                }}
              />
            </View>
          );
        })} */}
      </View>
    </ScrollView>
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
  imageContainer: {
    width: Dimensions.get("window").width / 1.15,
    height: 200,
    marginTop: 10,
    borderRadius: 10,
  },
  image: {
    borderRadius: 10,
    elevation: 3,
    flex: 1,
    width: null,
    height: null,
    resizeMode: "cover",
  },
  avatar: {
    marginRight: 10,
  },

  productContainer: {
    height: Dimensions.get("window").height / 3,
    position: "relative",
    margin: 5,
    marginTop: 15,
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
