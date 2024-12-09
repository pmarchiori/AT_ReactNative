import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import TransacaoItemList from "./TransacaoItemList";

const TransacaoList = ({ transacoes, onDelete }) => {
  const renderItem = ({ item }) => (
    <TransacaoItemList
      id={item.id}
      descricao={item.descricao}
      valor={item.valor}
      data={item.data}
      hora={item.hora}
      categoria={item.categoria}
      tipo={item.tipo}
      moeda={item.moeda}
      onDelete={() => onDelete(item.id)}
      onEdit={() => Alert.alert("Editar item!")}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={transacoes}
        renderItem={renderItem}
        keyExtractor={(item) => `${item.id}`}
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
