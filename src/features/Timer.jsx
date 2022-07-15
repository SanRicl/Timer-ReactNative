import React, { useState } from "react";
import { View, StyleSheet, Text, Vibration, Platform } from "react-native";
import { useKeepAwake } from "expo-keep-awake";
import { ProgressBar, IconButton, Button } from "react-native-paper";
import { Countdown } from "../components/Countdown";
import RoundedButton from "../components/RoundedButton";
import { colors } from "../utils/colors";
import { spacing } from "../utils/sizes";
import Timing from "./Timing";


const DEFAULT_TIME = 0.1;
export const Timer = ({ focusSubject, clearSubject, onTimerEnd }) => {
  useKeepAwake();

  const interval = React.useRef(null);
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  const [minutes, setMinutes] = useState(DEFAULT_TIME);

  const vibrate = () => {
    if (Platform.OS === 'ios') {
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => clearInterval(interval), 10000);
    } else {
      Vibration.vibrate(10000);
    }
  };

  const onProgress = (progress) => {
    setProgress(progress);
  };
  
  const onEnd = () => {
    vibrate();
    setMinutes(DEFAULT_TIME);
    setProgress(1);
    setIsStarted(false);
    onTimerEnd();
  };

  const changeTime = (min) => {
    setMinutes(min);
    setProgress(1);
    setIsStarted(false);
  };


  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={onProgress}
          onEnd={onEnd}
        />
        <View style={{ padding: spacing.xxl }}>
          <Text style={styles.title}>Focando em: </Text>
          <Text style={styles.task}>{focusSubject}</Text>
        </View>
      </View>
      <View style={{ paddingTop: spacing.sm }}>
        <ProgressBar
          progress={progress}
          color={colors.progressBar}
          style={{ height: spacing.sm }}
        />
      </View>
      <View style={styles.timingWrapper}>
        <Timing onChangeTime={changeTime} />
      </View>
      <View style={styles.buttonWrapper}>
        {!isStarted && (
          <RoundedButton title="Iniciar" onPress={() => setIsStarted(true)} />
        )}
        {isStarted && (
          <RoundedButton title="Pausar" onPress={() => setIsStarted(false)} />
        )}
      </View>
      <View style={styles.clearSubjectWrapper}>
        <Button
          compact={true}
          mode="contained"
          style={styles.clearButton}
          onPress={clearSubject}
        >
          Limpar
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  countdown: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: "row",
    padding: spacing.md,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: colors.white,
    fontWeight: "bold",
    textAlign: "center",
  },
  task: {
    color: colors.white,
    textAlign: "center",
  },
  timingWrapper: {
    flex: 0.1,
    paddingTop: spacing.xxl,
    flexDirection: "row",
  },
  clearSubjectWrapper: {
    flexDirection: "row",
    justifyContent: "center",
  },
  clearButton: {
    width: 100,
    height: spacing.xxl,
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "#6d1717fc",
  },
});

export default Timer