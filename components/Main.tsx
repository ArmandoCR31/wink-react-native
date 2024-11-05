import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
} from "react-native";
import { AnimatedTransactionCard } from "./TransactionCard";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { ITransaction } from "../models/types";
const logo = require("../assets/images/logo.png");
const sinpeLogo = require("../assets/images/Sinpe.png");
export function Main() {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const insets = useSafeAreaInsets();
  const dataTest = [
    {
      id: "01",
      amount: "1,850.00",
      date: "Hoy 10:12 a.m",
      description: "SINPE móvil - Arturo Robles",
    },
    {
      id: "02",
      amount: "1,850.00",
      date: "Hoy 10:12 a.m",
      description: "SINPE móvil - Arturo Robles",
    },
    {
      id: "03",
      amount: "1,850.00",
      date: "Hoy 10:12 a.m",
      description: "SINPE móvil - Arturo Robles",
    },
    {
      id: "04",
      amount: "1,850.00",
      date: "Hoy 10:12 a.m",
      description: "SINPE móvil - Arturo Robles",
    },
    {
      id: "05",
      amount: "1,850.00",
      date: "Hoy 10:12 a.m",
      description: "SINPE móvil - Arturo Robles",
    },
    {
      id: "06",
      amount: "1,850.00",
      date: "Hoy 10:12 a.m",
      description: "SINPE móvil - Arturo Robles",
    },
    {
      id: "07",
      amount: "1,850.00",
      date: "Hoy 10:12 a.m",
      description: "SINPE móvil - Arturo Robles",
    },
    {
      id: "08",
      amount: "1,850.00",
      date: "Hoy 10:12 a.m",
      description: "SINPE móvil - Arturo Robles",
    },
    {
      id: "09",
      amount: "1,850.00",
      date: "Hoy 10:12 a.m",
      description: "SINPE móvil - Arturo Robles",
    },
    {
      id: "10",
      amount: "1,850.00",
      date: "Hoy 10:12 a.m",
      description: "SINPE móvil - Arturo Robles",
    },
    {
      id: "11",
      amount: "1,850.00",
      date: "Hoy 10:12 a.m",
      description: "SINPE móvil - Arturo Robles",
    },
    {
      id: "12",
      amount: "1,850.00",
      date: "Hoy 10:12 a.m",
      description: "SINPE móvil - Arturo Robles",
    },
    {
      id: "13",
      amount: "1,850.00",
      date: "Hoy 10:12 a.m",
      description: "SINPE móvil - Arturo Robles",
    },
  ];
  useEffect(() => {
    setTransactions(dataTest);
  }, []);
  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        alignItems: "center",
      }}
    >
      <Image source={logo}></Image>
      <View style={styles.details}>
        <Text style={styles.title}>Cuenta Colones</Text>
        <Text style={styles.subTitle}>Saldo disponible</Text>
        <Text style={styles.availableBalance}>₡36,850.00</Text>
        <Text style={styles.subTitle}>¿Qué querés hacer?</Text>
        <Pressable
          style={styles.button}
          onPress={() => router.replace("/contact")}
        >
          <Image source={sinpeLogo}></Image>
          <Text style={styles.textButton}>SINPE móvil</Text>
        </Pressable>
      </View>
      <View style={styles.transaction}>
        <Text style={styles.textTransaction}>Movimientos</Text>
        {transactions.length === 0 ? (
          <ActivityIndicator color={"#fff"} size={"large"} />
        ) : (
          <FlatList
            data={transactions}
            keyExtractor={(transaction) => transaction.id}
            renderItem={({ item, index }) => (
              <AnimatedTransactionCard transaction={item} index={index} />
            )}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  details: {
    width: "100%",
    paddingLeft: 16,
  },
  title: {
    marginTop: 24,
    fontStyle: "normal",
    fontWeight: "normal",
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
  transaction: {
    width: "100%",
    marginTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
  },
  textTransaction: {
    marginBottom: 16,
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 20,
    lineHeight: 26,
    letterSpacing: 0.0022,
    color: "#3E3E3E",
  },
});
