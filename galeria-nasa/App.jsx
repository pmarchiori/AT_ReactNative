import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import ListScreen from "./src/screens/ListScreen";
import DetailsScreen from "./src/screens/DetailsScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="ListScreen"
          component={ListScreen}
          options={{ title: "Galeria Nasa" }}
        />
        <Stack.Screen
          name="DetailsScreen"
          component={DetailsScreen}
          options={{ title: "Detalhes da imagem" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
