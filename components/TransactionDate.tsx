import { Text, StyleSheet } from "react-native";

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

  return new Intl.DateTimeFormat("es-CR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
};

interface TransactionDateProps {
  date: string;
}

export const TransactionDate: React.FC<TransactionDateProps> = ({ date }) => {
  return <Text style={styles.date}>{formatDate(date)}</Text>;
};

const styles = StyleSheet.create({
  date: {
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 16,
    color: "#787878",
  },
});
