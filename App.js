import * as React from "react";
import { Router } from "./router/Router";
import { useFonts } from "expo-font";

export default function App() {
  const [loaded] = useFonts({
    GibsonR: require("./assets/fonts/gibson-font/Gibson-Regular.ttf"),
    GibsonRI: require("./assets/fonts/gibson-font/Gibson-RegularItalic.ttf"),
    GibsonB: require("./assets/fonts/gibson-font/gibson-bold.ttf"),
    GibsonBI: require("./assets/fonts/gibson-font/Gibson-BoldItalic.ttf"),
  });

  return <Router></Router>;
}
// db.createUser({
//   user: "myUserAdmin",
//   pwd: "abc123",
//   roles: [{ role: "userAdminAnyDatabase", db: "admin" }],
// });
