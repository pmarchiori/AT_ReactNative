import React from "react";
import { ScrollView, Text, Image, StyleSheet } from "react-native";

export default function ImageDetailScreen({ route }) {
  const { image } = route.params;

  const getTitle = image.data && image.data[0] && image.data[0].title;

  const getImageLink = image.links && image.links[0] && image.links[0].href;

  const getDescription =
    image.data && image.data[0] && image.data[0].description;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: getImageLink }} style={styles.image} />
      <Text style={styles.title}>{getTitle}</Text>
      <Text style={styles.text}>{getDescription}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  image: {
    width: "100%",
    height: 250,
    resizeMode: "contain",
    marginBottom: 15,
  },
  text: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
});
