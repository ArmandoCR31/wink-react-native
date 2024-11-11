/**
 * SinpeTransaction Component
 *
 * This component allows the user to perform a SINPE mobile transaction, where the user
 * can transfer money to a selected contact. It displays the contact's details and
 * allows the user to input the transaction amount and description.
 *
 * The component handles:
 * - Contact details display.
 * - User balance validation before the transaction.
 * - Transaction creation in the backend.
 * - User balance update after a successful transaction.
 *
 * // Usage in another component
 * <SinpeTransaction />
 */
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import { Stack, useLocalSearchParams, router } from "expo-router";
import { Screen } from "../../components/Screen";
import { useState } from "react";
import { TextInputMask } from "react-native-masked-text";
import { ITransaction, IUser } from "../../models/types";
import { createTransaction } from "../../api/transaction";
import { getUser as fetchUser, updateUser } from "../../api/user";

/**
 * Renders the SinpeTransaction screen.
 * - Displays the contact details.
 * - Allows the user to input the transaction amount and description.
 * - Handles transaction confirmation.
 */
export default function SinpeTransaction() {
  const [amount, setAmount] = useState(""); // Stores the entered transaction amount
  const [detail, setDetail] = useState(""); // Stores the description for the transaction
  const { contact } = useLocalSearchParams(); // Retrieves contact information passed in the URL
  const contactObject = contact
    ? JSON.parse(decodeURIComponent(contact as string))
    : null; // Decodes and parses the contact data
  // Displays error if contact data is not found
  if (!contactObject) {
    return (
      <Screen>
        <Stack.Screen
          options={{
            headerBackVisible: true,
            headerTintColor: "#4C51F7",
            headerLeft: () => "",
            headerTitle: "Enviar dinero",
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontWeight: "700",
              fontSize: 16,
              color: "#4C51F7",
            },
          }}
        />
        <Text>Error al cargar contactos</Text>
      </Screen>
    );
  }

  /**
   * Handles the SINPE mobile transaction flow.
   * This function retrieves user information, checks the balance, updates the balance,
   * and creates the transaction if everything is valid.
   *
   * @async
   * @function
   * @returns {Promise<void>}
   */
  async function updateUserBalance(userId: string, user: IUser) {
    // API call to update the user's balance
    const response = await updateUser(userId, user);
    return response.amount;
  }

  /**
   * Handles the confirmation of the transaction.
   * - Validates the entered amount.
   * - Checks if the user has enough balance.
   * - Updates the user's balance and creates the transaction.
   * - Displays success or error messages.
   *
   * @async
   * @function
   */
  const handleConfirm = async () => {
    if (!amount || parseFloat(amount.replace(/[^0-9.-]+/g, "")) <= 0) {
      alert("Por favor ingrese un monto válido.");
      return;
    }

    const transactionAmount = parseInt(amount.replace(/\D/g, ""), 10);
    try {
      const userId = "ad677daf-9a6a-446a-b6c2-ce61fa1bc07e"; // User ID for testing
      const user = await fetchUser(userId); // Fetch current user data
      const userBalance = user.amount;
      if (userBalance < transactionAmount) {
        // Alert if user doesn't have enough balance
        Alert.alert(
          "Error",
          "No tienes suficiente saldo para realizar esta transacción."
        );
        return;
      }
      // Update user balance and create the transaction
      const updatedUser = { ...user, amount: userBalance - transactionAmount };
      await updateUserBalance(userId, updatedUser);
      const transaction: ITransaction = {
        amount: transactionAmount,
        contact: {
          name: contactObject.name,
          lastName: contactObject.lastName,
        },
        description: detail,
        createdAt: new Date().toISOString(),
        type: "SINPE móvil",
        transactionId: "",
      };
      await createTransaction(transaction); // Create the transaction in the backend
      Alert.alert("Éxito", "Transacción realizada con éxito.");
      router.push("/"); // Redirect to home
    } catch (error) {
      console.log(error);

      Alert.alert("Error", "No se pudo realizar la transacción.");
    }
  };
  // Display
  return (
    <Screen>
      <Stack.Screen
        options={{
          headerBackVisible: true,
          headerTintColor: "#4C51F7",
          headerLeft: () => "",
          headerTitle: "Enviar dinero",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontWeight: "700",
            fontSize: 16,
            color: "#4C51F7",
          },
        }}
      />
      <View style={styles.sinpeContainer}>
        <Text style={styles.transferText}>Transferir a</Text>
        <View style={styles.contactInformation}>
          <View style={styles.contactLogo}>
            <Text style={styles.contactLogoText}>
              {contactObject.name[0]}
              {contactObject.lastName[0]}
            </Text>
          </View>
          <View>
            <Text style={styles.contactName}>{contactObject.name}</Text>
            <Text style={styles.contactNumber}>
              {contactObject?.phoneNumbers?.[0]?.number}
            </Text>
          </View>
        </View>
        <View style={styles.inputInformation}>
          <Text style={styles.amountText}>Monto</Text>
          <TextInputMask
            placeholder="₡ Monto"
            type={"money"}
            options={{
              unit: "₡",
              separator: ",",
              delimiter: ".",
              precision: 0,
            }}
            value={amount}
            onChangeText={(text) => setAmount(text)}
            style={styles.inputStyle}
          />
          <Text style={styles.detailText}>Detalle</Text>
          <TextInput
            style={styles.inputStyle}
            placeholder="Detalle"
            value={detail}
            onChangeText={(text) => setDetail(text)}
          ></TextInput>
        </View>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={handleConfirm}>
            <Text style={styles.textButton}>Confirmar</Text>
          </Pressable>
        </View>
      </View>
    </Screen>
  );
}
// Styles for the component
const styles = StyleSheet.create({
  sinpeContainer: {
    backgroundColor: "#0000",
    flex: 1,
    margin: 16,
  },
  transferText: {
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 16,
    lineHeight: 21,
    color: "#4C51F7",
  },
  contactInformation: {
    marginTop: 20,
    alignItems: "center",
    flexDirection: "row",
    gap: 16,
  },
  contactLogo: {
    width: 48,
    height: 48,
    borderRadius: 100,
    backgroundColor: "#C6C7FF",
    alignItems: "center",
    justifyContent: "center",
  },
  contactLogoText: {
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 18,
    lineHeight: 24,
    color: "#3130C6",
  },
  contactName: {
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 18,
    lineHeight: 24,
    color: "#3E3E3E",
  },
  contactNumber: {
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 16,
    color: "#4C51F7",
  },
  inputInformation: {
    marginTop: 40,
  },
  amountText: {
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 21,
    color: "#4C51F7",
  },
  detailText: {
    marginTop: 32,
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 21,
    color: "#4C51F7",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  currencySymbol: {
    fontSize: 18,
    color: "#4C51F7",
    marginRight: 8,
  },
  inputStyle: {
    marginTop: 8,
    padding: 16,
    height: 48,
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 19,
    color: "#3E3E3E",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 24,
    borderColor: "#CECECE",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 20,
  },
  button: {
    height: 48,
    backgroundColor: "#4C51F7",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 24,
    borderColor: "#CECECE",
    justifyContent: "center",
    alignItems: "center",
  },
  textButton: {
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 16,
    lineHeight: 21,
    color: "#FFFFFF",
  },
});
