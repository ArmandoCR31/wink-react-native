import axios from "axios";
import { IUser } from "../models/types";

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
export const createUser = async (user: IUser) => {
  try {
    const response = await api.post("/user", user);
    return response.data;
  } catch (error) {
    console.error("Error creando usuario:", error);
    throw error;
  }
};

// Función para obtener todos los usuarios
export const getAllUsers = async () => {
  try {
    const response = await api.get("/user");
    return response.data;
  } catch (error) {
    console.error("Error obteniendo usuarios:", error);
    throw error;
  }
};

// Función para obtener un usuario por ID
export const getUser = async (userId: string) => {
  try {
    const response = await api.get(`/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo usuario:", error);
    throw error;
  }
};

// Función para actualizar un usuario
export const updateUser = async (userId: string, updatedData: IUser) => {
  try {
    const response = await api.put(`/user/${userId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error actualizando usuario:", error);
    throw error;
  }
};

// Función para eliminar un usuario
export const deleteUser = async (userId: string) => {
  try {
    const response = await api.delete(`/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error eliminando usuario:", error);
    throw error;
  }
};
