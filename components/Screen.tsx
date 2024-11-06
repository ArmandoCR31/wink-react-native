import { ReactNode } from "react";
import { View } from "react-native";

interface ScreenProps {
  children: ReactNode;
}

export function Screen({ children }: ScreenProps) {
  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>{children}</View>
  );
}
