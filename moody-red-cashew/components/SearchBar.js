
import React, { useState } from "react";
import { View, TextInput, FlatList, TouchableOpacity, Text, StyleSheet } from "react-native";

export default function SearchBar({ placeholder, value, onChangeText, suggestions }) {
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleChange = (text) => {
    onChangeText(text);
    if (text.length > 0) {
      const filtered = suggestions.filter((city) =>
        city.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSelect = (city) => {
    onChangeText(city);
    setShowSuggestions(false);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={handleChange}
        autoCapitalize="words"
      />
      {showSuggestions && filteredSuggestions.length > 0 && (
        <View style={styles.suggestionContainer}>
          <FlatList
            data={filteredSuggestions}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleSelect(item)} style={styles.suggestionItem}>
                <Text>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 5 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    backgroundColor: "#fff",
  },
  suggestionContainer: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderTopWidth: 0,
    maxHeight: 120,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
});
