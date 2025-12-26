import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function RideConfirm({ navigation }) {
  return (
    <View style={styles.container}>

    
      <View style={styles.topBar}>
        <Text style={styles.pageTitle}>Confirm Ride</Text>

 
        <TouchableOpacity
          style={styles.walletBtn}
          onPress={() => navigation.navigate("Wallet")}
        >
          <Ionicons name="wallet-outline" size={26} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.driverCard}>
        <Image
          source={{ uri: "https://i.imgur.com/0y8Ftya.png" }}
          style={styles.driverImg}
        />

        <View style={{ flex: 1, marginLeft: 15 }}>
          <Text style={styles.driverName}>Ravi Kumar</Text>

          <View style={styles.ratingRow}>
            <Ionicons name="star" size={18} color="#FFD700" />
            <Text style={styles.rating}>4.8 (1,240 rides)</Text>
          </View>

          <View style={styles.verifiedRow}>
            <MaterialCommunityIcons
              name="shield-check"
              size={18}
              color="#4CAF50"
            />
            <Text style={styles.verified}>Verified Driver</Text>
          </View>
        </View>
      </View>

      <View style={styles.carCard}>
        <Image
          source={{ uri: "https://i.imgur.com/7FQpH4f.png" }}
          style={styles.carImg}
        />

        <View style={{ marginLeft: 12, flex: 1 }}>
          <Text style={styles.carModel}>Maruti Suzuki Dzire</Text>
          <Text style={styles.carNumber}>BR 01 AB 1234</Text>
        </View>

        <View style={styles.arrivalPill}>
          <Ionicons name="time-outline" size={16} color="#fff" />
          <Text style={styles.arrivalText}>4 min away</Text>
        </View>
      </View>

      <View style={styles.detailCard}>

        <View style={styles.row}>
          <Ionicons name="location-outline" size={22} color="#4CAF50" />
          <Text style={styles.detailText}>Patna Junction → Boring Road</Text>
        </View>

        <View style={styles.row}>
          <Ionicons name="navigate-outline" size={22} color="#000" />
          <Text style={styles.detailText}>Distance · 5.4 km</Text>
        </View>

        <View style={styles.row}>
          <Ionicons name="cash-outline" size={22} color="#000" />
          <Text style={styles.fare}>₹120 (Estimated Fare)</Text>
        </View>

        <View style={styles.row}>
          <Ionicons name="wallet-outline" size={22} color="#000" />
          <Text style={styles.detailText}>Payment · Wallet</Text>
        </View>
      </View>

      <View style={styles.safetyCard}>
        <MaterialCommunityIcons
          name="shield-check"
          size={24}
          color="#4CAF50"
        />

        <View style={{ marginLeft: 10 }}>
          <Text style={styles.safetyTitle}>Safety first, always</Text>
          <Text style={styles.safetySubtitle}>
            OTP • Trip sharing • Live ride protection
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.confirmBtn}
        onPress={() => navigation.navigate("DriverTracking")}
      >
        <Text style={styles.confirmText}>Confirm & Book Ride</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F7F7F7" },

 
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  pageTitle: { fontSize: 26, fontWeight: "800" },
  walletBtn: { padding: 6 },

  driverCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 16,
    elevation: 3,
    marginBottom: 18,
    alignItems: "center",
  },
  driverImg: { width: 70, height: 70, borderRadius: 50 },
  driverName: { fontSize: 19, fontWeight: "700" },

  ratingRow: { flexDirection: "row", alignItems: "center", marginTop: 4 },
  rating: { marginLeft: 6, fontSize: 15, color: "#666" },

  verifiedRow: { flexDirection: "row", alignItems: "center", marginTop: 5 },
  verified: { marginLeft: 6, fontSize: 14, color: "#4CAF50" },

 
  carCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 16,
    elevation: 3,
    marginBottom: 18,
    alignItems: "center",
  },
  carImg: { width: 95, height: 55, resizeMode: "contain" },

  carModel: { fontSize: 17, fontWeight: "700" },
  carNumber: { color: "#777", marginTop: 4 },

  arrivalPill: {
    backgroundColor: "#1E88E5",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  arrivalText: { color: "#fff", marginLeft: 6, fontWeight: "600" },

  detailCard: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 16,
    elevation: 3,
    marginBottom: 18,
  },
  row: { flexDirection: "row", alignItems: "center", marginVertical: 6 },
  detailText: { marginLeft: 10, fontSize: 16, color: "#444" },
  fare: { marginLeft: 10, fontSize: 18, fontWeight: "700" },


  safetyCard: {
    flexDirection: "row",
    backgroundColor: "#E8F5E9",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    marginBottom: 15,
  },
  safetyTitle: { fontSize: 16, fontWeight: "700" },
  safetySubtitle: { fontSize: 13, color: "#666" },

  confirmBtn: {
    backgroundColor: "#FFD700",
    padding: 18,
    borderRadius: 15,
  },
  confirmText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "700",
  },
});
