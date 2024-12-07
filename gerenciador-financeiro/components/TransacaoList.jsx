import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import TransacaoItemList from "./TransacaoItemList"; // Componente para exibir detalhes de cada transação

const TransacaoList = ({ transacoes }) => {
  const renderItem = ({ item }) => (
    <TransacaoItemList
      descricao={item.descricao}
      valor={item.valor}
      data={item.data}
      hora={item.hora}
      categoria={item.categoria}
      tipo={item.tipo}
      moeda={item.moeda}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={transacoes}
        renderItem={renderItem}
        keyExtractor={(item) => `${item.id || item.descricao}-${item.data}`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: 10,
  },
});

export default TransacaoList;
