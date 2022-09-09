import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { HomeScreen } from "../pages/Home";
import { CommandeScreen } from "../pages/Commande";
import { CompteScreen } from "../pages/Compte";
import { PanierScreen } from "../pages/Panier";

const Tab = createBottomTabNavigator();

export function Router() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarLabel: ({ focused, color, size }) => {
            return false;
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Panier") {
              iconName = focused ? "cart" : "cart-outline";
            } else if (route.name === "Commande") {
              iconName = focused ? "list" : "list-outline";
            } else if (route.name === "Compte") {
              iconName = focused ? "person" : "person-outline";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "primary",
          tabBarInactiveTintColor: "gray",
        })}
      >
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
}
