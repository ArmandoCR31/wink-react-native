/**
 * TransactionDate Component
 *
 * This component formats and displays the transaction date in a user-friendly way.
 * If the transaction occurred today, it will display "Hoy" followed by the time
 * in a 12-hour format with AM/PM notation. For past dates, it displays the date
 * in a `DD/MM/YYYY` format, localized for Costa Rica (es-CR).
 *
 * The component handles:
 * - Formatting the date for today, displaying the time in 12-hour AM/PM format.
 * - Displaying past dates in a `DD/MM/YYYY` format.
 *
 * Props:
 * - `date`: A string representing the transaction date in ISO 8601 format (e.g., "2024-11-10T14:30:00Z").
 *
 * // Usage example:
 * <TransactionDate date="2024-11-10T14:30:00Z" />
 */
import { Text, StyleSheet } from "react-native";
import { TransactionDateProps } from "../models/types";

// Helper function to format the date
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const today = new Date();

  if (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  ) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedTime = `${hours > 12 ? hours - 12 : hours}:${minutes
      .toString()
      .padStart(2, "0")} ${hours >= 12 ? "p.m." : "a.m."}`;
    return `Hoy ${formattedTime}`;
  }
  // Display
  return new Intl.DateTimeFormat("es-CR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
};

// Component that renders the formatted transaction date
export const TransactionDate: React.FC<TransactionDateProps> = ({ date }) => {
  // Display
  return <Text style={styles.date}>{formatDate(date)}</Text>;
};
// Styles for the component
const styles = StyleSheet.create({
  date: {
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 16,
    color: "#787878",
  },
});
