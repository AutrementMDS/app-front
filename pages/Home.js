import * as React from "react";
import { View, FlatList, StyleSheet, Text, ImageBackground, } from "react-native";
import { Button } from "react-native-paper";
import { Card } from "react-native-paper";
import { getProducts, getUsers, register } from "../modules/database";
import { getItem } from "../store/store.native";
import carrots from '../assets/images/carrots.jpg'; 

export function HomeScreen({ navigation }) {
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    getItem("user").then((user) => {
      let parsedUser = JSON.parse(user);
      getProducts(parsedUser.jwt).then((products) => {
        console.log(products)
        setProducts(products);
      });
    });
  }, []);

  const cardsItem = ({item}) => {
    console.log(item.name)
    return(
      <View>
      <Card style={styles.cardContainer}>
        <ImageBackground source={carrots} style={{width: '100%', height: '100%', borderRadius:'5'}}>
          <View style={styles.info}>
            <Text style={styles.text}>
              {item.name}
            </Text>
            <Text style={styles.text}>
              {item.price} /Kg
            </Text>
            <Text style={[styles.note, { textAlign: "right" }]}>
                2
            </Text>
          </View>
        </ImageBackground>
      </Card>
      </View>
    )
  }

  return (
    <View>
      <FlatList
        data={products}
        renderItem={cardsItem}
        keyExtractor={(item) => item.id}
      />
    </View>
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
    position:'absolute',
    bottom: 0,
  },
  text: {
    fontSize: 36,
    color: "black",
    marginLeft: 5,
    marginRight: 5,
    fontFamily: "GibsonR",
  },
  note: {
    textAlign:'right',
  }
})