import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API = "https://infallible-dust.onrender.com/api";

export default function WalletScreen({ navigation }) {
  const [wallet, setWallet] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const loadWallet = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");
      if (!token) throw new Error("No token found");

  
      const res = await axios.get(`${API}/login-info`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWallet(res.data.user.wallet || 0);

    
      const txRes = await axios.get(`${API}/wallet/transactions`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTransactions(txRes.data.transactions);
    } catch (err) {
      console.log("Wallet load error:", err.response?.data || err.message);
      Alert.alert("Error", "Failed to load wallet info");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWallet();
  }, []);

  const handleAddMoney = async (amount) => {
    try {
      setRefreshing(true);
      const token = await AsyncStorage.getItem("token");
      await axios.post(
        `${API}/wallet/add`,
        { amount },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      await loadWallet();
      Alert.alert("Success", `₹${amount} added to wallet`);
    } catch (err) {
      Alert.alert("Error", err.response?.data?.error || "Failed to add money");
    } finally {
      setRefreshing(false);
    }
  };


  const handleDonate = async (amount) => {
    try {
      setRefreshing(true);
      const token = await AsyncStorage.getItem("token");
      await axios.post(
        `${API}/donation`,
        { amount },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      await loadWallet();
      Alert.alert("Success", "Donation successful!");
    } catch (err) {
      Alert.alert("Error", err.response?.data?.error || "Donation failed");
    } finally {
      setRefreshing(false);
    }
  };

 
  const handleWalletPayment = async (rideId) => {
    try {
      setRefreshing(true);
      const token = await AsyncStorage.getItem("token");
      await axios.post(
        `${API}/payment/confirm`,
        { rideId, method: "WALLET" },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      await loadWallet();
      Alert.alert("Success", "Payment successful!");
    } catch (err) {
      Alert.alert("Error", err.response?.data?.error || "Payment failed");
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Wallet</Text>
      </View>

      <View style={styles.balanceBox}>
        <Text style={styles.balanceLabel}>Current Balance</Text>
        <Text style={styles.balance}>₹{wallet}</Text>
      </View>

      <Text style={styles.sectionTitle}>Recent Transactions</Text>

      {(loading || refreshing) && <ActivityIndicator size="large" color="#ffdd00" />}
      {!loading && transactions.length === 0 && (
        <Text style={{ color: "#aaa", marginTop: 10 }}>No transactions yet</Text>
      )}

      {!loading &&
        transactions.map((tx, index) => (
          <View key={index} style={styles.transaction}>
            <View>
              <Text style={styles.txType}>
                {tx.type === "DONATION" ? "Donation" :
                 tx.type === "RIDE_PAYMENT" ? "Ride Payment" :
                 "Wallet Topup"}
              </Text>
              <Text style={styles.txDesc}>{tx.description}</Text>
              <Text style={styles.txDate}>{new Date(tx.date).toLocaleString()}</Text>
            </View>
            <Text
              style={{
                color: tx.type === "DONATION" || tx.type === "RIDE_PAYMENT" ? "red" : "green",
                fontWeight: "600",
              }}
            >
              {tx.type === "WALLET_TOPUP" ? `+ ₹${tx.amount}` : `- ₹${tx.amount}`}
            </Text>
          </View>
        ))}

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleAddMoney(100)}
        disabled={refreshing}
      >
        <Text style={styles.buttonText}>Add ₹100</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleDonate(50)}
        disabled={refreshing}
      >
        <Text style={styles.buttonText}>Donate ₹50</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleWalletPayment(1234567890)} 
        disabled={refreshing}
      >
        <Text style={styles.buttonText}>Pay Ride from Wallet</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  back: { color: "blue", fontSize: 16, marginRight: 16 },
  title: { fontSize: 18, fontWeight: "bold" },

  balanceBox: {
    backgroundColor: "#ffdd00",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  balanceLabel: { fontSize: 16, fontWeight: "600", color: "#333" },
  balance: { fontSize: 28, fontWeight: "bold", marginTop: 5 },

  sectionTitle: { fontSize: 18, fontWeight: "700", marginBottom: 10 },

  transaction: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  txType: { fontWeight: "700" },
  txDesc: { color: "#555" },
  txDate: { color: "#999", fontSize: 12, marginTop: 2 },

  button: {
    backgroundColor: "#ffdd00",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: { fontWeight: "700", fontSize: 16, color: "#333" },
});
