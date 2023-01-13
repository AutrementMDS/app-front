import * as React from "react";
import { Text, View, FlatList, StyleSheet, Dimensions } from "react-native";
import { getOrders } from "../modules/database";
import { getItem } from "../store/store.js";
import "intl";
import "intl/locale-data/jsonp/fr";
import { DateTime } from "luxon";
import { useFocusEffect } from "@react-navigation/native";
import { Divider } from "react-native-paper";

export function CommandeScreen({ route, navigation }) {
  const [orders, setOrders] = React.useState([]);

  useFocusEffect(
    React.useCallback(() => {
      getItem("user").then(async (user) => {
        user = JSON.parse(user);
        let ordersList = await getOrders(user.jwt, user.id);
        setOrders(ordersList);
      });
    }, [])
  );

  if (orders.length == 0) {
    return (
      <View>
        <View style={styles.emptyProductsContainer}>
          <Text style={styles.emptyProducts}>Aucunes Commandes</Text>
        </View>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        contentContainerStyle={{ paddingBottom: 80 }}
        data={orders}
        renderItem={OrderItem}
        keyExtractor={(item, index) => String(index)}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

function getCorrectState(state) {
  if (state == "waiting") {
    return "En préparation";
  } else if (state == "delivered") {
    return "Prête";
  } else if (state == "canceled") {
    return "Annulée";
  } else if (state == "paid") {
    return "Récupérée";
  }
}

const OrderItem = ({ item, index }) => {
  let date = DateTime.fromISO(item.attributes.createdAt)
    .setLocale("fr")
    .toLocaleString(DateTime.DATETIME_FULL);
  return (
    <>
      <View style={styles.orderContainer}>
        <View
          style={{
            marginBottom: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={styles.orderTitle}>Commande #{item.id}</Text>
            <Text style={styles[item.attributes.state]}>
              {getCorrectState(item.attributes.state)}
            </Text>
          </View>
          <Text style={styles.orderDate}>{date}</Text>
        </View>
        <View style={styles.orderInfoContainer}>
          <Text style={styles.orderInfo}>
            {`${item.attributes.articles} ${
              item.attributes.articles > 1 ? "articles" : "article"
            }`}
          </Text>
          <Text style={styles.orderPrice}>{`${item.attributes.price.toFixed(
            2
          )}€`}</Text>
        </View>
        <Divider
          bold={true}
          style={{
            color: "#384539",
          }}
        />
        <Text
          style={styles.dateRetrait}
        >{`Retrait prévu le : ${item.attributes.dateRetrait
          .split("-")
          .reverse()
          .join("/")} à Annecy`}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  orderContainer: {
    margin: 10,
    borderRadius: 10,
    padding: 10,
    elevation: 3,
    backgroundColor: "#fff",
  },
  orderTitle: {
    fontSize: 20,
    color: "#747e75",
    fontFamily: "GibsonB",
  },
  waiting: {
    fontSize: 11,
    color: "#000002",
    backgroundColor: "#eff6ff",
    borderRadius: 5,
    fontFamily: "GibsonR",
    borderWidth: 1,
    borderColor: "#cbdff8",
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 5,
    paddingRight: 5,
  },
  delivered: {
    fontSize: 11,
    color: "#000002",
    backgroundColor: "#f3ffef",
    borderRadius: 5,
    fontFamily: "GibsonR",
    borderWidth: 1,
    borderColor: "#d6f8cc",
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 5,
    paddingRight: 5,
  },
  paid: {
    fontSize: 11,
    color: "#000002",
    backgroundColor: "#fffeef",
    borderRadius: 5,
    fontFamily: "GibsonR",
    borderWidth: 1,
    borderColor: "#f8f7cb",
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 5,
    paddingRight: 5,
  },
  orderDate: {
    fontSize: 15,
    color: "#7E8B78",
    fontFamily: "GibsonR",
  },
  dateRetrait: {
    fontSize: 15,
    color: "#37483a",
    fontFamily: "GibsonR",
    marginTop: 10,
  },
  orderInfoContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
  },
  orderInfo: {
    color: "#384539",
    fontFamily: "GibsonR",
  },
  orderPrice: {
    fontSize: 22,
    color: "#384539",
    fontFamily: "GibsonB",
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
