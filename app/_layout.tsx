import { Stack } from "expo-router";
import { Image } from "react-native";
const logo = require("../assets/images/logo.png");
export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerTitle: "",
        headerLeft: () => <Image source={logo}></Image>,
      }}
    />
  );
}
