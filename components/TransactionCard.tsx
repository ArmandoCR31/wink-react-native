import { useEffect, useRef } from "react";
import { View, StyleSheet, Text, Animated, Pressable } from "react-native";
import { ITransaction } from "../models/types";
import { Link } from "expo-router";
import { TransactionDate } from "./TransactionDate";
type TransactionCardProps = {
  transaction: ITransaction;
};

export function TransactionCard({ transaction }: TransactionCardProps) {
  return (
    <Link
      href={{
        pathname: "/sinpe/details/1",
        params: {
          detail: JSON.stringify(transaction),
        },
      }}
      asChild
      key={transaction.transactionId}
    >
      <Pressable>
        <View key={transaction.transactionId} style={styles.card}>
          <View>
            <Text style={styles.contact}>
              {transaction.type} - {transaction.contact.name}{" "}
              {transaction.contact.lastName}
            </Text>
            <TransactionDate date={transaction.createdAt} />
          </View>
          <View>
            <Text style={styles.amount}>-₡ {transaction.amount}</Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
}

export function AnimatedTransactionCard({ transaction, index }: any) {
  const opacity = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      delay: index * 100,
      useNativeDriver: true,
    }).start();
  }, [opacity, index]);

  return (
    <Animated.View style={{ opacity }}>
      <TransactionCard transaction={transaction} />
    </Animated.View>
  );
}
const styles = StyleSheet.create({
  card: {
    height: 64,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  contact: {
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 19,
    color: "#3E3E3E",
  },
  date: {
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 16,
    color: "#787878",
  },
  amount: {
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 14,
    lineHeight: 19,
    color: "#F44336",
  },
});
