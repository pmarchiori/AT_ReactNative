import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import TransacaoItemList from "./TransacaoItemList";
import { useNavigation } from "@react-navigation/native";

const TransacaoList = ({ transacoes, onDelete }) => {
  const navigation = useNavigation();
  const renderItem = ({ item }) => (
    <TransacaoItemList
      {...item}
      onDelete={() => onDelete(item.id)}
      onEdit={() => handleEdit(item.id)} // Navega para TransacaoShow com os dados da transação
    />
  );

  const handleEdit = (id) => {
    navigation.navigate("TransacaoShow", {
      ...transacoes.find((item) => item.id === id),
    });
  };

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
