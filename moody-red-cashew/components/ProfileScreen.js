import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  ActivityIndicator,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";

const API = "https://infallible-dust.onrender.com/api";

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const authHeader = async () => ({
    headers: {
      Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
    },
  });

  const loadProfile = async () => {
    try {
      setLoading(true);
      const u = await axios.get(`${API}/login-info`, await authHeader());
      const s = await axios.get(`${API}/settings`, await authHeader());
      setUser(u.data.user);
      setSettings(s.data.settings);
    } catch (err) {
      console.log("Profile load error:", err.response?.data || err.message);
      Alert.alert("Error", "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const updateSettings = async (data) => {
    try {
      const res = await axios.post(
        `${API}/settings/update`,
        data,
        await authHeader()
      );
      setSettings(res.data.settings);
    } catch (err) {
      console.log("Settings update error:", err.response?.data || err.message);
      Alert.alert("Error", "Failed to update settings");
    }
  };

  const donate = async (amount = 50) => {
    try {
      setRefreshing(true);
      const res = await axios.post(
        `${API}/donation`,
        { amount },
        await authHeader()
      );
      setUser({ ...user, wallet: res.data.wallet, donations: res.data.donations });
      Alert.alert("Thank you ❤️", `Donation of ₹${amount} successful`);
    } catch (err) {
      console.log("Donation error:", err.response?.data || err.message);
      Alert.alert("Error", err.response?.data?.error || "Donation failed");
    } finally {
      setRefreshing(false);
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    navigation.replace("Login");
  };

  if (loading || !user || !settings) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" color="#ffdd00" />;
  }

  return (
    <ScrollView style={styles.container}>
     
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
        <Ionicons name="arrow-back" size={24} color="blue" />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.username?.[0]?.toUpperCase() || ""}
          </Text>
        </View>
        <View>
          <Text style={styles.name}>{user?.username || ""}</Text>
          <Text style={styles.wallet}>Wallet ₹{user?.wallet || 0}</Text>
        </View>
      </View>

      <Text style={styles.section}>App Settings</Text>

      <Row title="Notifications">
        <Switch
          value={settings?.notifications || false}
          onValueChange={(v) => updateSettings({ notifications: v })}
        />
      </Row>

      <Row title="Dark Mode">
        <Switch
          value={settings?.darkMode || false}
          onValueChange={(v) => updateSettings({ darkMode: v })}
        />
      </Row>

      <PressRow
        title={`Language (${settings?.language || "English"})`}
        onPress={() =>
          updateSettings({
            language: settings?.language === "English" ? "Hindi" : "English",
          })
        }
      />

    
      <Text style={styles.section}>Other Options</Text>

      <PressRow
        title="Favourite Locations"
        onPress={() => navigation.navigate("Favourites")}
      />

      <PressRow
        title="Emergency Contacts"
        onPress={() => navigation.navigate("Emergency")}
      />

      <PressRow
        title={`Donate ₹50`}
        onPress={() => donate(50)}
      />

      <TouchableOpacity onPress={logout} style={styles.logout}>
        <Text style={{ color: "red", fontWeight: "600" }}>Log Out</Text>
      </TouchableOpacity>

      {refreshing && <ActivityIndicator size="large" color="#ffdd00" />}
    </ScrollView>
  );
}

const Row = ({ title, children }) => (
  <View style={styles.row}>
    <Text>{title}</Text>
    {children}
  </View>
);

const PressRow = ({ title, onPress }) => (
  <TouchableOpacity style={styles.row} onPress={onPress}>
    <Text>{title}</Text>
    <Ionicons name="chevron-forward" size={18} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  backBtn: { flexDirection: "row", alignItems: "center", padding: 16 },
  backText: { color: "blue", fontSize: 16, marginLeft: 8 },
  header: { flexDirection: "row", padding: 16, alignItems: "center" },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: { color: "#fff", fontWeight: "700", fontSize: 18 },
  name: { fontSize: 18, fontWeight: "600" },
  wallet: { color: "#4CAF50", marginTop: 4 },
  section: {
    padding: 16,
    fontWeight: "600",
    backgroundColor: "#f5f5f5",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  logout: { alignItems: "center", marginVertical: 30 },
});
