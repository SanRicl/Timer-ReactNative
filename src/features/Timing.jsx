import React from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { colors } from "../utils/colors";
import { spacing } from "../utils/sizes";

const Timing = ({ onChangeTime }) => {
  return (
    <View style={styles.timingButton}>
      <View>
        <Button
          icon="plus"
          mode="contained"
          style={styles.addTimeButton}
          onPress={() => onChangeTime(5)}
        >
          5min
        </Button>
      </View>
      <View>
      <Button
          icon="plus"
          mode="contained"
          style={styles.addTimeButton}
          onPress={() => onChangeTime(15)}
        >
          15min
        </Button>
      </View>
      <View>
        <Button
          icon="plus"
          mode="contained"
          style={styles.addTimeButton}
          onPress={() => onChangeTime(25)}
        >
          25min
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  timingButton: {
    flex: 1,
    alignContent: "center",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  addTimeButton: {
    width: 100,
    height: spacing.xxl,
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "rgba(94, 132, 226, 0.3)",
  },
});

export default Timing;
