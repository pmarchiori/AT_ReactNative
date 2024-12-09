import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TransacaoFormScreen from "./screens/TransacaoFormScreen";
import TransacaoListScreen from "./screens/TransacaoListScreen";
import AuthenticationScreen from "./screens/AuthenticationScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import TransacaoShow from "./components/TransacaoShow";

const Stack = createNativeStackNavigator();

export default function App() {
  const [transacoes, setTransacoes] = useState([
    {
      descricao: "Compra no supermercado",
      valor: 200.5,
      data: "2024-12-05",
      hora: "14:30",
      categoria: "Alimentação",
      tipo: "despesa",
      moeda: "BRL",
    },
    {
      descricao: "Pagamento salário",
      valor: 5000,
      data: "2024-12-01",
      hora: "09:00",
      categoria: "Receita",
      tipo: "receita",
      moeda: "BRL",
    },
  ]);

  return (
    <GestureHandlerRootView>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Auth">
          <Stack.Screen
            name="Auth"
            component={AuthenticationScreen}
            options={{ title: "Login ou Registro" }}
          />
          <Stack.Screen
            name="TransacaoList"
            component={TransacaoListScreen}
            initialParams={{ transacoes }}
            options={{ title: "Lista de Transações" }}
          />
          <Stack.Screen
            name="TransacaoForm"
            component={TransacaoFormScreen}
            options={{ title: "Nova Transação" }}
          />
          <Stack.Screen
            name="TransacaoShow"
            component={TransacaoShow}
            options={{ title: "Detalhes da transação" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
