import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { Page } from "../../components/Page";
import logo from "../../assets/logo/basic_logo.png";
import React, { useEffect } from "react";
import { getProducteurOrders, getProductById } from "../../modules/database";
import { useFocusEffect } from "@react-navigation/native";

export function ProducteurOrdersScreen({ route, navigation }) {
  const [orders, setOrders] = React.useState([]);

  useFocusEffect(
    React.useCallback(() => {
      getOrders();
    }, [])
  );

  async function getOrders() {
    let orders = await getProducteurOrders();

    for (let i = 0; i < Object.keys(orders).length; i++) {
      let order = orders[Object.keys(orders)[i]];

      for (let i = 0; i < order.length; i++) {
        let product = await getProductById(order[i].product.data.id);
        order[i].product = product;
      }
    }

    setOrders(orders);
  }

  function getOrdersDetail(pack) {
    let res = [];
    pack.map((p, index) => {
      res.push(
        <View style={styles.cardContentItem} key={index}>
          <Text style={styles.cardContentItemTitle}>{p?.product?.name}</Text>
          <Text
            style={styles.cardContentItemPrice}
          >{`${p.quantity} ${p.product?.pricetype?.data?.attributes?.name}`}</Text>
        </View>
      );
    });
    return res;
  }

  return (
    <View style={{ margin: 10 }}>
      <View>
        {Object.keys(orders).map(function (key, index) {
          let pack = orders[key];
          return (
            <View style={styles.card} key={index}>
              <Text style={styles.cardTitle}>{`Commande n°${key}`}</Text>
              <View style={styles.cardContent}>{getOrdersDetail(pack)}</View>
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
