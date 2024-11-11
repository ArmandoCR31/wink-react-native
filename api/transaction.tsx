import axios from "axios";
import { ITransaction } from "../models/types";

// URL base de tu API en AWS
const API_BASE_URL = "https://p9si8vsth0.execute-api.us-east-1.amazonaws.com"; // Reemplaza esto con la URL de tu API

// Configuración de Axios para solicitudes HTTP
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Función para crear un usuario
export const createTransaction = async (transaction: ITransaction) => {
  try {
    const response = await api.post("/transaction", transaction);
    return response.data;
  } catch (error) {
    console.error("Error creando transacción:", error);
    throw error;
  }
};

// Función para obtener todos los usuarios
export const getAllTransactions = async (lastEvaluatedKey: string | null) => {
  try {
    // Pasamos el lastEvaluatedKey (que es un objeto JSON serializado) en la URL
    const response = await api.get(
      `/transaction?lastEvaluatedKey=${lastEvaluatedKey || ""}`
    );
    return response.data;
  } catch (error) {
    console.error("Error obteniendo transacciones:", error);
    throw error;
  }
};

// Función para obtener un usuario por ID
export const getTransaction = async (transactionId: string) => {
  try {
    const response = await api.get(`/transaction/${transactionId}`);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo la transacción:", error);
    throw error;
  }
};

// Función para actualizar un usuario
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

// Función para eliminar un usuario
export const deleteTransaction = async (transactionId: string) => {
  try {
    const response = await api.delete(`/transaction/${transactionId}`);
    return response.data;
  } catch (error) {
    console.error("Error eliminando transacción:", error);
    throw error;
  }
};
