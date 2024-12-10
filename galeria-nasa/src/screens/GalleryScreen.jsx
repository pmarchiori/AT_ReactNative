import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  Button,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import ProgressBar from "react-native-progress/Bar";
import { useNavigation } from "@react-navigation/native";

import ImageGallery from "../components/ImageGallery";

export default function GalleryScreen() {
  const {
    category,
    imageList,
    isLoading,
    isRefreshing,
    progressValue,
    flatListReference,
    changeCategory,
    loadMoreImages,
    refreshGallery,
    trackScroll,
  } = ImageGallery();

  const navigation = useNavigation();

  const renderGalleryItem = ({ item }) => {
    const imageUrl = item.links?.[0]?.href;

    return (
      <View style={styles.card} key={item.data[0]?.nasa_id}>
        {imageUrl ? (
          <TouchableOpacity
            style={styles.imageContainer}
            onPress={() =>
              navigation.navigate("ImageDetailScreen", { image: item })
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
        <Picker.Item label="Earth" value="earth" />
        <Picker.Item label="Moon" value="moon" />
        <Picker.Item label="Sun" value="sun" />
        <Picker.Item label="Mars" value="mars" />
        <Picker.Item label="Jupiter" value="jupiter" />
      </Picker>

      <ProgressBar
        progress={progressValue}
        width={null}
        style={styles.progress}
        color="rebeccapurple"
      />

      <FlatList
        data={imageList}
        renderItem={renderGalleryItem}
        columnWrapperStyle={styles.rowWrapper}
        numColumns={2}
        onEndReached={loadMoreImages}
        onEndReachedThreshold={0.5}
        keyExtractor={(index) => index.toString()}
        ListFooterComponent={
          isLoading ? (
            <ActivityIndicator
              size="large"
              color="#0000ff"
              style={styles.loader}
            />
          ) : null
        }
        refreshing={isRefreshing}
        onRefresh={refreshGallery}
        onScroll={trackScroll}
        ref={flatListReference}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginBottom: 10,
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
    height: 30,
    width: "100%",
    marginBottom: 10,
  },
  rowWrapper: {
    justifyContent: "space-between",
  },
  progress: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 10,
  },
  loader: {
    margin: 20,
  },
});
