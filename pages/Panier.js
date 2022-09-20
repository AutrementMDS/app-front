import * as React from "react";
import { Text, View, StyleSheet, ImageBackground, ScrollView } from "react-native";
import { Card } from "react-native-paper";
import carrots from '../assets/images/carrots.jpg'; 
import cucumbers from '../assets/images/cucumbers.jpg'; 
import onions from '../assets/images/onions.jpg'; 
import potatoes from '../assets/images/potatoes.jpg'; 
import tomatoes from '../assets/images/tomatoes.jpg'; 

export function PanierScreen() {
  return (
    <View >
      <Card style={styles.cardContainer}>
        <ImageBackground source={carrots} style={{width: '100%', height: '100%', borderRadius:'5'}}>
          <View style={styles.info}>
            <Text style={styles.text}>
              Carrotes
            </Text>
            <Text style={styles.text}>
              0.75 Kg
            </Text>
            
          <Text style={[styles.prix, { textAlign: "right" }]}>
              2€
            </Text>
            </View>
        </ImageBackground>
      </Card>
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
  prix: {
    textAlign:'right',
  }
})
