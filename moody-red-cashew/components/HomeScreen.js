import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  TextInput,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";

export default function HomeScreen({ navigation }) {
  const backendURL = "https://infallible-dust.onrender.com";

  const [token, setToken] = useState(null);
  const [drivers, setDrivers] = useState([]);
  const [loadingDrivers, setLoadingDrivers] = useState(false);

  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [rideType, setRideType] = useState("Ride");

  const [cities, setCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [activeInput, setActiveInput] = useState(null);


  useEffect(() => {
    const login = async () => {
      try {
        const res = await axios.post(`${backendURL}/api/login`, {
          username: "demo",
          password: "123456",
        });

        console.log("Login response:", res.data);

        if (res.data.token) {
          setToken(res.data.token);
        } else {
          Alert.alert("Error", "No token received from backend");
        }
      } catch (err) {
        console.error("Login error:", err.message);
        Alert.alert("Error", "Backend not reachable");
      }
    };
    login();
  }, []);
  useEffect(() => {
    if (!token) return;

    const loadDrivers = async () => {
      try {
        setLoadingDrivers(true);
        console.log("Fetching nearby drivers with token:", token);

        const res = await axios.get(`${backendURL}/api/drivers/nearby`, {
          headers: { Authorization: `Bearer ${token}` },
          params: { lat: 25.20, lng: 87.00 },
          timeout: 10000,
        });

        console.log("Nearby drivers response:", res.data);

        if (res.data?.drivers) setDrivers(res.data.drivers);
        else setDrivers([]);
      } catch (err) {
        console.error("Driver fetch error:", err.message);
        if (err.response) console.error("Response data:", err.response.data);
        else if (err.request) console.error("No response received:", err.request);
        setDrivers([]);
      } finally {
        setLoadingDrivers(false);
      }
    };

    
    const timer = setTimeout(loadDrivers, 1500);
    return () => clearTimeout(timer);
  }, [token]);

 
  useEffect(() => {
    setCities([
      "Bhagalpur Railway Station",
      "Tilka Manjhi Chowk",
      "Ghantaghar Bhagalpur",
      "Sabour University",
      "Vikramshila Setu",
      "Nathnagar",
      "Mayaganj Hospital",
      "Kacheri Chowk",
      "Airport Road",
      "Bus Stand Bhagalpur",
    ]);
  }, []);

  const filterCity = (text) => {
    setFilteredCities(
      cities.filter((c) => c.toLowerCase().includes(text.toLowerCase()))
    );
  };

  const requestRide = () => {
    if (!pickup || !destination) {
      Alert.alert("Error", "Enter pickup and destination");
      return;
    }
    navigation.navigate("RideConfirm", {
      pickup,
      destination,
      token,
      rideType,
    });
  };

  const rideTabs = [
    { key: "Ride", icon: "car" },
    { key: "Rent", icon: "clock-outline" },
    { key: "Outstation", icon: "map-marker" },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>OlaGo</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Wallet")}>
          <Ionicons name="wallet" size={26} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.rideTabs}>
        {rideTabs.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[
              styles.rideTab,
              rideType === tab.key && styles.rideTabActive,
            ]}
            onPress={() => setRideType(tab.key)}
          >
            <MaterialCommunityIcons
              name={tab.icon}
              size={22}
              color={rideType === tab.key ? "#000" : "#ccc"}
            />
            <Text style={{ color: rideType === tab.key ? "#000" : "#ccc" }}>
              {tab.key}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.inputBox}>
        <Ionicons name="location" size={20} color="#ffdd00" />
        <TextInput
          placeholder="Pickup Location"
          placeholderTextColor="#aaa"
          value={pickup}
          onFocus={() => setActiveInput("pickup")}
          onChangeText={(text) => {
            setPickup(text);
            filterCity(text);
          }}
          style={styles.input}
        />
      </View>

      <View style={styles.inputBox}>
        <Ionicons name="flag" size={20} color="#ffdd00" />
        <TextInput
          placeholder="Destination"
          placeholderTextColor="#aaa"
          value={destination}
          onFocus={() => setActiveInput("destination")}
          onChangeText={(text) => {
            setDestination(text);
            filterCity(text);
          }}
          style={styles.input}
        />
      </View>

      {filteredCities.length > 0 && (
        <View style={styles.suggestionBox}>
          {filteredCities.map((city) => (
            <TouchableOpacity
              key={city}
              onPress={() => {
                activeInput === "pickup"
                  ? setPickup(city)
                  : setDestination(city);
                setFilteredCities([]);
              }}
            >
              <Text style={styles.suggestionText}>{city}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <TouchableOpacity style={styles.rideButton} onPress={requestRide}>
        <Text style={styles.rideButtonText}>Request Ride</Text>
      </TouchableOpacity>

     
      <Text style={styles.sectionTitle}>Nearby Drivers</Text>

      {loadingDrivers ? (
        <ActivityIndicator size="large" color="#ffdd00" />
      ) : (
        <FlatList
          data={drivers}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={
            <Text style={{ color: "#aaa", marginTop: 10 }}>
              No nearby drivers
            </Text>
          }
          renderItem={({ item }) => (
            <View style={styles.driverCard}>
              <Text style={{ fontSize: 26 }}>🚗</Text>
              <View style={{ marginLeft: 15 }}>
                <Text style={styles.driverName}>{item.name}</Text>
                <Text style={styles.driverText}>{item.car}</Text>
                <Text style={styles.driverText}>⭐ {item.rating}</Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#111", padding: 20 },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: { fontSize: 28, fontWeight: "bold", color: "#fff" },

  rideTabs: { flexDirection: "row", marginVertical: 15 },
  rideTab: {
    flex: 1,
    backgroundColor: "#333",
    padding: 12,
    marginHorizontal: 5,
    borderRadius: 12,
    alignItems: "center",
  },
  rideTabActive: { backgroundColor: "#ffdd00" },

  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#222",
    borderRadius: 12,
    padding: 12,
    marginTop: 8,
  },
  input: { color: "#fff", marginLeft: 10, flex: 1 },

  suggestionBox: {
    backgroundColor: "#1c1c1c",
    borderRadius: 10,
    padding: 10,
  },
  suggestionText: { color: "#ddd", paddingVertical: 8 },

  rideButton: {
    backgroundColor: "#ffdd00",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 20,
  },
  rideButtonText: { fontWeight: "700", fontSize: 16 },

  sectionTitle: {
    fontSize: 22,
    color: "#fff",
    marginTop: 20,
    marginBottom: 10,
  },

  driverCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    marginVertical: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  driverName: { fontWeight: "700", color: "#000" },
  driverText: { color: "#333" },
});
