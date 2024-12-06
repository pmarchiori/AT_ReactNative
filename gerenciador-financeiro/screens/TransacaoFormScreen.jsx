import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function TransacaoFormScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tela de Formulário de Transação</Text>
      <Button title="Voltar" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
});
