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
import { Login } from "../pages/Auth";
import { Home } from "@carbon/icons-react";

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
          tabBarLabel: ({ focused, color, size }) => {
            return false;
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
              //return <Home />;
            } else if (route.name === "Panier") {
              iconName = focused ? "cart" : "cart-outline";
            } else if (route.name === "Commande") {
              iconName = focused ? "list" : "list-outline";
            } else if (route.name === "Compte") {
              iconName = focused ? "person" : "person-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "primary",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen
          name="Waiting"
          component={WaitingContainer}
          options={{ headerShown: false, ...hiddenTab }}
        ></Tab.Screen>
        <Tab.Screen name="Login" component={Login} options={hiddenTab} />
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen name="Panier" component={PanierScreen} />
        <Tab.Screen name="Commande" component={CommandeScreen} />
        <Tab.Screen name="Compte" component={CompteScreen} />
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
        {/* <ActivityIndicator size="large" color="#0000ff" /> */}
        <Text>Waiting</Text>
      </View>
    );
  }
}
