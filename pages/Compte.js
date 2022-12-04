import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Avatar, Button, Divider } from "react-native-paper";
import { CustomButton } from "../components/CustomButton";
import { getItem, setItem, removeItem } from "../store/store.native";
import { useFocusEffect } from "@react-navigation/native";

export function CompteScreen({ route, navigation }) {
  const [user, setUser] = React.useState(null);

  useFocusEffect(
    React.useCallback(() => {
      getItem("user").then((user) => {
        if (!user) {
          return;
        }
        let parsed = JSON.parse(user);
        setUser(parsed);
      });
    }, [])
  );

  return (
    <>
      <View style={styles.containerUser}>
        <View style={styles.user_info}>
          <View style={styles.avatar}>
            {user?.avatar ? (
              <Avatar.Image
                size={70}
                rounded
                source={{
                  uri: product.producteur.data.attributes.image,
                }}
              />
            ) : (
              <Avatar.Text
                backgroundColor="#40693E"
                size={70}
                label={`${user?.username.substr(0, 1).toUpperCase()}`}
              />
            )}
          </View>
          <View style={styles.personal_info}>
            <View>
              <Text style={styles.personal_info_name}>
                {`${user?.username}`}
              </Text>
            </View>
            <View>
              <Text style={styles.personal_info_societe}>
                {user?.role.type === "producteur"
                  ? "Producteur"
                  : "Utilisateur basique"}
              </Text>
            </View>
          </View>
        </View>
        <Divider
          style={{
            margin: 15,
          }}
        />
        <CustomButton
          type="primary"
          text="Mes informations"
          onPress={() => {}}
        ></CustomButton>
        <CustomButton
          type="primary"
          text="Moyens de paimement"
          onPress={() => {}}
        ></CustomButton>
        <CustomButton
          type="primary"
          text="Point de livraison"
          onPress={() => {}}
        ></CustomButton>
        <CustomButton
          style={{
            marginTop: 20,
          }}
          type="secondary"
          text="Se deconnecter"
          onPress={async () => {
            await removeItem("user");
            await removeItem("panier");
            navigation.navigate("Login");
          }}
        ></CustomButton>
        {user?.role.type === "producteur" && (
          <CustomButton
            style={{
              marginTop: 20,
            }}
            type="secondary"
            text={
              route.params.actualPage === "producteur"
                ? "Page utilisateur"
                : "Page producteur"
            }
            onPress={() => {
              route.params.setActualPage(
                route.params.actualPage === "producteur" ? "user" : "producteur"
              );
            }}
          ></CustomButton>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  personal_info_name: {
    fontSize: 20,
    color: "black",
    fontFamily: "GibsonB",
  },
  personal_info_societe: {
    fontSize: 18,
    color: "black",
    fontFamily: "GibsonR",
  },
  personal_info: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  user_info: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "center",
  },

  containerUser: {
    padding: 15,
  },
  image: {
    elevation: 3,
    flex: 1,
    width: null,
    height: null,
    resizeMode: "cover",
  },
  avatar: {
    marginRight: 10,
  },
});
