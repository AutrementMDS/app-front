import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { Page } from "../../components/Page";
import logo from "../../assets/logo/basic_logo.png";
import React, { useEffect } from "react";
import { getProducteurOrders, getProductById } from "../../modules/database";
import { useFocusEffect } from "@react-navigation/native";
import { DateTime } from "luxon";

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
              <Text style={styles.cardTitle}>{`Commande #${key}`}</Text>
              <View style={styles.cardContent}>{getOrdersDetail(pack)}</View>

              <Text
                style={styles.dateRetrait}
              >{`Retrait le ${DateTime.fromFormat(
                pack[0].dateRetrait,
                "yyyy-MM-dd"
              )
                .setLocale("fr")
                .toFormat("dd MMMM yyyy")}`}</Text>
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
    backgroundColor: "#ADC8A1",
    width: "100%",
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 15,
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
    backgroundColor: "#FBFFF9",
    padding: 10,
    width: "100%",
    borderRadius: 5,
    marginTop: 10,
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
    color: "#40693E",
  },
  cardContentItemPrice: {
    fontFamily: "GibsonB",
    fontSize: 15,
    color: "#40693E",
  },
  dateRetrait: {
    fontFamily: "GibsonR",
    fontSize: 15,
    color: "black",
    marginTop: 10,
  },
});
