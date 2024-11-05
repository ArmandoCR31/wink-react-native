import * as Contacts from "expo-contacts";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
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

const arrow = require("../assets/icon/arrow.png");
const searchIcon = require("../assets/icon/search.png");

type Contact = {
  id: string;
  name: string;
  lastName: string;
  number: number;
};
export default function Contact() {
  const insets = useSafeAreaInsets();
  const [contacts, setContacts] = useState<
    { letter: string; contacts: Contact[] }[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const dataTest = [
    {
      data: [
        {
          id: "01",
          name: "Marvin",
          lastName: "Castro Roldán",
          number: 83362273,
        },
        {
          id: "02",
          name: "Laura",
          lastName: "Pérez Jiménez",
          number: 87654321,
        },
        {
          id: "03",
          name: "Carlos",
          lastName: "Ramírez Solano",
          number: 89451230,
        },
        {
          id: "04",
          name: "María",
          lastName: "Torres Guevara",
          number: 80122345,
        },
        {
          id: "05",
          name: "Luis",
          lastName: "Mora Villalobos",
          number: 87001234,
        },
        {
          id: "06",
          name: "Andrea",
          lastName: "López Salazar",
          number: 88903456,
        },
        {
          id: "07",
          name: "Manuel",
          lastName: "Vargas Aguilar",
          number: 83214567,
        },
        {
          id: "08",
          name: "Sofía",
          lastName: "González Monge",
          number: 84457612,
        },
        {
          id: "09",
          name: "Fernando",
          lastName: "Araya Vega",
          number: 81234567,
        },
        {
          id: "10",
          name: "Daniela",
          lastName: "Rojas Rojas",
          number: 85412345,
        },
        {
          id: "11",
          name: "Sebastián",
          lastName: "Quesada Leiva",
          number: 80987654,
        },
        {
          id: "12",
          name: "Jose",
          lastName: "Gutiérrez Díaz",
          number: 89761234,
        },
        {
          id: "13",
          name: "Alejandro",
          lastName: "Marín Soto",
          number: 83344321,
        },
        {
          id: "14",
          name: "Gabriela",
          lastName: "Soto Herrera",
          number: 87432156,
        },
        {
          id: "15",
          name: "Ricardo",
          lastName: "Hernández Mora",
          number: 84123456,
        },
        {
          id: "16",
          name: "Monserrat",
          lastName: "Castro Blanco",
          number: 89123456,
        },
        {
          id: "17",
          name: "Samuel",
          lastName: "Jiménez Paniagua",
          number: 85123478,
        },
        {
          id: "18",
          name: "Verónica",
          lastName: "Díaz Sánchez",
          number: 82213456,
        },
        {
          id: "19",
          name: "Felipe",
          lastName: "Alvarado Campos",
          number: 84561234,
        },
        {
          id: "20",
          name: "Natalia",
          lastName: "Céspedes Mora",
          number: 81234509,
        },
        {
          id: "21",
          name: "Marvin",
          lastName: "Perez Roldán",
          number: 83362273,
        },
      ],
    },
  ];
  useEffect(() => {
    const getPermission = async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        searchContacts();
      }
    };
    getPermission();
  }, []);

  const searchContacts = async () => {
    setIsLoading(true);
    // const config = { sort: Contacts.SortTypes.FirstName };
    // const loadedContacts = (await Contacts.getContactsAsync(config)) || {
    //   data: [],
    // };
    const loadedContacts = dataTest;

    const sortedContacts = loadedContacts[0].data.sort((a, b) => {
      const fullNameA = `${a.name} ${a.lastName}`.toLowerCase();
      const fullNameB = `${b.name} ${b.lastName}`.toLowerCase();
      return fullNameA.localeCompare(fullNameB);
    });

    const filteredContacts = sortedContacts.filter((contact: Contact) => {
      const fullName =
        `${contact.name || ""} ${contact.lastName || ""}`.toLowerCase();
      const phoneNumber = `${contact.number}`;
      const searchTerm = search.toLowerCase();

      return fullName.includes(searchTerm) || phoneNumber.includes(searchTerm);
    });

    // Define el tipo de groupedContacts
    const groupedContacts = filteredContacts.reduce<{
      [letter: string]: Contact[];
    }>((acc, contact) => {
      const firstLetter = contact.name.charAt(0).toUpperCase();
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      acc[firstLetter].push(contact);
      return acc;
    }, {});

    const groupedContactsArray = Object.keys(groupedContacts).map((key) => ({
      letter: key,
      contacts: groupedContacts[key],
    }));
    setContacts(groupedContactsArray);
    setIsLoading(false);
  };

  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        alignItems: "center",
      }}
    >
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
                <View key={contact.id} style={styles.contactContainer}>
                  <View style={styles.contactInformation}>
                    <View style={styles.contactLogo}>
                      <Text style={styles.contactLogoText}>
                        {contact.name[0]}
                        {contact.lastName[0]}
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.contactName}>
                        {contact.name} {contact.lastName}
                      </Text>
                      <Text style={styles.contactNumber}>
                        +506 {contact.number}
                      </Text>
                    </View>
                  </View>
                  <View>
                    <Image source={arrow} />
                  </View>
                </View>
              ))}
              <View style={styles.separator} />
            </View>
          )}
          ListEmptyComponent={() => <Text>No hay contactos</Text>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    padding: 5,
    margin: 16,
    flex: 1,
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 19,
    color: "#787878",
  },
  list: {
    flex: 1,
    width: "100%",
  },
  row: {
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
