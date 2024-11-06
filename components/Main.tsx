import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { AnimatedTransactionCard } from "./TransactionCard";
import { ITransaction } from "../models/types";
import { Screen } from "./Screen";
import { Link } from "expo-router";
const sinpeLogo = require("../assets/images/Sinpe.png");

export function Main() {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = () => {
    if (loading) return;
    setLoading(true);
    const newTransactions = Array.from({ length: 10 }, (_, i) => ({
      id: `${i + 1 + transactions.length}`,
      amount: "1,850.00",
      date: "Hoy 10:12 a.m",
      contact: {
        name: "Robles",
        lastName: "Perez",
      },
      description: "Fiesta de Hallowink",
      type: "SINPE móvil",
    }));

    setTimeout(() => {
      setTransactions((prevTransactions) => [
        ...prevTransactions,
        ...newTransactions,
      ]);
      setPage(page + 1);
      setLoading(false);
    }, 1000);
  };

  return (
    <Screen>
      <View style={styles.details}>
        <Text style={styles.title}>Cuenta Colones</Text>
        <Text style={styles.subTitle}>Saldo disponible</Text>
        <Text style={styles.availableBalance}>₡36,850.00</Text>
        <Text style={styles.subTitle}>¿Qué querés hacer?</Text>
        <Link href="/contact" asChild>
          <Pressable style={styles.button}>
            <Image source={sinpeLogo} />
            <Text style={styles.textButton}>SINPE móvil</Text>
          </Pressable>
        </Link>
      </View>

      <View style={styles.transaction}>
        <Text style={styles.textTransaction}>Movimientos</Text>
        <FlatList
          data={transactions}
          keyExtractor={(transaction) => transaction.id}
          renderItem={({ item, index }) => (
            <AnimatedTransactionCard transaction={item} index={index} />
          )}
          onEndReached={loadTransactions} // Cargar más datos al llegar al final
          onEndReachedThreshold={0.1} // Trigger cuando esté a 10% del final
          initialNumToRender={10} // Cantidad de elementos iniciales a renderizar
          windowSize={5} // Rango de elementos a mantener montados
          ListFooterComponent={
            loading ? <ActivityIndicator size="large" color="#4C51F7" /> : null
          }
        />
      </View>
    </Screen>
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
  transaction: {
    flex: 1,
    margin: 16,
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
