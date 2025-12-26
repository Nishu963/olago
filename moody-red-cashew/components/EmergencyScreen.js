import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Alert, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API = "https://infallible-dust.onrender.com/api";

export default function EmergencyScreen({ navigation }) {
  const [contacts, setContacts] = useState([]);

  const loadContacts = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const res = await axios.get(`${API}/emergency`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setContacts(res.data.contacts || []);
    } catch (err) {
      Alert.alert("Error", "Failed to load emergency contacts");
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  return (
    <View style={styles.container}>
  
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Emergency Contacts</Text>
      </View>

   
      <FlatList
        data={contacts}
        keyExtractor={(item, i) => i.toString()}
        ListEmptyComponent={<Text style={styles.emptyText}>No contacts added</Text>}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>
              {item.name} - {item.phone}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  back: { color: "blue", fontSize: 16, marginRight: 16 },
  title: { fontSize: 18, fontWeight: "bold" },
  item: { paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: "#eee" },
  itemText: { fontSize: 16 },
  emptyText: { textAlign: "center", marginTop: 20, color: "#999" },
});
