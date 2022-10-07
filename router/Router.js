import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { HomeScreen } from "../pages/Home";
import { CommandeScreen } from "../pages/Commande";
import { CompteScreen } from "../pages/Compte";
import { PanierScreen } from "../pages/Panier";
import { getItem } from "../store/store.native";
import { View, Text, ActivityIndicator } from "react-native";
import { Login, Register } from "../pages/Auth";
import { LandingPageScreen } from "../pages/LandingPage";

const Tab = createBottomTabNavigator();

export function Router() {
  const [authState, setAuthState] = React.useState("waiting");
  const [user, setUser] = React.useState(null);
  const [defaultRoute, setDefaultRoute] = React.useState("Waiting");

  React.useEffect(() => {
    getItem("user").then((user) => {
      if (user == null) {
        setAuthState("empty");
      } else {
        setAuthState("done");
        setUser(user);
      }
    });
  }, [user]);

  var hiddenTab = {
    tabBarStyle: { display: "none" },
    tabBarIconStyle: { display: "none" },
    tabBarButton: () => null,
    tabBarVisible: false,
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={defaultRoute}
        backBehavior="initialRoute"
        screenOptions={({ route }) => ({
          tabBarStyle: {
            height: 55,
            margin: 20,
            borderRadius: 200,
            padding: 0,
            position: "absolute",
            elevation: 6,
            overflow: "hidden",
          },
          tabBarLabel: ({ focused, color, size }) => {
            return false;
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = "home-outline";
            } else if (route.name === "Panier") {
              iconName = "cart-outline";
            } else if (route.name === "Commande") {
              iconName = "list-outline";
            } else if (route.name === "Compte") {
              iconName = "person-outline";
            }

            return (
              <View
                style={{
                  display: "flex",
                  height: "80%",
                  width: "80%",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor:
                    color == "primary" ? "#40693E" : "transparent",
                  borderRadius: 100,
                  transition: "all 0.2s ease-in-out",
                  elevation: color == "primary" ? 1.5 : 0,
                }}
              >
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
        })}
      >
        <Tab.Screen
          name="Waiting"
          component={WaitingContainer}
          options={{ headerShown: false, ...hiddenTab }}
        ></Tab.Screen>
        <Tab.Screen
          name="LandingPage"
          component={LandingPageScreen}
          options={{ headerShown: false, ...hiddenTab }}
        ></Tab.Screen>
        <Tab.Screen
          name="Login"
          component={Login}
          options={{ title: "Se connecter", ...hiddenTab }}
        />
        <Tab.Screen
          name="Register"
          component={Register}
          options={{ title: "Créer un compte", ...hiddenTab }}
        />
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Panier"
          component={PanierScreen}
          options={{ title: "Mon panier" }}
        />
        <Tab.Screen
          name="Commande"
          component={CommandeScreen}
          options={{ title: "Mes commandes" }}
        />
        <Tab.Screen
          name="Compte"
          component={CompteScreen}
          options={{ title: "Mon Compte" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );

  function WaitingContainer({ navigation }) {
    React.useEffect(() => {
      switch (authState) {
        case "empty":
          navigation.navigate("Login");
          break;
        case "done":
          navigation.navigate("Home");
          break;
      }
    }, [authState]);

    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
}
