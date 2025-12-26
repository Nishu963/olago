// components/WelcomeScreen.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,

} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
     
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb",
        }}
        style={styles.bg}
      />
}
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.85)"]}
        style={styles.overlay}
      />

      <SafeAreaView style={styles.content}>
        <Text style={styles.heading}>Your Ride, Anytime</Text>
        <Text style={styles.sub}>
          Fast, safe & affordable rides with one tap.
        </Text>

        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.btnText}>Get Started</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  bg: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "60%",
  },
  content: {
    position: "absolute",
    bottom: 60,
    width: "90%",
    alignSelf: "center",
  },
  heading: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "900",
    marginBottom: 10,
  },
  sub: {
    color: "#eee",
    fontSize: 18,
    marginBottom: 35,
    lineHeight: 26,
  },
  btn: {
    backgroundColor: "#FFD700",
    paddingVertical: 16,
    borderRadius: 14,
  },
  btnText: {
    textAlign: "center",
    color: "#000",
    fontSize: 20,
    fontWeight: "bold",
  },
});
