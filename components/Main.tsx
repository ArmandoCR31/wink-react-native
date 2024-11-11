/**
 * Main Component
 *
 * This component serves as the main screen of the application, displaying the user's account balance
 * and a list of recent transactions. It integrates the loading of user data and transaction data,
 * handles pagination for loading transactions, and includes a refresh control for refreshing the user data.
 *
 * The component performs the following tasks:
 * - Fetches the user's account information and displays the balance.
 * - Fetches and displays a list of transactions, with pagination to load more as the user scrolls.
 * - Allows the user to refresh their account data using a pull-to-refresh mechanism.
 * - Merges and sorts transactions in descending order based on the transaction date.
 * - Displays a loading spinner while fetching data and additional transactions.
 *
 * It uses the following hooks:
 * - `useState`: For managing state variables (user, transactions, loading, etc.).
 * - `useEffect`: To load data when the component mounts.
 * - `useRef`: To keep track of the last evaluated key for paginated transaction loading.
 * - `useCallback`: For memoizing functions to optimize performance.
 *
 * Dependencies:
 * - `getUser`: Fetches user data from an API.
 * - `getAllTransactions`: Fetches transaction data from an API.
 *
 * Props:
 * - None
 *
 * // Usage example:
 * <Main />
 */
import { useEffect, useState, useRef, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
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
/**
 * Renders the Main screen.
 * - Displays the main.
 */
export function Main() {
  // States for user data, transactions, loading, and pagination
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [user, setUser] = useState<IUser | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [refreshingUser, setRefreshingUser] = useState(false);
  // Ref to keep track of the last evaluated key for pagination
  const lastEvaluatedKeyRef = useRef<any>(null);
  // Load user and transaction data when the component mounts
  useEffect(() => {
    loadUser();
    loadTransactions();
  }, []);
  // Load user data (called initially and on refresh)
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
  // Load transactions with pagination
  const loadTransactions = useCallback(async () => {
    if (!hasMore) return; // Prevent further loading if no more transactions are available
    setLoading(true);
    try {
      const param = lastEvaluatedKeyRef.current
        ? JSON.stringify(lastEvaluatedKeyRef.current)
        : null;
      const response = await getAllTransactions(param);
      const newTransactions = response.items || [];
      lastEvaluatedKeyRef.current = response.lastEvaluatedKey;
      // Merge new transactions with the existing list and sort by date
      setTransactions((prevTransactions) =>
        mergeTransactions(prevTransactions, newTransactions)
      );

      if (!response.lastEvaluatedKey) {
        setHasMore(false); // No more transactions to load
      }
    } catch (error) {
      console.log("Error al cargar transacciones:", error);
    } finally {
      setLoading(false);
    }
  }, [hasMore]);
  // Handle scrolling to load more transactions
  const handleEndReached = useCallback(() => {
    if (!loading && hasMore) {
      loadTransactions();
    }
  }, [loading, hasMore, loadTransactions]);
  // Merge and sort transactions by date (descending)
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
  // Refresh the user data when triggered by the pull-to-refresh action
  const handleUserRefresh = useCallback(() => {
    loadUser(true);
  }, [loadUser]);
  // Display
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
// Styles for the component
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
