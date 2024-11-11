import axios from "axios";
import { IUser } from "../models/types";

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
 * Creates a new user.
 *
 * @param user - The user data to create.
 * @returns The created user data from the API.
 * @throws Error if the request fails.
 */
export const createUser = async (user: IUser) => {
  try {
    const response = await api.post("/user", user);
    return response.data;
  } catch (error) {
    console.error("Error creando usuario:", error);
    throw error;
  }
};
/**
 * Fetches a list of all users.
 *
 * @returns A list of users from the API.
 * @throws Error if the request fails.
 */
export const getAllUsers = async () => {
  try {
    const response = await api.get("/user");
    return response.data;
  } catch (error) {
    console.error("Error obteniendo usuarios:", error);
    throw error;
  }
};
/**
 * Fetches a specific user by ID.
 *
 * @param userId - The unique ID of the user to fetch.
 * @returns The user data from the API.
 * @throws Error if the request fails.
 */
export const getUser = async (userId: string) => {
  try {
    const response = await api.get(`/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo usuario:", error);
    throw error;
  }
};
/**
 * Updates an existing user.
 *
 * @param userId - The ID of the user to update.
 * @param updatedData - The updated user data.
 * @returns The updated user data from the API.
 * @throws Error if the request fails.
 */
export const updateUser = async (userId: string, updatedData: IUser) => {
  try {
    const response = await api.put(`/user/${userId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error actualizando usuario:", error);
    throw error;
  }
};
/**
 * Deletes a user by ID.
 *
 * @param userId - The ID of the user to delete.
 * @returns A success message from the API.
 * @throws Error if the request fails.
 */
export const deleteUser = async (userId: string) => {
  try {
    const response = await api.delete(`/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error eliminando usuario:", error);
    throw error;
  }
};
