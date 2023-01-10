import * as React from "react";
import { NavigationContainer, useRoute } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import { HomeScreen } from "../pages/Home";
import { CommandeScreen } from "../pages/Commande";
import { CompteScreen } from "../pages/Compte";
import { PanierScreen } from "../pages/Panier";
import { getItem, setItem } from "../store/store.js";
import {
  View,
  Text,
  ActivityIndicator,
  Pressable,
  Platform,
  Dimensions,
} from "react-native";
import { Login, Register } from "../pages/Auth";
import { LandingPageScreen } from "../pages/LandingPage";
import { ProduitDetail } from "../pages/ProduitDetail";
import { Button, Icon } from "react-native";
import { IconButton, MD3Colors } from "react-native-paper";
import { AddToPanier } from "../pages/AddToPanier";
import { ProducteurScreen } from "../pages/Producteur";
import { ProducteurHomeScreen } from "../pages/producteur/Home";
import { ProducteurProductsScreen } from "../pages/producteur/Produits";
import { ProducteurOrdersScreen } from "../pages/producteur/Commandes";
import { ProducteurProductScreen } from "../pages/producteur/Product";
import { isOnWeb } from "../modules/utils";

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();

const hiddenTab = {
  tabBarStyle: { display: "none" },
  tabBarIconStyle: { display: "none" },
  tabBarButton: () => null,
  tabBarVisible: false,
};

const UserHomeStackScreen = ({ actualPage, setActualPage, isConnected }) => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={UserAppScreens}
        options={({ route, navigation }) => {
          route.isConnected = isConnected;
          route.setActualPage = setActualPage;
          route.actualPage = actualPage;
          return {
            headerShown: false,
          };
        }}
      />
      <HomeStack.Screen
        name="Producteur"
        component={ProducteurScreen}
        options={({ route, navigation }) => {
          // route.params = {
          //   setSelectedProducteur,
          // };
          return {
            title: "",
            headerLeft: () => (
              <IconButton
                icon="arrow-left"
                size={25}
                color="black"
                onPress={async () => {
                  navigation.pop();
                }}
              />
            ),
          };
        }}
      />
      <HomeStack.Screen
        name="ProduitDetail"
        component={ProduitDetail}
        options={({ route, navigation }) => ({
          title: route.params?.product?.name || "",
          headerLeft: () => (
            <IconButton
              icon="arrow-left"
              size={25}
              color="black"
              onPress={async () => {
                navigation.pop();
              }}
            />
          ),
        })}
      />
      <HomeStack.Screen
        name="AddToPanier"
        component={AddToPanier}
        options={({ route, navigation }) => ({
          title: route.params?.product?.name || "",
          headerLeft: () => (
            <IconButton
              icon="arrow-left"
              size={25}
              color="black"
              onPress={async () => {
                navigation.pop();
              }}
            />
          ),
        })}
      />
    </HomeStack.Navigator>
  );
};

const ProducteurHomeStackScreen = ({
  actualPage,
  setActualPage,
  isConnected,
}) => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={ProducteurAppScreens}
        options={({ route, navigation }) => {
          route.isConnected = isConnected;
          route.setActualPage = setActualPage;
          route.actualPage = actualPage;
          return {
            headerShown: false,
          };
        }}
      />

      <HomeStack.Screen
        name="Product"
        component={ProducteurProductScreen}
        options={({ route, navigation }) => ({
          title: route.params?.product?.name || "",
          headerLeft: () => (
            <IconButton
              icon="arrow-left"
              size={25}
              color="black"
              onPress={async () => {
                navigation.pop();
              }}
            />
          ),
        })}
      />
    </HomeStack.Navigator>
  );
};

const UserAppScreens = ({ route, navigation }) => {
  const [defaultRoute, setDefaultRoute] = React.useState(
    route.isConnected ? "Home" : "Login"
  );

  const [panierPrice, setPanierPrice] = React.useState(0);

  return (
    <Tab.Navigator
      initialRouteName={defaultRoute}
      backBehavior="initialRoute"
      screenOptions={({ route }) => {
        let tabBarStyle = {};
        if (isOnWeb()) {
          tabBarStyle = {
            height: 55,
            // margin: 20,
            // borderRadius: 200,
            padding: 0,
            // position: "absolute",
            elevation: 6,
            overflow: "hidden",
            top: 0,
          };
        } else {
          tabBarStyle = {
            height: 55,
            margin: 20,
            borderRadius: 200,
            padding: 0,
            position: "absolute",
            elevation: 6,
            overflow: "hidden",
          };
        }

        return {
          tabBarStyle: tabBarStyle,
          tabBarLabel: ({ focused, color, size }) => {
            return false;
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName, label;

            if (route.name === "Home") {
              iconName = "home-outline";
              label = "Accueil";
            } else if (route.name === "Panier") {
              iconName = "cart-outline";
              label = "Panier";
            } else if (route.name === "Commande") {
              iconName = "list-outline";
              label = "Commandes";
            } else if (route.name === "Compte") {
              iconName = "person-outline";
              label = "Compte";
            }

            return (
              <View
                style={{
                  // display: "flex",
                  height: "80%",
                  // width: "80%",
                  width: Dimensions.get("window").width / 5,
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  backgroundColor:
                    color == "primary" ? "#40693E" : "transparent",
                  borderRadius: 100,
                  transition: "all 0.2s ease-in-out",
                  elevation: color == "primary" ? 1.5 : 0,
                }}
              >
                {isOnWeb() && (
                  <Text
                    style={{
                      color: color == "primary" ? "white" : "black",
                      marginRight: 5,
                      textTransform: "capitalize",
                    }}
                  >
                    {label}
                  </Text>
                )}
                <Ionicons
                  name={iconName}
                  size={20}
                  color={focused ? "white" : "black"}
                />
              </View>
            );
          },
          tabBarActiveTintColor: "primary",
          tabBarInactiveTintColor: "black",
        };
      }}
    >
      <Tab.Screen
        name="LandingPage"
        component={LandingPageScreen}
        options={{ headerShown: false, ...hiddenTab }}
      ></Tab.Screen>
      <Tab.Screen
        name="Login"
        component={Login}
        options={{ title: "Se connecter", ...hiddenTab, headerShown: false }}
      />
      <Tab.Screen
        name="Register"
        component={Register}
        options={{ title: "Créer un compte", ...hiddenTab, headerShown: false }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Panier"
        component={PanierScreen}
        options={({ route, navigation }) => {
          route.params = {
            setPanierPrice: setPanierPrice,
          };
          return {
            title: "Mon panier",
            headerRight: () => {
              return (
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    marginRight: 10,
                  }}
                >{`Total: ${panierPrice}€`}</Text>
              );
            },
          };
        }}
      />
      <Tab.Screen
        name="Commande"
        component={CommandeScreen}
        options={{ title: "Mes commandes" }}
      />
      <Tab.Screen
        name="Compte"
        component={CompteScreen}
        options={(props) => {
          props.route.params = {
            setActualPage: route.setActualPage,
            actualPage: route.actualPage,
          };
        }}
      />
    </Tab.Navigator>
  );
};

const ProducteurAppScreens = ({ route, navigation }) => {
  const [defaultRoute, setDefaultRoute] = React.useState(
    route.isConnected ? "Home" : "Login"
  );

  const [panierPrice, setPanierPrice] = React.useState(0);

  return (
    <Tab.Navigator
      initialRouteName={defaultRoute}
      backBehavior="initialRoute"
      screenOptions={({ route }) => {
        let tabBarStyle = {};
        if (isOnWeb()) {
          tabBarStyle = {
            height: 55,
            // margin: 20,
            // borderRadius: 200,
            padding: 0,
            // position: "absolute",
            elevation: 6,
            overflow: "hidden",
            top: 0,
          };
        } else {
          tabBarStyle = {
            height: 55,
            margin: 20,
            borderRadius: 200,
            padding: 0,
            position: "absolute",
            elevation: 6,
            overflow: "hidden",
          };
        }
        return {
          tabBarStyle: tabBarStyle,
          tabBarLabel: ({ focused, color, size }) => {
            return false;
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName, label;

            if (route.name === "Home") {
              iconName = "home-outline";
              label = "Accueil";
            } else if (route.name === "Produits") {
              iconName = "cube-outline";
              label = "Produits";
            } else if (route.name === "Commande") {
              iconName = "list-outline";
              label = "Commandes";
            } else if (route.name === "Compte") {
              iconName = "person-outline";
              label = "Compte";
            }

            return (
              <View
                style={{
                  // display: "flex",
                  height: "80%",
                  // width: "80%",
                  width: Dimensions.get("window").width / 5,
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  backgroundColor:
                    color == "primary" ? "#40693E" : "transparent",
                  borderRadius: 100,
                  transition: "all 0.2s ease-in-out",
                  elevation: color == "primary" ? 1.5 : 0,
                }}
              >
                {isOnWeb() && (
                  <Text
                    style={{
                      color: color == "primary" ? "white" : "black",
                      marginRight: 5,
                      textTransform: "capitalize",
                    }}
                  >
                    {label}
                  </Text>
                )}
                <Ionicons
                  name={iconName}
                  size={20}
                  color={focused ? "white" : "black"}
                />
              </View>
            );
          },
          tabBarActiveTintColor: "primary",
          tabBarInactiveTintColor: "black",
        };
      }}
    >
      <Tab.Screen
        name="LandingPage"
        component={LandingPageScreen}
        options={{ headerShown: false, ...hiddenTab }}
      ></Tab.Screen>
      <Tab.Screen
        name="Login"
        component={Login}
        options={{ title: "Se connecter", ...hiddenTab, headerShown: false }}
      />
      <Tab.Screen
        name="Register"
        component={Register}
        options={{ title: "Créer un compte", ...hiddenTab, headerShown: false }}
      />
      {/*  */}
      <Tab.Screen
        name="Home"
        component={ProducteurHomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Produits"
        component={ProducteurProductsScreen}
        options={{ title: "Produits" }}
      />
      <Tab.Screen
        name="Commande"
        component={ProducteurOrdersScreen}
        options={{ title: "Commandes en cours" }}
      />
      <Tab.Screen
        name="Compte"
        component={CompteScreen}
        options={(props) => {
          props.route.params = {
            setActualPage: route.setActualPage,
            actualPage: route.actualPage,
          };
          return {
            title: "Mon compte",
          };
        }}
      />
    </Tab.Navigator>
  );
};

export function Router() {
  const [isConnected, setIsConnected] = React.useState(null);
  const [role, setRole] = React.useState(null);
  const [actualPage, setActualPage] = React.useState("user");

  let style = {};
  if (isOnWeb()) {
    style = {
      position: "relative",
      left: "50%",
      transform: "translateX(-50%)",
    };
  }

  React.useEffect(() => {
    getItem("user").then((nUser) => {
      if (nUser == null) {
        setIsConnected(false);
      } else {
        let type = JSON.parse(nUser).role.type;
        if (type === "producteur") {
          setActualPage("producteur");
        }
        setRole(type);
        setIsConnected(true);
      }
    });
  }, []);

  switch (isConnected) {
    case null:
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#40693E" />
        </View>
      );

    default:
      return (
        // <View style={style}>
        <NavigationContainer style={style}>
          {actualPage === "producteur" ? (
            <ProducteurHomeStackScreen
              actualPage={actualPage}
              setActualPage={setActualPage}
              isConnected={isConnected}
            />
          ) : (
            <UserHomeStackScreen
              actualPage={actualPage}
              setActualPage={setActualPage}
              isConnected={isConnected}
            />
          )}
        </NavigationContainer>
        // </View>
      );
  }
}
