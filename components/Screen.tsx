/**
 * Screen Component
 *
 * This component is a wrapper that provides a consistent layout for screen content in the application.
 * It ensures that the content is displayed with a white background and that the layout expands to fill
 * the available space using `flex: 1`.
 *
 * The component renders any children passed to it and applies a default style with a white background.
 * This makes it suitable for use as a base container for individual screen layouts.
 *
 * The component handles:
 * - Wrapping content with a white background.
 * - Using a flexible layout to ensure the content occupies the full available space.
 * - Accepting children components to be displayed inside the layout.
 *
 * Props:
 * - `children`: The content to be rendered inside the screen, passed as `ScreenProps`, which should
 *   conform to the shape defined in the `ScreenProps` type from `../models/types`.
 *
 * // Usage example:
 * <Screen>
 *   <MyComponent />
 * </Screen>
 */
import { View } from "react-native";
import { ScreenProps } from "../models/types";

/**
 * Renders the Screen screen.
 */
export function Screen({ children }: ScreenProps) {
  // Display
  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>{children}</View>
  );
}
