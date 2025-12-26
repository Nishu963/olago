import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API = "https://infallible-dust.onrender.com/api";

export default function DonationScreen({ navigation }) {
  const [wallet, setWallet] = useState(0);
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [transactions, setTransactions] = useState([]);

  const loadWalletAndTransactions = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const res = await axios.get(`${API}/login-info`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWallet(res.data.user.wallet || 0);

   
      const txRes = await axios.get(`${API}/wallet/transactions`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTransactions(txRes.data.transactions || []);
    } catch (err) {
      console.log("Load wallet error:", err.message);
      Alert.alert("Error", "Failed to load wallet and transactions");
    }
  };

  useEffect(() => {
    loadWalletAndTransactions();
  }, []);

  const handleDonate = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const numAmount = parseFloat(amount);
      if (isNaN(numAmount) || numAmount <= 0) {
        Alert.alert("Invalid Amount", "Enter a valid donation amount");
        return;
      }

      const res = await axios.post(
        `${API}/donate`,
        { amount: numAmount },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setWallet(res.data.wallet);
      setMessage(`You donated ₹${numAmount} successfully!`);

      
      setTransactions((prev) => [res.data.transaction, ...prev]);

      setAmount("");
    } catch (err) {
      console.log("Donation error:", err.response?.data || err.message);
      Alert.alert("Error", err.response?.data?.error || "Donation failed");
    }
  };

  return (
    <ScrollView style={styles.container}>
    
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Donate</Text>
      </View>

      <Text style={styles.wallet}>Wallet Balance: ₹{wallet}</Text>

 
      <TextInput
        placeholder="Enter donation amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        style={styles.input}
      />

      <TouchableOpacity style={styles.donateBtn} onPress={handleDonate}>
        <Text style={styles.donateText}>Donate</Text>
      </TouchableOpacity>

      {message ? <Text style={styles.message}>{message}</Text> : null}


      <Text style={styles.sectionTitle}>Transaction History</Text>
      {transactions.length === 0 && <Text>No transactions yet</Text>}
      {transactions.map((tx, index) => (
        <View key={index} style={styles.transaction}>
          <Text>{tx.description}</Text>
          <Text style={{ color: tx.type === "DONATION" ? "red" : "green" }}>
            {tx.type === "DONATION" ? "-" : ""} ₹{tx.amount}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  back: { color: "blue", fontSize: 16, marginRight: 16 },
  title: { fontSize: 18, fontWeight: "bold" },
  wallet: { fontSize: 16, marginBottom: 16 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
  },
  donateBtn: {
    backgroundColor: "green",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  donateText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  message: { marginTop: 20, fontSize: 16, color: "green", fontWeight: "600" },
  sectionTitle: { fontSize: 18, fontWeight: "700", marginBottom: 10 },
  transaction: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
});
