import { useFocusEffect } from "@react-navigation/native";
import * as React from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import { Button, Card } from "react-native-paper";
import { CustomButton, CustomInput } from "../../components/CustomButton";
import { updateProduct } from "../../modules/database";
import { getItem } from "../../store/store";
import DocumentPicker from "react-native-document-picker";

export function ProducteurAddProductScreen({ route, navigation }) {
  const [categories, setCategories] = React.useState([]);
  const [pricetype, setPriceType] = React.useState([]);

  /* Product fields */
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [stock, setStock] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [productPriceType, setProductPriceType] = React.useState("");
  const [productCategory, setProductCategory] = React.useState("");
  const [productImage, setProductImage] = React.useState("");

  useFocusEffect(
    React.useCallback(() => {
      getItem("user").then(async (user) => {
        user = JSON.parse(user);
      });
    }, [])
  );

  async function saveProduct() {
    // await updateProduct(product.id, name, price, stock, description);
    navigation.pop();
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Card style={styles.cardContainer}>
          <View>
            <CustomButton
              text="Ajouter une image"
              type="primary"
              onPress={() => {}}
            />
          </View>
          {/* <View
            style={{
              height: Dimensions.get("window").height / 4,
            }}
          >
            {/* <Image source={{ uri: product.image }} style={styles.image}></Image> */}
          {/* </View> */}
          <View style={styles.info}>
            {/* <View>
              <Text style={styles.name}>{product.name}</Text>
              <Text style={styles.price}>
                {parseFloat(product.price).toFixed(2)}€ /{" "}
                {product.pricetype.data.attributes.name
                  .charAt(0)
                  .toUpperCase() +
                  product.pricetype.data.attributes.name.slice(1)}
              </Text>
            </View> */}
            <CustomInput
              placeholder="Nom produit"
              value={name}
              controller={(val) => {
                setName(val);
              }}
              left="pencil"
            />
            <CustomInput
              placeholder="Prix unitaire"
              value={price.toString()}
              controller={(val) => {
                setPrice(val);
              }}
              left="card"
            />
            <CustomInput
              placeholder="stock"
              value={stock.toString()}
              controller={(val) => {
                setStock(val);
              }}
              left="cube"
            />
            <CustomInput
              placeholder="Description"
              value={description}
              controller={(val) => {
                setDescription(val);
              }}
              textArea
            />

            <View
              style={{
                marginTop: 30,
              }}
            >
              <CustomButton
                text="Enregistrer"
                type="primary"
                onPress={() => {
                  saveProduct();
                }}
              />
              <CustomButton
                text="Annuler"
                type="secondary"
                onPress={() => {
                  navigation.pop();
                }}
              />
            </View>
          </View>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
    // display: "flex",
    // flexDirection: "row",
    // alignItems: "center",
    // justifyContent: "space-between",
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 4,
    // },
    // elevation: 6,
    // backgroundColor: "white",
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
