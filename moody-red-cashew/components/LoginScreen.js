import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginSignup({ navigation }) {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [loading, setLoading] = useState(false);

  const slideAnim = useRef(new Animated.Value(0)).current;
  const backendURL = "https://infallible-dust.onrender.com";

  const switchMode = (m) => {
    setMode(m);
    Animated.timing(slideAnim, {
      toValue: m === "login" ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

 
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${backendURL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: email.trim(),
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        Alert.alert("Login Failed", data.error || "Invalid credentials");
        setLoading(false);
        return;
      }

      await AsyncStorage.setItem("token", data.token);
      Alert.alert("Success", "Login Successful");
      navigation.replace("Home");
    } catch (err) {
      Alert.alert("Error", "Server not reachable");
    }

    setLoading(false);
  };

  const handleSignup = async () => {
    if (!email || !password || !confirmPass) {
      Alert.alert("Error", "Fill all fields");
      return;
    }

    if (password !== confirmPass) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${backendURL}/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: email.trim(),
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        Alert.alert("Signup Failed", data.error || "Error");
        setLoading(false);
        return;
      }

      Alert.alert("Success", "Account created");
      switchMode("login");
    } catch (err) {
      Alert.alert("Error", "Server not reachable");
    }

    setLoading(false);
  };

  
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
    
      <View style={styles.topSection}>
        <Image
          source={{ uri: "https://img.icons8.com/color/96/000000/taxi.png" }}
          style={styles.logo}
        />
        <Text style={styles.heading}>Welcome to OlaGo</Text>
        <Text style={styles.sub}>Book your rides instantly</Text>
      </View>

     
      <View style={styles.switchContainer}>
        <Animated.View
          style={[
            styles.switchIndicator,
            {
              left: slideAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ["3%", "53%"],
              }),
            },
          ]}
        />

        <TouchableOpacity
          style={styles.switchBtn}
          onPress={() => switchMode("login")}
        >
          <Text
            style={[
              styles.switchText,
              mode === "login" && styles.activeSwitchText,
            ]}
          >
            Login
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.switchBtn}
          onPress={() => switchMode("signup")}
        >
          <Text
            style={[
              styles.switchText,
              mode === "signup" && styles.activeSwitchText,
            ]}
          >
            Signup
          </Text>
        </TouchableOpacity>
      </View>

     
      <View style={styles.inputSection}>
        <TextInput
          style={styles.input}
          placeholder="Email / Username"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {mode === "signup" && (
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#aaa"
            secureTextEntry
            value={confirmPass}
            onChangeText={setConfirmPass}
          />
        )}

        <TouchableOpacity
          style={styles.mainBtn}
          onPress={mode === "login" ? handleLogin : handleSignup}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#000" />
          ) : (
            <Text style={styles.mainBtnText}>
              {mode === "login" ? "Login" : "Create Account"}
            </Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <Text style={styles.footerText}>
        {mode === "login"
          ? "Don't have an account?"
          : "Already have an account?"}
        <Text
          style={styles.footerLink}
          onPress={() => switchMode(mode === "login" ? "signup" : "login")}
        >
          {mode === "login" ? " Sign Up" : " Login"}
        </Text>
      </Text>
    </KeyboardAvoidingView>
  );
}

const PRIMARY = "#F5C226";
const BG = "#111";
const INPUT_BG = "#222";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
    padding: 25,
    justifyContent: "center",
  },
  topSection: { alignItems: "center", marginBottom: 30 },
  logo: { width: 80, height: 80, marginBottom: 15 },
  heading: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "900",
  },
  sub: { color: "#aaa", fontSize: 16 },

  switchContainer: {
    flexDirection: "row",
    backgroundColor: "#222",
    borderRadius: 12,
    marginBottom: 20,
    position: "relative",
  },
  switchBtn: { flex: 1, paddingVertical: 12, alignItems: "center" },
  switchText: { fontSize: 18, color: "#777", fontWeight: "600" },
  activeSwitchText: { color: "#fff" },
  switchIndicator: {
    position: "absolute",
    top: 4,
    width: "44%",
    height: "92%",
    backgroundColor: PRIMARY,
    borderRadius: 10,
    zIndex: -1,
  },

  inputSection: { marginTop: 10 },
  input: {
    backgroundColor: INPUT_BG,
    padding: 14,
    borderRadius: 10,
    color: "#fff",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#333",
  },
  mainBtn: {
    backgroundColor: PRIMARY,
    padding: 16,
    borderRadius: 12,
    marginTop: 10,
  },
  mainBtnText: {
    color: "#000",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "800",
  },

  footerText: { color: "#aaa", textAlign: "center", marginTop: 25 },
  footerLink: { color: PRIMARY, fontWeight: "700" },
});
