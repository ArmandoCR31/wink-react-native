import axios from "axios";
import { ITransaction } from "../models/types";

/**
 * Base URL for the API endpoints.
 */
const API_BASE_URL = "https://p9si8vsth0.execute-api.us-east-1.amazonaws.com";

/**
 * Axios instance for making HTTP requests.
 */
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Creates a new transaction.
 *
 * @param transaction - The transaction data to be created.
 * @returns The created transaction data from the API.
 * @throws Error if the request fails.
 */
export const createTransaction = async (transaction: ITransaction) => {
  try {
    const response = await api.post("/transaction", transaction);
    return response.data;
  } catch (error) {
    console.error("Error creando transacción:", error);
    throw error;
  }
};
/**
 * Fetches a paginated list of transactions.
 *
 * @param lastEvaluatedKey - The key for the last evaluated item in pagination (null for initial request).
 * @returns A list of transactions and a lastEvaluatedKey for pagination.
 * @throws Error if the request fails.
 */
export const getAllTransactions = async (lastEvaluatedKey: string | null) => {
  try {
    const response = await api.get(
      `/transaction?lastEvaluatedKey=${lastEvaluatedKey || ""}`
    );
    return response.data;
  } catch (error) {
    console.error("Error obteniendo transacciones:", error);
    throw error;
  }
};
/**
 * Fetches a specific transaction by ID.
 *
 * @param transactionId - The unique ID of the transaction to fetch.
 * @returns The transaction data from the API.
 * @throws Error if the request fails.
 */
export const getTransaction = async (transactionId: string) => {
  try {
    const response = await api.get(`/transaction/${transactionId}`);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo la transacción:", error);
    throw error;
  }
};
/**
 * Updates an existing transaction.
 *
 * @param transactionId - The ID of the transaction to update.
 * @param updatedData - The updated transaction data.
 * @returns The updated transaction data from the API.
 * @throws Error if the request fails.
 */
export const updateTransaction = async (
  transactionId: string,
  updatedData: ITransaction
) => {
  try {
    const response = await api.put(
      `/transaction/${transactionId}`,
      updatedData
    );
    return response.data;
  } catch (error) {
    console.error("Error actualizando transacción:", error);
    throw error;
  }
};
/**
 * Deletes a transaction by ID.
 *
 * @param transactionId - The ID of the transaction to delete.
 * @returns A success message from the API.
 * @throws Error if the request fails.
 */
export const deleteTransaction = async (transactionId: string) => {
  try {
    const response = await api.delete(`/transaction/${transactionId}`);
    return response.data;
  } catch (error) {
    console.error("Error eliminando transacción:", error);
    throw error;
  }
};
