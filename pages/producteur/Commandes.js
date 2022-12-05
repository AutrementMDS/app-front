import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { Page } from "../../components/Page";
import logo from "../../assets/logo/basic_logo.png";
import React, { useEffect } from "react";
import { getProducteurOrders } from "../../modules/database";
import { useFocusEffect } from "@react-navigation/native";

export function ProducteurOrdersScreen({ route, navigation }) {
  const [orders, setOrders] = React.useState([]);
  const [totalPrice, setTotalPrice] = React.useState(0);

  useFocusEffect(
    React.useCallback(() => {
      getOrders();
    }, [])
  );

  async function getOrders() {
    let orders = await getProducteurOrders();
    computeTotalOrders(orders);
    setOrders(orders);
  }

  function computeTotalOrders(orders) {
    let total = 0;

    Object.keys(orders).map(function (key, index) {
      let pack = orders[key];
      for (let p of pack) {
        total += p.price;
      }
    });
    setTotalPrice(total.toFixed(2));
  }

  return (
    <View style={{ margin: 10 }}>
      <View>
        {Object.keys(orders).map(function (key, index) {
          let pack = orders[key];
          return (
            <View style={styles.card} key={index}>
              <Text style={styles.cardTitle}>{`Commande n°${key}`}</Text>
              <View style={styles.cardContent}>
                {pack.map((p, index) => (
                  <View style={styles.cardContentItem} key={index}>
                    <Text style={styles.cardContentItemTitle}>
                      {p.product.data.attributes.name}
                    </Text>
                    <Text
                      style={styles.cardContentItemPrice}
                    >{`${p.quantity}`}</Text>
                  </View>
                ))}
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 10,
    backgroundColor: "#D5D5D5",
    width: "100%",
    height: 100,
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 20,
  },
  cardTitle: {
    fontFamily: "GibsonB",
    fontSize: 20,
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  cardContentItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  cardContentItemTitle: {
    fontFamily: "GibsonR",
    fontSize: 15,
  },
  cardContentItemPrice: {
    fontFamily: "GibsonB",
    fontSize: 15,
  },
});
