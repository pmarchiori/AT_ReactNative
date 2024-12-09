import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, Alert, Image } from "react-native";
import {
  GestureHandlerRootView,
  Pressable,
} from "react-native-gesture-handler";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";

const TransacaoItemList = ({
  id,
  descricao,
  valor,
  data,
  hora,
  categoria,
  tipo,
  moeda,
  onDelete,
  onEdit,
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

  const renderLeftActions = () => (
    <View style={[styles.actionContainer, styles.editAction]}>
      <Pressable onPress={handleEditPress}>
        <Image
          source={require("../assets/edit.png")}
          style={styles.actionIcon}
        />
      </Pressable>
    </View>
  );

  const renderRightActions = () => (
    <View style={[styles.actionContainer, styles.deleteAction]}>
      <Pressable onPress={() => onDelete(id)}>
        <Image
          source={require("../assets/delete.png")}
          style={styles.actionIcon}
        />
      </Pressable>
    </View>
  );

  const handleEditPress = () => {
    if (onEdit) {
      onEdit();
    } else if (navigation) {
      navigation.navigate("TransacaoShow", {
        id,
        descricao,
        valor,
        data,
        hora,
        categoria,
        tipo,
        moeda,
      });
    }
  };

  return (
    <GestureHandlerRootView>
      <ReanimatedSwipeable
        renderLeftActions={renderLeftActions}
        onSwipeableLeftOpen={() => {
          if (onEdit) onEdit();
        }}
        renderRightActions={renderRightActions}
        onSwipeableRightOpen={() => {
          if (onDelete) onDelete(id);
        }}
      >
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
      </ReanimatedSwipeable>
    </GestureHandlerRootView>
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
  actionContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 80,
  },

  actionIcon: {
    width: 24,
    height: 24,
  },
});

export default TransacaoItemList;
