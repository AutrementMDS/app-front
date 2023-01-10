import * as React from "react";
import { Router } from "./router/Router";
import { useFonts } from "expo-font";
// import "./assets/style/style.css";

export default function App() {
  const [loaded] = useFonts({
    GibsonR: require("./assets/fonts/gibson-font/Gibson-Regular.ttf"),
    GibsonRI: require("./assets/fonts/gibson-font/Gibson-RegularItalic.ttf"),
    GibsonB: require("./assets/fonts/gibson-font/gibson-bold.ttf"),
    GibsonBI: require("./assets/fonts/gibson-font/Gibson-BoldItalic.ttf"),
    American: require("./assets/fonts/American-Typewrite/American-Typewriter-Regular.ttf"),
    NunitoB: require("./assets/fonts/Nunito/Nunito-Bold.ttf"),
    NunitoL: require("./assets/fonts/Nunito/Nunito-Light.ttf"),
    NunitoR: require("./assets/fonts/Nunito/Nunito-Regular.ttf"),
  });

  return loaded && <Router></Router>;
}
