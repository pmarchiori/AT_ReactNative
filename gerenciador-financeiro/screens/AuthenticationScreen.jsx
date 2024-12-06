// screens/AuthScreen.js
import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function AuthenticationScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tela de Autenticação</Text>
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
});
