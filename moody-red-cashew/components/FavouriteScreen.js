import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API = "https://infallible-dust.onrender.com/api";

export default function FavouriteScreen({ navigation }) {
  const [list, setList] = useState([]);

  const loadFavourites = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const res = await axios.get(`${API}/favourites`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setList(res.data.favourites || []);
    } catch (err) {
      console.log("Load error:", err.message);
      Alert.alert("Error", "Failed to load favourites");
    }
  };

  const addFavourite = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) throw new Error("No token found");

      await axios.post(
        `${API}/favourites/add`,
        { place: "Bhagalpur Railway Station" }, // example
        { headers: { Authorization: `Bearer ${token}` } }
      );

      loadFavourites();
    } catch (err) {
      console.log("Add error:", err.message);
      Alert.alert("Error", "Failed to add favourite");
    }
  };

  useEffect(() => {
    loadFavourites();
  }, []);

  return (
    <View style={styles.container}>
   
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Favourites</Text>
      </View>

     
      <TouchableOpacity style={styles.addBtn} onPress={addFavourite}>
        <Text style={styles.addText}>+ Add Favourite</Text>
      </TouchableOpacity>

      
      <FlatList
        data={list}
        keyExtractor={(item, i) => i.toString()}
        ListEmptyComponent={<Text style={styles.emptyText}>No favourites yet</Text>}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item}</Text>
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
  addBtn: { backgroundColor: "green", padding: 12, borderRadius: 8, marginBottom: 16, alignItems: "center" },
  addText: { color: "#fff", fontWeight: "bold" },
  item: { paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: "#eee" },
  itemText: { fontSize: 16 },
  emptyText: { textAlign: "center", marginTop: 20, color: "#999" },
});
