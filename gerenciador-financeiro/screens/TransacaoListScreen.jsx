import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import ListControls from "../components/ListControls";
import TransacaoList from "../components/TransacaoList";

export default function TransacaoListScreen({ navigation }) {
  const [transacoes, setTransacoes] = useState([
    {
      id: 1,
      descricao: "Compra supermercado",
      valor: 150,
      data: "2024-12-01",
      hora: "10:00",
      categoria: "Alimentação",
      tipo: "despesa",
      moeda: "R$",
    },
    {
      id: 2,
      descricao: "Salário",
      valor: 5000,
      data: "2024-12-01",
      hora: "09:00",
      categoria: "Trabalho",
      tipo: "receita",
      moeda: "R$",
    },
  ]);

  const [filteredTransacoes, setFilteredTransacoes] = useState(transacoes);

  const handleAddTransaction = () => {
    navigation.navigate("TransacaoForm", {
      onSave: (novaTransacao) => {
        setTransacoes((prevTransacoes) => {
          const novasTransacoes = [...prevTransacoes, novaTransacao];
          setFilteredTransacoes(novasTransacoes);
          return novasTransacoes;
        });
      },
    });
  };

  const ordenarTransacoes = (transacoes, sortBy) => {
    return transacoes.sort((a, b) => {
      if (sortBy === "data") {
        return new Date(a.data) - new Date(b.data);
      } else if (sortBy === "valor") {
        return a.valor - b.valor;
      } else if (sortBy === "descricao") {
        return a.descricao.localeCompare(b.descricao);
      }
      return 0;
    });
  };

  const filtrarTransacoes = (transacoes, filter) => {
    let transacoesFiltradas = [...transacoes];
    if (filter.type) {
      transacoesFiltradas = transacoesFiltradas.filter((transacao) =>
        transacao.tipo.toLowerCase().includes(filter.type.toLowerCase())
      );
    }
    return ordenarTransacoes(transacoesFiltradas, filter.sortBy);
  };

  const handleApplyFilters = ({ type, sortBy }) => {
    const transacoesFiltradas = filtrarTransacoes(transacoes, { type, sortBy });
    setFilteredTransacoes(transacoesFiltradas);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lista de Transações</Text>
      <ListControls onApply={handleApplyFilters} />
      <TransacaoList transacoes={filteredTransacoes} />
      <Pressable style={styles.floatingButton} onPress={handleAddTransaction}>
        <Text style={styles.floatingButtonText}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
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
