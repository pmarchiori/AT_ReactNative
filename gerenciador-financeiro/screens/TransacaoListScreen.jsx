import React, { useState, useEffect } from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";

import ListControls from "../components/ListControls";
import TransacaoList from "../components/TransacaoList";

export default function TransacaoListScreen({ route, navigation }) {
  const { transacoes } = route.params;

  const [filteredTransactions, setFilteredTransactions] = useState(transacoes);
  const [allTransactions, setAllTransactions] = useState(transacoes);

  useEffect(() => {
    if (route.params?.novaTransacao) {
      const novaTransacao = route.params.novaTransacao;
      setAllTransactions((prevTransactions) => [
        ...prevTransactions,
        novaTransacao,
      ]);
      setFilteredTransactions((prevTransactions) => [
        ...prevTransactions,
        novaTransacao,
      ]);
    }
  }, [route.params?.novaTransacao]);

  const handleSortAndFilter = (filters) => {
    let sortedAndFiltered = [...allTransactions];

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
      <TransacaoList transacoes={filteredTransactions} />

      <Pressable
        style={styles.floatingButton}
        onPress={() => navigation.navigate("TransacaoForm")}
      >
        <Text style={styles.floatingButtonText}>+</Text>
      </Pressable>
    </View>
  );
}

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
