import React, { useState } from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import ListControls from "../components/ListControls";
import TransacaoList from "../components/TransacaoList";

const TransacaoListScreen = ({ route, navigation }) => {
  const { transacoes } = route.params;

  const [filteredTransactions, setFilteredTransactions] = useState(transacoes);

  const handleSortAndFilter = (filters) => {
    let sortedAndFiltered = [...transacoes];

    if (filters.type) {
      sortedAndFiltered = sortedAndFiltered.filter(
        (t) => t.tipo.toLowerCase() === filters.type.toLowerCase()
      );
    }

    sortedAndFiltered.sort((a, b) => {
      if (filters.sortBy === "data") {
        return new Date(a.data) - new Date(b.data);
      } else if (filters.sortBy === "valor") {
        return a.valor - b.valor;
      } else if (filters.sortBy === "descricao") {
        return a.descricao.localeCompare(b.descricao);
      }
      return 0;
    });

    setFilteredTransactions(sortedAndFiltered);
  };

  return (
    <View style={styles.container}>
      <ListControls onApply={handleSortAndFilter} />
      <TransacaoList transactions={filteredTransactions} />

      <Pressable
        style={styles.floatingButton}
        onPress={() => {
          navigation.navigate("TransacaoForm");
        }}
      >
        <Text style={styles.floatingButtonText}>+</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: 10,
  },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    backgroundColor: "#8ecae6",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
  },
  floatingButtonText: {
    fontSize: 24,
    color: "white",
  },
});

export default TransacaoListScreen;
