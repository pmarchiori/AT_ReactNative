import React from "react";
import { View, StyleSheet } from "react-native";

import ProgressBar from "react-native-progress/Bar";

const ProgressBarComponent = ({ progressValue }) => {
  return (
    <View style={styles.container}>
      <ProgressBar
        progress={progressValue}
        style={styles.progress}
        color="rebeccapurple"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 15,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  progress: {
    height: 10,
  },
});

export default ProgressBarComponent;
