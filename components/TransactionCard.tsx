/**
 * TransactionCard Component
 *
 * This component displays a single transaction with details such as the transaction type,
 * contact name, date, and the transaction amount in Costa Rican colones (CRC).
 * It also provides a link to navigate to a detailed view of the transaction when clicked.
 *
 * The component handles:
 * - Displaying the transaction's contact name, type, and amount.
 * - Rendering the date of the transaction using the `TransactionDate` component.
 * - Navigating to a detailed transaction page when the card is pressed.
 *
 * Props:
 * - `transaction`: An object representing the transaction details, which includes
 *   transaction ID, type, contact name, amount, and creation date.
 *
 * // Usage example:
 * <TransactionCard transaction={transaction} />
 */
import { useEffect, useRef } from "react";
import { View, StyleSheet, Text, Animated, Pressable } from "react-native";
import { Link } from "expo-router";
import { TransactionDate } from "./TransactionDate";
import { TransactionCardProps } from "../models/types";

/**
 * Renders the TransactionCard screen.
 */
export function TransactionCard({ transaction }: TransactionCardProps) {
  // Display
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
              {transaction.type} - {transaction.contact.name}
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

/**
 * AnimatedTransactionCard Component
 *
 * This component extends the `TransactionCard` by adding an animated effect for
 * each card's appearance. The animation fades the card in when it becomes visible.
 * This is useful for creating smooth transitions when the list of transactions
 * is rendered or updated.
 *
 * The component handles:
 * - Fading in the transaction card with an animated opacity effect.
 *
 * Props:
 * - `transaction`: An object representing the transaction details to be displayed.
 * - `index`: The index of the transaction in the list, used to stagger the animation delay.
 *
 * // Usage example:
 * <AnimatedTransactionCard transaction={transaction} index={index} />
 */
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
  // Display
  return (
    <Animated.View style={{ opacity }}>
      <TransactionCard transaction={transaction} />
    </Animated.View>
  );
}
// Styles for the component
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
