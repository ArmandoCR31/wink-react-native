/**
 * DetailTransaction Component
 *
 * This component displays the details of a specific transaction, including the contact's information,
 * transaction amount, description, and date. It retrieves the transaction data from the URL query
 * parameter and shows an error message if the data is invalid. The component also provides a button
 * that allows the user to navigate back to the main screen.
 *
 * // Usage in another component
 * <DetailTransaction />
 */
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Stack, Link, useLocalSearchParams } from "expo-router";
import { Screen } from "../../../components/Screen";
import { TransactionDate } from "../../../components/TransactionDate";
/**
 * DetailTransaction component is used to display the details of a specific transaction.
 * The transaction data is retrieved from the URL query parameter, parsed, and shown in the UI.
 * If no valid data is found, an error message is displayed instead.
 */
export default function DetailTransaction() {
  // Retrieve and parse the `detail` parameter from the URL
  const { detail } = useLocalSearchParams();
  const detailObject = detail
    ? JSON.parse(decodeURIComponent(detail as string))
    : null;

  // Error display if detailObject is null
  if (!detailObject) {
    return (
      <Screen>
        <Stack.Screen
          options={{
            headerBackVisible: true,
            headerTintColor: "#4C51F7",
            headerLeft: () => "",
            headerTitle: "Detalle de movimiento",
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontWeight: "700",
              fontSize: 16,
              color: "#4C51F7",
            },
          }}
        />
        <Text>Error al cargar el detalle</Text>
      </Screen>
    );
  }

  // Display transaction details if detailObject exists
  return (
    <Screen>
      <Stack.Screen
        options={{
          headerBackVisible: true,
          headerTintColor: "#4C51F7",
          headerLeft: () => "",
          headerTitle: "Detalle de movimiento",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontWeight: "700",
            fontSize: 16,
            color: "#4C51F7",
          },
        }}
      />
      <View style={styles.sinpeContainer}>
        <View style={styles.contactInformation}>
          <View style={styles.contactLogo}>
            <Text style={styles.contactLogoText}>
              {detailObject.contact.name[0]}
              {detailObject.contact.lastName[0]}
            </Text>
          </View>
          <View style={styles.contactText}>
            <Text style={styles.contactName}>
              {detailObject.type} - {detailObject.contact.name}
            </Text>
            <Text style={styles.amountText}>₡{detailObject.amount}</Text>
          </View>
        </View>
        <View style={styles.details}>
          <View>
            <Text style={styles.titleStyle}>Fecha</Text>
            <TransactionDate date={detailObject.createdAt} />
          </View>
          <View>
            <Text style={styles.titleStyle}>Descripción</Text>
            <Text style={styles.descriptionStyle}>
              {detailObject.description}
            </Text>
          </View>
          <View>
            <Text style={styles.titleStyle}>Tipo de movimiento</Text>
            <Text style={styles.descriptionStyle}>{detailObject.type}</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Link
            href={{
              pathname: "/",
            }}
            asChild
          >
            <Pressable style={styles.button}>
              <Text style={styles.textButton}>Volver</Text>
            </Pressable>
          </Link>
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
  contactInformation: {
    marginTop: 10,
    alignItems: "center",
    flexDirection: "column",
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
  contactText: {
    alignItems: "center",
    justifyContent: "center",
  },
  contactName: {
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 19,
    color: "#3E3E3E",
  },
  amountText: {
    marginTop: 8,
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 22,
    lineHeight: 29,
    color: "#3E3E3E",
  },
  details: {
    marginTop: 40,
    gap: 36,
  },
  titleStyle: {
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 16,
    color: "#787878",
  },
  descriptionStyle: {
    marginTop: 8,
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 19,
    color: "#3E3E3E",
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
