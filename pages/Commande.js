import * as React from "react";
import { Text, View, FlatList, StyleSheet, Dimensions } from "react-native";
import { getOrders } from "../modules/database";
import { getItem } from "../store/store.native";
import "intl";
import "intl/locale-data/jsonp/fr";
import { DateTime } from "luxon";
import { useFocusEffect } from "@react-navigation/native";

export function CommandeScreen({ route, navigation }) {
  const [orders, setOrders] = React.useState([]);

  useFocusEffect(
    React.useCallback(() => {
      getItem("user").then(async (user) => {
        user = JSON.parse(user);
        let ordersList = await getOrders(user.jwt, user.id);
        console.log(ordersList);
        setOrders(ordersList);
      });
    }, [])
  );

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
    return "En attente";
  } else if (state == "delivered") {
    return "Livré";
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
            <Text style={styles.orderTitle}>Commande n°{item.id}</Text>
            <Text style={styles.orderState}>
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
          <Text style={styles.orderPrice}>{`${item.attributes.price}€`}</Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  orderContainer: {
    backgroundColor: "#40693E",
    margin: 10,
    borderRadius: 10,
    padding: 10,
    elevation: 6,
  },
  orderTitle: {
    fontSize: 20,
    color: "#E1E7DF",
    fontFamily: "GibsonB",
  },
  orderState: {
    fontSize: 15,
    color: "#E1E7DF",
    fontFamily: "GibsonB",
  },
  orderDate: {
    fontSize: 15,
    color: "#7E8B78",
    fontFamily: "GibsonR",
  },
  orderInfoContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
  },
  orderInfo: {
    color: "#ADC8A1",
    fontFamily: "GibsonR",
  },
  orderPrice: {
    fontSize: 22,
    color: "#E1E7DF",
    fontFamily: "GibsonB",
  },
});
