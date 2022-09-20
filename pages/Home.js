import * as React from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import { Button } from "react-native-paper";
import { getProducts, getUsers, register } from "../modules/database";
import { getItem } from "../store/store.native";

export function HomeScreen({ navigation }) {
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    getItem("user").then((user) => {
      let parsedUser = JSON.parse(user);
      getProducts(parsedUser.jwt).then((products) => {
        setProducts(products);
      });
    });
  }, []);

  const styles = StyleSheet.create({
    item: {
      backgroundColor: "#D1D1D1",
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius: 20,
    },
    title: {
      fontSize: 32,
    },
  });

  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.name}>{title}</Text>
    </View>
  );

  const renderItem = ({ item }) => <Item title={item.name} />;

  return (
    <View>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
