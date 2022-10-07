import * as React from "react";
import { Text, View, Image, StyleSheet} from "react-native";
import carrots from '../assets/images/carrots.jpg';

export function ProduitDetailScreen() {
  return (
    <View style={styles.container}>
      <Image source={carrots} style={{width: '100%', height: '100%'}}></Image>
      <View style={styles.info}>
        <Text style={styles.text}>
          Carrotes
        </Text>
        <Text style={styles.text}>
          0.75 Kg
        </Text>
        <Text style={[styles.note, { textAlign: "right" }]}>
          7.5
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container:{
  },
  info: {
    backgroundColor:'white',
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
