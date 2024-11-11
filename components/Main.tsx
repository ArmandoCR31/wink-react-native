import { useEffect, useState, useRef, useCallback } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from "react-native";
import { AnimatedTransactionCard } from "./TransactionCard";
import { ITransaction, IUser } from "../models/types";
import { Screen } from "./Screen";
import { getUser } from "../api/user";
import { getAllTransactions } from "../api/transaction";
import { BalanceView } from "./BalanceView";
export function Main() {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [user, setUser] = useState<IUser | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false); // Estado de carga global para la paginación
  const [refreshingUser, setRefreshingUser] = useState(false);

  const lastEvaluatedKeyRef = useRef<any>(null); // Guarda la última clave evaluada

  useEffect(() => {
    loadUser();
    loadTransactions(true); // Carga las transacciones iniciales
  }, []);

  const loadUser = useCallback(async (isRefreshing = false) => {
    if (isRefreshing) setRefreshingUser(true);
    try {
      const user = await getUser("ad677daf-9a6a-446a-b6c2-ce61fa1bc07e");
      setUser(user);
    } catch (error) {
      console.log("Error al obtener el usuario", error);
    } finally {
      if (isRefreshing) setRefreshingUser(false);
    }
  }, []);

  const loadTransactions = useCallback(async () => {
    if (!hasMore) return;
    setLoading(true);
    try {
      const param = lastEvaluatedKeyRef.current
        ? JSON.stringify(lastEvaluatedKeyRef.current)
        : null;
      const response = await getAllTransactions(param);
      const newTransactions = response.items || [];
      lastEvaluatedKeyRef.current = response.lastEvaluatedKey;

      setTransactions((prevTransactions) =>
        mergeTransactions(prevTransactions, newTransactions)
      );

      if (!response.lastEvaluatedKey) {
        setHasMore(false);
      }
    } catch (error) {
      console.log("Error al cargar transacciones:", error);
    } finally {
      setLoading(false);
    }
  }, [hasMore]);

  const handleEndReached = useCallback(() => {
    if (!loading && hasMore) {
      loadTransactions();
    }
  }, [loading, hasMore, loadTransactions]);

  const mergeTransactions = (
    existingTransactions: ITransaction[],
    newTransactions: ITransaction[]
  ) => {
    const allTransactions = [...existingTransactions, ...newTransactions];
    const sortedTransactions = allTransactions.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    return [
      ...new Map(
        sortedTransactions.map((item) => [item.transactionId, item])
      ).values(),
    ];
  };

  const handleUserRefresh = useCallback(() => {
    loadUser(true); // Llama a loadUser con el parámetro de recarga
  }, [loadUser]);

  return (
    <Screen>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshingUser}
            onRefresh={handleUserRefresh}
          />
        }
      >
        <BalanceView user={user} />
      </ScrollView>

      <View style={styles.transaction}>
        <Text style={styles.textTransaction}>Movimientos</Text>
        <FlatList
          data={transactions}
          keyExtractor={(transaction) => transaction.transactionId}
          renderItem={({ item, index }) => (
            <AnimatedTransactionCard transaction={item} index={index} />
          )}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.1}
          windowSize={5}
          ListFooterComponent={
            loading ? <ActivityIndicator size="large" color="#4C51F7" /> : null
          }
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  transaction: {
    flex: 1.5,
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
