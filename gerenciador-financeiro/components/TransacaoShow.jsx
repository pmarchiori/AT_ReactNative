import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function TransacaoShow({ route }) {
  const { descricao, valor, data, hora, categoria, tipo, moeda } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes da Transação</Text>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Descrição:</Text>
        <Text style={styles.value}>{descricao}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Valor:</Text>
        <Text style={styles.value}>
          {moeda} {valor.toFixed(2)}
        </Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Data:</Text>
        <Text style={styles.value}>{data}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Hora:</Text>
        <Text style={styles.value}>{hora}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Categoria:</Text>
        <Text style={styles.value}>{categoria}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Tipo:</Text>
        <Text style={styles.value}>{tipo}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  detailContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
    flex: 1,
  },
  value: {
    flex: 2,
  },
});
