import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

const TransacaoItemList = ({
  descricao,
  valor,
  data,
  hora,
  categoria,
  tipo,
  moeda,
}) => {
  const [isLandscape, setIsLandscape] = useState(false);

  useEffect(() => {
    const updateOrientation = () => {
      const { width, height } = Dimensions.get("window");
      setIsLandscape(width > height);
    };

    updateOrientation();
    const subscription = Dimensions.addEventListener(
      "change",
      updateOrientation
    );

    return () => subscription.remove();
  }, []);

  return (
    <View
      style={[
        styles.container,
        tipo === "receita" ? styles.receita : styles.despesa,
      ]}
    >
      <Text style={styles.descricao}>{descricao}</Text>
      <Text style={styles.valor}>
        {moeda} {valor.toFixed(2)}
      </Text>
      <Text style={styles.data}>{data}</Text>

      {isLandscape && (
        <>
          <Text style={styles.hora}>{hora}</Text>
          <Text style={styles.categoria}>{categoria}</Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  receita: {
    backgroundColor: "#e0f7e9",
  },
  despesa: {
    backgroundColor: "#fdecea",
  },
  descricao: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  valor: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },
  data: {
    fontSize: 12,
    color: "#555",
    marginBottom: 5,
  },
  hora: {
    fontSize: 12,
    color: "#555",
  },
  categoria: {
    fontSize: 12,
    fontStyle: "italic",
    color: "#777",
    marginTop: 5,
  },
});

export default TransacaoItemList;
