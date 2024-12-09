import { View, Text } from "react-native";

export default function TransacaoShow({ route }) {
  const { descricao, valor, data, hora, categoria, tipo, moeda } = route.params;
  return (
    <View>
      <Text>{descricao}</Text>
      <Text>{valor}</Text>
      <Text>{data}</Text>
      <Text>{hora}</Text>
      <Text>{categoria}</Text>
      <Text>{tipo}</Text>
      <Text>{moeda}</Text>
    </View>
  );
}
