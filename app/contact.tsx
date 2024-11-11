/**
 * Contact Component
 *
 * This component allows the user to access their contacts, search them by name or number,
 * and view the contacts grouped by the first letter of their name. It uses `expo-contacts`
 * to fetch the contacts and `FlatList` to render the contacts efficiently.
 *
 * The component also includes permission handling to request access to contacts and
 * search functionality for filtering contacts.
 *
 * // Usage in another component
 * <Contact />
 */
import * as Contacts from "expo-contacts";
import React, { useEffect, useState } from "react";
import {
  Pressable,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator,
  Image,
} from "react-native";
import { Link, Stack } from "expo-router";
import { Screen } from "../components/Screen";
import { IContact } from "../models/types";

const arrow = require("../assets/icon/arrow.png");
const searchIcon = require("../assets/icon/search.png");

/**
 * The main Contact component.
 *
 * Handles the permission request for accessing contacts, fetching and sorting
 * contacts, and searching for specific contacts by name or phone number.
 * Displays the contacts in a grouped list and allows users to navigate to a
 * different screen with the selected contact's details.
 */
export default function Contact() {
  const [contacts, setContacts] = useState<
    { letter: string; contacts: IContact[] }[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  /**
   * Requests permission to access contacts on the device. If granted, it fetches contacts.
   */
  useEffect(() => {
    const getPermission = async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        searchContacts();
      } else {
        searchContacts();
      }
    };
    getPermission();
  }, []);

  /**
   * Fetches contacts from the device, sorts them by full name, filters them based
   * on the search term, and groups them by the first letter of their name.
   *
   * @async
   */
  const searchContacts = async () => {
    setIsLoading(true);
    const config = { sort: Contacts.SortTypes.FirstName };
    const loadedContacts = (await Contacts.getContactsAsync(config)) || {
      data: [],
    };

    // Group contact sorted
    const sortedContacts = loadedContacts.data.sort((a, b) => {
      const fullNameA = `${a.name} ${a.lastName}`.toLowerCase();
      const fullNameB = `${b.name} ${b.lastName}`.toLowerCase();
      return fullNameA.localeCompare(fullNameB);
    });

    // Group contact filtered
    const filteredContacts = sortedContacts.filter((contact: any) => {
      const fullName =
        `${contact.name || ""} ${contact.lastName || ""}`.toLowerCase();
      const phoneNumber = `${contact.phoneNumbers[0].number.substring(5)}`;
      const searchTerm = search.toLowerCase();

      return fullName.includes(searchTerm) || phoneNumber.includes(searchTerm);
    });

    // Group contacts by the first letter of the name
    const groupedContacts = filteredContacts.reduce<{
      [letter: string]: any[];
    }>((acc, contact) => {
      const firstLetter = contact.name.charAt(0).toUpperCase();
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      acc[firstLetter].push(contact);
      return acc;
    }, {});

    // Convert grouped contacts object to an array
    const groupedContactsArray = Object.keys(groupedContacts).map((key) => ({
      letter: key,
      contacts: groupedContacts[key],
    }));
    setContacts(groupedContactsArray);
    setIsLoading(false);
  };
  // Display
  return (
    <Screen>
      <Stack.Screen
        options={{
          headerBackVisible: true,
          headerTintColor: "#4C51F7",
          headerLeft: () => "",
          headerTitle: "Seleccioná un contacto",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontWeight: "700",
            fontSize: 16,
            color: "#4C51F7",
          },
        }}
      />
      <View style={styles.row}>
        <Pressable onPress={searchContacts}>
          <Image style={styles.searchLogo} source={searchIcon} />
        </Pressable>
        <TextInput
          placeholder="Buscá por nombre o número"
          onChangeText={setSearch}
          value={search}
          style={styles.textInput}
          onSubmitEditing={searchContacts}
        />
      </View>
      {isLoading ? (
        <ActivityIndicator color={"#fff"} size={"large"} />
      ) : (
        <FlatList
          style={styles.list}
          data={contacts}
          keyExtractor={(item) => item.letter}
          renderItem={({ item }) => (
            <View>
              <Text style={styles.header}>{item.letter}</Text>
              {item.contacts.map((contact: any) => (
                <Link
                  href={{
                    pathname: "/sinpe/1",
                    params: {
                      contact: JSON.stringify(contact),
                    },
                  }}
                  asChild
                  key={contact.id}
                >
                  <Pressable>
                    <View key={contact.id} style={styles.contactContainer}>
                      <View style={styles.contactInformation}>
                        <View style={styles.contactLogo}>
                          <Text style={styles.contactLogoText}>
                            {contact.firstName[0]}
                            {contact.lastName[0]}
                          </Text>
                        </View>
                        <View>
                          <Text style={styles.contactName}>{contact.name}</Text>
                          <Text style={styles.contactNumber}>
                            {" "}
                            {contact?.phoneNumbers?.[0]?.number}
                          </Text>
                        </View>
                      </View>
                      <View>
                        <Image source={arrow} />
                      </View>
                    </View>
                  </Pressable>
                </Link>
              ))}
              <View style={styles.separator} />
            </View>
          )}
          ListEmptyComponent={() => <Text>No hay contactos</Text>}
        />
      )}
    </Screen>
  );
}
// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    flex: 1,
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 19,
    color: "#787878",
  },
  list: {
    flex: 1,
    marginTop: 24,
  },
  row: {
    marginTop: 16,
    marginLeft: 16,
    marginRight: 16,
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#CECECE",
    borderWidth: 1,
    borderRadius: 100,
  },
  searchLogo: {
    marginLeft: 10,
  },
  contactContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 26,
    gap: 16,
  },
  contactInformation: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    gap: 16,
  },
  contactLogo: {
    width: 32,
    height: 32,
    borderRadius: 100,
    backgroundColor: "#C6C7FF",
    alignItems: "center",
    justifyContent: "center",
  },
  contactLogoText: {
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 11,
    lineHeight: 15,
    color: "#3130C6",
  },
  contactName: {
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 19,
    color: "#3E3E3E",
  },
  contactNumber: {
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 16,
    color: "#787878",
  },
  separator: {
    height: 1,
    backgroundColor: "#4C51F7",
    marginVertical: 10,
  },
  header: {
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 16,
    color: "#4C51F7",
    marginLeft: 16,
  },
});
