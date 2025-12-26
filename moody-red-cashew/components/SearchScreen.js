import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function SearchScreen({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 25.5941,
          longitude: 85.1376,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker coordinate={{ latitude: 25.5941, longitude: 85.1376 }} />
      </MapView>

      <View style={styles.searchBox}>
        <TextInput placeholder="Pickup Location" style={styles.input} />
        <TextInput placeholder="Drop Location" style={styles.input} />

        <TouchableOpacity
          onPress={() => navigation.navigate("RideConfirm")}
          style={styles.btn}
        >
          <Text style={styles.btnText}>Find Ride</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchBox: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 20,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  input: {
    backgroundColor: "#f1f1f1",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  btn: { backgroundColor: "black", padding: 15, borderRadius: 10, marginTop: 10 },
  btnText: { textAlign: "center", color: "#fff", fontSize: 18 },
});
