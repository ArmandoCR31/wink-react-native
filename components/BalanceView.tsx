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

export function BalanceView({ user }: { user: IUser | null }) {
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
