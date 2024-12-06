import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Pressable,
  Text,
  useWindowDimensions,
} from "react-native";

const ListControls = ({ onApply }) => {
  const [type, setType] = useState("");
  const [sortBy, setSortBy] = useState("data");
  const { width, height } = useWindowDimensions();

  const isHorizontal = width > height;

  const handleApply = () => {
    onApply({ type, sortBy });
  };

  return (
    <View
      style={[
        styles.controlsContainer,
        isHorizontal && styles.horizontalContainer,
      ]}
    >
      <TextInput
        style={[styles.input, isHorizontal && styles.horizontalInput]}
        placeholder="Filtrar por tipo (receita/despesa)"
        value={type}
        onChangeText={(text) => setType(text)}
      />
      <Picker
        selectedValue={sortBy}
        onValueChange={(value) => setSortBy(value)}
        style={[styles.picker, isHorizontal && styles.horizontalPicker]}
      >
        <Picker.Item label="Ordenar por data" value="data" />
        <Picker.Item label="Ordenar por valor" value="valor" />
        <Picker.Item label="Ordenar por descrição" value="descricao" />
      </Picker>
      <Pressable
        style={[styles.applyButton, isHorizontal && styles.horizontalButton]}
        onPress={handleApply}
      >
        <Text style={styles.applyButtonText}>Aplicar</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  controlsContainer: {
    padding: 10,
  },
  horizontalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 5,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  horizontalInput: {
    flex: 1,
    marginRight: 10,
    marginBottom: 0,
  },
  picker: {
    height: 60,
    borderRadius: 5,
    marginBottom: 10,
  },
  horizontalPicker: {
    flex: 1,
    marginRight: 10,
    marginBottom: 0,
  },
  applyButton: {
    backgroundColor: "#8ecae6",
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 5,
  },
  horizontalButton: {
    flex: 1,
    marginBottom: 0,
  },
  applyButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default ListControls;
