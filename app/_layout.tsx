/**
 * Layout Component
 *
 * This component serves as a layout wrapper for screens in the application. It is responsible for
 * configuring the header options for the screens within the `Stack` navigation, such as hiding
 * the default header title and displaying a custom logo on the left side of the header.
 *
 * The component handles:
 * - Displaying a custom logo on the header's left side.
 * - Disabling the header shadow for a cleaner UI.
 * - Hiding the default header title for a more minimalistic appearance.
 *
 * // Usage in another component
 * <Layout />
 */
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
