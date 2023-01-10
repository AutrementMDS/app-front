import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { Page } from "../../components/Page";
import logo from "../../assets/logo/basic_logo.png";
import React, { useEffect } from "react";
import { getProducteurOrders } from "../../modules/database";
import { useFocusEffect } from "@react-navigation/native";

export function ProducteurHomeScreen({ route, navigation }) {
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
    <Page>
      <View style={styles.container}>
        <Image source={logo} alt="logo" style={styles.image} />
        <Text style={styles.appName}>Autrement</Text>
      </View>
      <View>
        <View style={styles.dashboardCard}>
          <Text style={styles.dashboardCardContent}>{`${totalPrice} €`}</Text>
          <Text style={styles.dashboardCardContentSub}>{`Après déduction : ${(
            (totalPrice * (100 - 20)) /
            100
          ).toFixed(2)} €`}</Text>
        </View>
        <View style={styles.dashboardCard}>
          <Text style={styles.dashboardCardContent}>{`${
            Object.keys(orders).length
          } commandes`}</Text>
        </View>
      </View>
    </Page>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 5,
    width: "100%",
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  appName: {
    fontSize: 30,
    fontFamily: "GibsonB",
    color: "#40693E",
    marginLeft: 10,
  },
  dashboardCard: {
    marginTop: 20,
    backgroundColor: "#ADC8A1",
    width: "100%",
    height: 100,
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 20,
  },
  dashboardCardContent: {
    fontFamily: "GibsonB",
    fontSize: 30,
    color: "#40693E",
  },
  dashboardCardContentSub: {
    fontFamily: "GibsonR",
    fontSize: 15,
    color: "#272A26",
  },
});
