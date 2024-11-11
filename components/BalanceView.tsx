/**
 * BalanceView Component
 *
 * This component displays the current balance of a user in the account and provides
 * an option to initiate a SINPE móvil transaction. It shows the user's available balance
 * in Costa Rican colones (CRC) with a localized currency format.
 *
 * The component handles:
 * - Displaying the user's account balance, formatted in CRC currency.
 * - A loading indicator is shown if the user data is not available.
 * - A button to navigate to the SINPE mobile transaction screen.
 *
 * Props:
 * - `user`: An object representing the user, containing their account balance (or `null` if not available).
 *
 * // Usage example:
 * <BalanceView user={user} />
 */
import { Link } from "expo-router";
import {
  Pressable,
  View,
  Text,
  Image,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { IUser } from "../models/types";
const sinpeLogo = require("../assets/images/Sinpe.png");

/**
 * Renders the BalanceView screen.
 * - Displays the balance details.
 */
export function BalanceView({ user }: { user: IUser | null }) {
  // Display
  return (
    <View style={styles.details}>
      <Text style={styles.title}>Cuenta Colones</Text>
      <Text style={styles.subTitle}>Saldo disponible</Text>
      <Text style={styles.availableBalance}>
        {user ? (
          user.amount.toLocaleString("es-CR", {
            style: "currency",
            currency: "CRC",
          })
        ) : (
          <ActivityIndicator size="small" color="#4C51F7" />
        )}
      </Text>
      <Text style={styles.subTitle}>¿Qué querés hacer?</Text>
      <Link href="/contact" asChild>
        <Pressable style={styles.button}>
          <Image source={sinpeLogo} />
          <Text style={styles.textButton}>SINPE móvil</Text>
        </Pressable>
      </Link>
    </View>
  );
}

// Styles for the component
const styles = StyleSheet.create({
  details: {
    paddingLeft: 16,
  },
  title: {
    marginTop: 24,
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 22,
    lineHeight: 29,
    color: "#4C51F7",
  },
  subTitle: {
    marginTop: 16,
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 16,
    color: "#3E3E3E",
  },
  availableBalance: {
    marginTop: 8,
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 32,
    lineHeight: 42,
    letterSpacing: 0.0022,
    color: "#3E3E3E",
  },
  button: {
    height: 96,
    marginTop: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  textButton: {
    width: 64,
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 12,
    lineHeight: 16,
    color: "#4C51F7",
    textAlign: "center",
  },
});
