import { ReactNode } from "react";

/**
 * ITransaction Interface
 *
 * This interface defines the structure of a transaction object. A transaction
 * represents a financial movement made by the user. It includes details such as
 * the transaction ID, amount, creation date, contact details, description, and type.
 *
 * Properties:
 * - `transactionId`: A unique identifier for the transaction (string).
 * - `amount`: The amount of money involved in the transaction (number).
 * - `createdAt`: The date and time when the transaction was created, in ISO 8601 format (string).
 * - `contact`: An object containing the contact's name and last name involved in the transaction.
 * - `description`: A brief description of the transaction (string).
 * - `type`: The type of transaction (e.g., "deposit", "withdrawal") (string).
 */
export interface ITransaction {
  transactionId: string;
  amount: number;
  createdAt: string;
  contact: {
    name: string;
    lastName: string;
  };
  description: string;
  type: string;
}
/**
 * IUser Interface
 *
 * This interface defines the structure of a user object. The user has personal
 * details and an account balance.
 *
 * Properties:
 * - `id`: A unique identifier for the user (string).
 * - `name`: The user's first name (string).
 * - `lastName`: The user's last name (string).
 * - `amount`: The user's current account balance in colones (number).
 */
export interface IUser {
  id: string;
  name: string;
  lastName: string;
  amount: number;
}
/**
 * IContact Interface
 *
 * This interface defines the structure of a contact object. A contact is an individual
 * who can be involved in transactions with the user.
 *
 * Properties:
 * - `id`: A unique identifier for the contact (string).
 * - `name`: The contact's first name (string).
 * - `lastName`: The contact's last name (string).
 * - `number`: The contact's phone number (number).
 */
export interface IContact {
  id: string;
  name: string;
  lastName: string;
  number: number;
}
/**
 * ScreenProps Interface
 *
 * This interface is used for the `Screen` component, which is a wrapper for screen
 * content in the app. It accepts `children` as a prop, which are the elements to be
 * displayed within the screen.
 *
 * Properties:
 * - `children`: A React node representing the elements to be rendered inside the screen.
 */
export interface ScreenProps {
  children: ReactNode;
}
/**
 * TransactionCardProps Interface
 *
 * This interface is used for the `TransactionCard` component. It defines the prop
 * that should be passed to the component, which is a transaction object.
 *
 * Properties:
 * - `transaction`: An `ITransaction` object representing a financial transaction.
 */
export interface TransactionCardProps {
  transaction: ITransaction;
}
/**
 * TransactionDateProps Interface
 *
 * This interface is used for the `TransactionDate` component. It defines the prop
 * that should be passed to the component, which is the transaction date as a string.
 *
 * Properties:
 * - `date`: A string representing the date of the transaction, in ISO 8601 format.
 */
export interface TransactionDateProps {
  date: string;
}
