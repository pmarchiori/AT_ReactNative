import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import GalleryScreen from "./src/screens/GalleryScreen";
import ImageDetailScreen from "./src/screens/ImageDetailScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="GalleryScreen"
          component={GalleryScreen}
          options={{ title: "Galera Nasa" }}
        />
        <Stack.Screen
          name="ImageDetailScreen"
          component={ImageDetailScreen}
          options={{ title: "Detalhes da imagem" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
