import * as React from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Platform,
} from "react-native";
import { Avatar, Card, Divider } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Page } from "../components/Page";
import { getProducteurImages } from "../modules/database";
import { isOnWeb } from "../modules/utils";

export const ProducteurScreen = ({ route, navigation }) => {
  const { producteur, producteurID } = route.params;
  const [images, setImages] = React.useState([]);

  React.useEffect(() => {
    /**
     * Set screen's title with the producteur's name
     */
    navigation.setOptions({
      title: (
        <View>
          <Text
            style={styles.title}
          >{`${producteur.prenom} ${producteur.nom}`}</Text>
          <Text style={styles.subTitle}>{producteur.societe}</Text>
        </View>
      ),
    });
    /**
     * Get producer's images
     */
    getImages();
  }, []);

  async function getImages() {
    let images = await getProducteurImages(producteurID);
    setImages(images);
  }

  /**
   * Retun main component
   */
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.user_info}>
          <View style={styles.avatar}>
            {producteur?.avatar ? (
              <Avatar.Image
                size={70}
                rounded
                source={{
                  uri: producteur.image,
                }}
              />
            ) : (
              <Avatar.Text
                backgroundColor="#40693E"
                size={70}
                label={`${producteur?.prenom.substr(0, 1).toUpperCase()}`}
              />
            )}
          </View>
          <View style={styles.personal_info}>
            <View>
              <Text
                style={styles.personal_info_name}
              >{`${producteur?.prenom}`}</Text>
            </View>
            <View>
              <Text style={styles.personal_info_societe}>
                {`${producteur?.nom}`}
              </Text>
            </View>
          </View>
        </View>

        <Text style={styles.contentTitle}>A PROPOS</Text>
        <Text style={styles.description}>{producteur.description}</Text>

        <Text style={styles.contentTitle}>LE METIER</Text>

        <FlatList
          numColumns={isOnWeb() ? 3 : 1}
          data={images}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  justifyContent: "center",
                  margin: 5,
                  width:
                    Dimensions.get("window").width / (isOnWeb() ? 3 : 1.15),
                  height: Dimensions.get("window").height / 3,
                }}
              >
                <Image
                  style={styles.image}
                  source={{
                    uri: item.attributes.link,
                  }}
                />
              </View>
              // <View key={index} style={styles.imageContainer}>

              // </View>
            );
          }}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
        {/* {images.map((image, index) => {
          return (
            <View key={index} style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={{
                  uri: image.attributes.link,
                }}
              />
            </View>
          );
        })} */}
      </View>
    </ScrollView>
  );
};

/**
 * CSS Styles
 */
const styles = StyleSheet.create({
  description: {
    fontSize: 15,
    color: "black",
    fontFamily: "GibsonR",
    marginTop: 5,
  },
  contentTitle: {
    fontSize: 20,
    color: "black",
    fontFamily: "GibsonB",
    marginTop: 40,
  },
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    color: "black",
    fontFamily: "GibsonB",
  },
  subTitle: {
    fontSize: 15,
    color: "black",
    fontFamily: "GibsonR",
  },
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
  imageContainer: {
    width: Dimensions.get("window").width - 40,
    height: 200,
    marginTop: 10,
    borderRadius: 10,
  },
  image: {
    borderRadius: 10,
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
