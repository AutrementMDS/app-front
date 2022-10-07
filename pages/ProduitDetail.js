import * as React from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import carrots from '../assets/images/carrots.jpg';
import { Page } from "../components/Page";
import { CustomButton } from "../components/CustomButton";

export function ProduitDetailScreen() {

  function buy() {
    console.log("Achat validé");
  }

  return (
    <Page>
    <View >
      <Image source={carrots} style={styles.bgimage}></Image>
      <View style={styles.info}>
        <Text style={styles.text}>
          Carrotes
        </Text>
        <View style={styles.flex}>
          <Text style={styles.nb}>
            0.75 Kg
          </Text>
          <Text style={[styles.note, { textAlign: "right" }]}>
            7.5
          </Text>
        </View>
      </View>
      <View styles={{height:100}}></View>
      <View style={styles.flexPoductor}>
        <Image
          style={styles.avatar}
          source={carrots}
          resizeMode={"cover"}
        />
        <View style={styles.productor}>
          <Text style={styles.nameProductor}>
            Jean-Michel PRODUCTEUR
          </Text>
          <Text style={styles.cityProductor}>
            GAEC La Ferme Du Semnoz
          </Text>
        </View>
      </View>
      <Text style={styles.text}>Fraises françaises récoltées à la main.</Text>
      <CustomButton
        type="primary"
        text="Acheter"
        onPress={() => buy()}
      ></CustomButton>
    </View>
    </Page>
  );
}
const styles = StyleSheet.create({
  container:{
  },
  bgimage: {
    width: "100%",
    resizeMode: "contain",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  avatar: {
    width: 100,
    height: 100,
    borderWidth: 2,
    borderRadius: 75
  },
  info: {
    width:"100%",
    bottom: 0,
  },
  flex: {
    display:"flex",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 22,
    color: "black",
    marginLeft: 5,
    marginRight: 5,
    fontFamily: "GibsonR",
  },
  nb: {
    fontSize: 20,
    color: "black",
    marginLeft: 5,
    marginRight: 5,
    fontFamily: "GibsonR",
  },
  note: {
    textAlign:'right',
    color: "black",
    fontSize: 20,
    fontFamily: "GibsonR",
  },
  flexPoductor: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    paddingBottom: 20,
  },
  nameProductor: {
    textAlign:'right',
    color: "black",
    fontSize: 22,
    fontFamily: "GibsonB",
  },
  cityProductor: {
    textAlign:'right',
    color: "black",
    fontSize: 20,
    fontFamily: "GibsonR",
  }
})
