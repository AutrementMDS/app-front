import react from "react";
import { View, StyleSheet, TouchableHighlight, Pressable } from "react-native";
import { TextInput } from "react-native";
import { IconButton } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";

export const SearchBar = (props) => {
  const [search, setSearch] = react.useState("");

  return (
    <>
      <View style={styles.searchSection}>
        <Pressable
          onPress={() => {
            console.log("SEARCH : " + search);
          }}
        >
          <Ionicons name="search-outline" size={20} color="#7E8B78" />
        </Pressable>
        <TextInput
          style={styles.input}
          onChangeText={(text) => {
            setSearch(text);
          }}
          value={search}
          placeholder="Rechercher..."
          onSubmitEditing={() => {
            console.log("SEARCH : " + search);
          }}
        />
      </View>

      <Pressable
        onPress={() => {
          console.log("OPEN FILTER MENU");
        }}
      >
        <Ionicons
          style={styles.options}
          name="options-outline"
          size={40}
          color="#40693E"
        />
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  options: {
    marginLeft: 5,
  },
  searchSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#E1E7DF",
    elevation: 5,
    borderRadius: 5,
    marginLeft: 3,
    padding: 10,
    flex: 1,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontFamily: "GibsonR",
    fontSize: 18,
    color: "#7E8B78",
  },
});
