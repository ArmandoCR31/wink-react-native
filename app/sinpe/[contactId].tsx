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

export default function SinpeTransaction() {
  const [amount, setAmount] = useState("");
  const [detail, setDetail] = useState("");
  const { contact } = useLocalSearchParams();
  const contactObject = contact
    ? JSON.parse(decodeURIComponent(contact as string))
    : null;

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

  async function updateUserBalance(userId: string, user: IUser) {
    // Llamada a tu API para obtener el saldo del usuario
    const response = await updateUser(userId, user);
    return response.amount;
  }

  const handleConfirm = async () => {
    if (!amount || parseFloat(amount.replace(/[^0-9.-]+/g, "")) <= 0) {
      alert("Por favor ingrese un monto válido.");
      return;
    }

    const transactionAmount = parseInt(amount.replace(/\D/g, ""), 10);
    try {
      const userId = "ad677daf-9a6a-446a-b6c2-ce61fa1bc07e";
      const user = await fetchUser(userId);
      const userBalance = user.amount;
      if (userBalance < transactionAmount) {
        Alert.alert(
          "Error",
          "No tienes suficiente saldo para realizar esta transacción."
        );
        return;
      }

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
      await createTransaction(transaction);
      Alert.alert("Éxito", "Transacción realizada con éxito.");
      router.push("/");
    } catch (error) {
      console.log(error);

      Alert.alert("Error", "No se pudo realizar la transacción.");
    }
  };

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
            <Text style={styles.contactName}>
              {contactObject.name} {contactObject.lastName}
            </Text>
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
