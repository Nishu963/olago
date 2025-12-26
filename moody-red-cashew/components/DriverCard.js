
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function DriverCard({ driver, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: driver.photo }} style={styles.photo} />
      <View style={styles.info}>
        <Text style={styles.name}>{driver.name}</Text>
        <Text style={styles.car}>
          {driver.car} • {driver.plate}
        </Text>
        <View style={styles.row}>
          <Ionicons name="star" size={16} color="#FFD700" />
          <Text style={styles.rating}>{driver.rating}</Text>
          <Text style={styles.distance}>{driver.distance}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 15,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 5,
    alignItems: "center",
  },
  photo: { width: 60, height: 60, borderRadius: 30 },
  info: { marginLeft: 12, flex: 1 },
  name: { fontSize: 16, fontWeight: "bold" },
  car: { fontSize: 14, color: "#555", marginVertical: 2 },
  row: { flexDirection: "row", alignItems: "center", gap: 8 },
  rating: { marginLeft: 4, fontSize: 14, color: "#555" },
  distance: { marginLeft: 10, fontSize: 14, color: "#888" },
});
