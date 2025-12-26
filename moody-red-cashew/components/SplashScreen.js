import { View, Text, StyleSheet, Image } from "react-native";
import { useEffect } from "react";

export default function Splash({ navigation }) {
  useEffect(() => {
    setTimeout(() => navigation.replace("Welcome"), 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://cdn-icons-png.flaticon.com/512/3097/3097144.png" }}
        style={styles.logo}
      />
      <Text style={styles.text}>OlaGo</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", justifyContent: "center", alignItems: "center" },
  logo: { width: 120, height: 120 },
  text: { color: "#FFD700", fontSize: 35, marginTop: 20, fontWeight: "bold" },
});
