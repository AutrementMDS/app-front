import * as React from "react";
import { Text, View, StyleSheet, ImageBackground, FlatList } from "react-native";
import { Card } from "react-native-paper";
import { CustomButton } from "../components/CustomButton";
import { Page } from "../components/Page";
import { getProducts } from "../modules/database";
import { getItem } from "../store/store.native";

export function PanierScreen() {

  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    getItem("user").then((user) => {
      let parsedUser = JSON.parse(user);
      getProducts(parsedUser.jwt).then((products) => {
        setProducts(products);
      });
    });
  }, []);

  function submitPanier() {
    console.log("panier valider");
  }

  const cardsItem = ({ item }) => {
    return (
      <View>
        <Card style={styles.cardContainer}>
          <ImageBackground
            source={{uri:item.image}}
            style={{ width: "100%", height: "100%", borderRadius: "5" }}
          >
            <View style={styles.info}>
              <Text style={styles.text}>{item.name}</Text>
              <View style={styles.flex}>
                <Text style={styles.nb}>{item.price} /Kg</Text>
                <Text style={[styles.prix, { textAlign: "right" }]}>2 €</Text>
              </View>
            </View>
          </ImageBackground>
        </Card>
      </View>
    );
  };

  return (
    <Page >
      <FlatList
        data={products}
        renderItem={cardsItem}
        keyExtractor={(item) => item.id}
      />
      <CustomButton
        type="primary"
        text="Valider mon panier"
        onPress={() => submitPanier()}
      ></CustomButton>
    </Page>
  );
}
const styles = StyleSheet.create({
  cardContainer:{
    margin:15,
    elevation:1,
    height:200,
    borderRadius:5,
    position: 'relative'
  },
  info: {
    width:"100%",
    position:'absolute',
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  flex: {
    flex:1,
    display:"flex",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 22,
    color: "white",
    marginLeft: 5,
    marginRight: 5,
    fontFamily: "GibsonR",
  },
  nb: {
    fontSize: 20,
    color: "white",
    marginLeft: 5,
    marginRight: 5,
    fontFamily: "GibsonR",
  },
  prix: {
    textAlign:'right',
    color: "white",
    fontSize: 20,
    fontFamily: "GibsonR",
  }
})
