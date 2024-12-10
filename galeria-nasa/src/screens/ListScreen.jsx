import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";

import ImageList from "../components/ImageList";
import ProgressBarComponent from "../components/ProgressBar";

export default function ListScreen() {
  const {
    category,
    changeCategory,
    imageList,
    isRefreshing,
    isLoading,
    loadMoreImages,
    refreshGallery,
    progressValue,
    flatListReference,
    trackScroll,
  } = ImageList();

  const navigation = useNavigation();

  const renderListItem = ({ item }) => {
    const imageUrl = item.links?.[0]?.href;

    return (
      <View style={styles.card} key={item.data[0]?.nasa_id}>
        {imageUrl ? (
          <TouchableOpacity
            style={styles.imageContainer}
            onPress={() =>
              navigation.navigate("DetailsScreen", { image: item })
            }
          >
            <Image source={{ uri: imageUrl }} style={styles.image} />
          </TouchableOpacity>
        ) : (
          <Text>Imagem indisponível</Text>
        )}
        <Text>{item.data[0]?.title}</Text>
      </View>
    );
  };

  return (
    <View style={styles.screen}>
      <Picker
        selectedValue={category}
        style={styles.selector}
        onValueChange={changeCategory}
      >
        <Picker.Item label="Terra" value="earth" />
        <Picker.Item label="Lua" value="moon" />
        <Picker.Item label="Sol" value="sun" />
        <Picker.Item label="Mercurio" value="mercury" />
        <Picker.Item label="Marte" value="mars" />
        <Picker.Item label="Vênus" value="venus" />
        <Picker.Item label="Jupiter" value="jupiter" />
      </Picker>

      <FlatList
        data={imageList}
        renderItem={renderListItem}
        columnWrapperStyle={styles.rowWrapper}
        numColumns={2}
        onEndReached={loadMoreImages}
        onEndReachedThreshold={0.5}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={
          isLoading ? (
            <ActivityIndicator
              size="large"
              color="rebeccapurple"
              style={styles.loader}
            />
          ) : null
        }
        refreshing={isRefreshing}
        onRefresh={refreshGallery}
        onScroll={trackScroll}
        ref={flatListReference}
      />
      <ProgressBarComponent progressValue={progressValue} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginBottom: 5,
    alignItems: "center",
  },
  imageContainer: {
    width: "100%",
    marginBottom: 10,
  },
  image: {
    height: 150,
    margin: 5,
    resizeMode: "contain",
  },

  screen: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  selector: {
    height: 50,
    width: "100%",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  rowWrapper: {
    justifyContent: "space-between",
  },
  loader: {
    margin: 30,
  },
});
