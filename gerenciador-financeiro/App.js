import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AuthenticationScreen from "./screens/AuthenticationScreen";
import TransacaoListScreen from "./screens/TransacaoListScreen";
import TransacaoFormScreen from "./screens/TransacaoFormScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const transacoes = [
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
  ];

  return (
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
