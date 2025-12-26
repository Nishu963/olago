
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "./components/SplashScreen";
import WelcomeScreen from "./components/WelcomeScreen";
import LoginScreen from "./components/LoginScreen";
import HomeScreen from "./components/HomeScreen";
import RideConfirmScreen from "./components/RideConfirmScreen";
import BookingScreen from "./components/BookingScreen";
import ProfileScreen from "./components/ProfileScreen";
import WalletScreen from "./components/WalletScreen";
import FavouriteScreen from "./components/FavouriteScreen";
import EmergencyScreen from "./components/EmergencyScreen";
import DonationScreen from "./components/DonationScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
      
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />

        
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="RideConfirm" component={RideConfirmScreen} />
        <Stack.Screen name="BookingScreen" component={BookingScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Wallet" component={WalletScreen} />

        <Stack.Screen name="Favourites" component={FavouriteScreen} />
        <Stack.Screen name="Emergency" component={EmergencyScreen} />
        <Stack.Screen name="Donation" component={DonationScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
