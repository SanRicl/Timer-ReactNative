import { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { TextInput, IconButton, MD3Colors, Button } from "react-native-paper";
import { colors } from "../utils/colors";
import { spacing } from "../utils/sizes";

const Focus = ({ addSubject }) => {
  const [subject, setSubject] = useState("");


  const validateInput = () => {
    if(!subject || subject === ''){
      alert('O campo nao pode estar vazio!')
    }else{
      addSubject(subject)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          label="No que você gostaria de focar?"
          onChangeText={setSubject}
        />
        <Button
          mode="contained"
          onPress={validateInput}
        >
          add
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  inputContainer: {
    padding: spacing.lg,
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    flex: 1,
    marginRight: spacing.sm,
  },
  text: {
    color: colors.white,
  },
});

export default Focus;
