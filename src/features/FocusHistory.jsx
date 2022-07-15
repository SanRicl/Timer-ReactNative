import React from "react";
import { Text, View, StyleSheet, FlatList, SafeAreaView } from "react-native";
import { Button } from "react-native-paper";
import { colors } from "../utils/colors";
import { fontSizes, spacing } from "../utils/sizes";

const HistoryItem = ({ item, index }) => {
  return <Text style={style.historyItem(item.status)}>{item.subject}</Text>;
};

const FocusHistory = ({ focusHistory, onClear }) => {
  const clearHistory = () => {
    onClear();
  };

  return (
    <>
      <SafeAreaView style={{ flex: 0.5, alignItems: "center" }}>
        {!!focusHistory && (
          <>
            <Text style={style.title}>Coisas em que focamos:</Text>
            <FlatList
              style={{ flex: 1 }}
              contentContainerStyle={{ flex: 1, alignItems: "center" }}
              data={focusHistory}
              renderItem={HistoryItem}
            />
            <View style={style.clearContainer}>
              <Button
                compact={true}
                mode="contained"
                onPress={() => onClear()}
              >
                Limpar
              </Button>
            </View>
          </>
        )}
      </SafeAreaView>
    </>
  );
};

const style = StyleSheet.create({
  historyItem: (status) => ({
    color: status > 1 ? "red" : "green",
    fontSize: fontSizes.md,
    marginTop: spacing.md
  }),
  container: {
    padding: spacing.md,
    flex: 1,
  },
  item: {
    fontSize: fontSizes.md,
    color: colors.white,
    paddingTop: spacing.sm,
  },
  title: {
    color: colors.white,
    fontSize: fontSizes.md,
    fontWeight: "bold",
  },
  uncompleted: {
    color: colors.white,
    fontSize: fontSizes.md,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default FocusHistory;
