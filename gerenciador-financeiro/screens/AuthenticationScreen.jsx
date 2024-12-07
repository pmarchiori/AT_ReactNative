// screens/AuthScreen.js
import React from "react";
import { View, Text, Button, StyleSheet, TextInput } from "react-native";

export default function AuthenticationScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tela de Autenticação</Text>
      <TextInput style={styles.input} placeholder="Nome de Usuário" />
      <TextInput style={styles.input} placeholder="Senha" />
      <Button
        title="Entrar"
        onPress={() => navigation.navigate("TransacaoList")}
      />
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
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    width: 300,
  },
});
