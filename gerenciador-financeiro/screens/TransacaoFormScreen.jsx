import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";

import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";

import CurrencyApi from "../api/CurrencyApi";

export default function TransacaoFormScreen({ navigation }) {
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [data, setData] = useState(new Date());
  const [hora, setHora] = useState(new Date());
  const [categoria, setCategoria] = useState("");
  const [tipo, setTipo] = useState("Despesa");
  const [moeda, setMoeda] = useState("");
  const [moedasDisponiveis, setMoedasDisponiveis] = useState([]);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  useEffect(() => {
    const fetchMoedas = async () => {
      try {
        const moedas = await CurrencyApi.getMonitoredCurrencies();
        setMoedasDisponiveis(moedas);
      } catch (error) {
        console.error("Erro ao carregar moedas: ", error);
        Alert.alert("Erro", "Não foi possível carregar as moedas.");
      }
    };
    fetchMoedas();
  }, []);

  const handleSave = () => {
    if (!descricao || !valor || !categoria || !moeda) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    const novaTransacao = {
      id: Date.now(),
      descricao,
      valor: parseFloat(valor),
      data: data.toISOString().split("T")[0],
      hora: hora.toTimeString().split(" ")[0].slice(0, 5),
      categoria,
      tipo,
      moeda,
    };

    navigation.navigate("TransacaoList", { novaTransacao });
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setData(selectedDate);
    }
  };

  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setHora(selectedTime);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nova Transação</Text>
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
      />
      <TextInput
        style={styles.input}
        placeholder="Valor"
        keyboardType="numeric"
        value={valor}
        onChangeText={setValor}
      />
      <View style={styles.dateContainer}>
        <View style={styles.datePickerWrapper}>
          <Button
            title="Selecionar Data"
            onPress={() => setShowDatePicker(true)}
          />
          {showDatePicker && (
            <DateTimePicker
              value={data}
              mode="date"
              onChange={handleDateChange}
            />
          )}
        </View>

        <View style={styles.datePickerWrapper}>
          <Button
            title="Selecionar Hora"
            onPress={() => setShowTimePicker(true)}
          />
          {showTimePicker && (
            <DateTimePicker
              value={hora}
              mode="time"
              onChange={handleTimeChange}
            />
          )}
        </View>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Categoria"
        value={categoria}
        onChangeText={setCategoria}
      />
      <Picker
        selectedValue={tipo}
        style={styles.picker}
        onValueChange={(itemValue) => setTipo(itemValue)}
      >
        <Picker.Item label="Despesa" value="despesa" />
        <Picker.Item label="Receita" value="receita" />
      </Picker>
      <Picker
        selectedValue={moeda}
        style={styles.picker}
        onValueChange={(itemValue) => setMoeda(itemValue)}
      >
        <Picker.Item label="Selecione uma moeda" value="" />
        {moedasDisponiveis.map((item) => (
          <Picker.Item
            key={item.simbolo}
            label={item.nomeFormatado}
            value={item.simbolo}
          />
        ))}
      </Picker>
      <Button title="Salvar" onPress={handleSave} />
      <Button title="Voltar" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  datePickerWrapper: {
    flex: 1,
    marginHorizontal: 5,
  },
  picker: {
    height: 50,
    marginBottom: 15,
  },
});
