import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';



import { colors } from "./src/utils/colors";
import Timer from "./src/features/Timer";
import Focus from "./src/features/Focus";
import FocusHistory from "./src/features/FocusHistory";

const STATUSES = {
  COMPLETE: 1,
  CANCELLED: 2,
};

export default function App() {
  const [currentSubject, setCurrentSubject] = useState(null);
  const [history, setHistory] = useState([]);

  const addFocusHistorySubjectWithStatus = (subject, status) => {
    setHistory([
      ...history,
      { key: String(history.length + 1), subject, status },
    ]);
  };

  const onClear = () => {
    setHistory([]);
  };

  const saveFocusHistory = async () => {
    try {
      await AsyncStorage.setItem('focusHistory', JSON.stringify(history));
    } catch (e) {
      console.log(e);
    }
  };

  const loadFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('focusHistory');

      if (history && JSON.parse(history).length) {
        setHistory(JSON.parse(history));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadFocusHistory();
  }, []);

  useEffect(() => {
    saveFocusHistory();
  }, [history]);

  return (
    <SafeAreaView style={styles.container}>
      {currentSubject ? (
        <Timer
        focusSubject={currentSubject}
        onTimerEnd={() => {
          addFocusHistorySubjectWithStatus(currentSubject, STATUSES.COMPLETE);
          setCurrentSubject(null);
        }}
        clearSubject={() => {
          addFocusHistorySubjectWithStatus(currentSubject, STATUSES.CANCELLED);
          setCurrentSubject(null);
        }}
      />
      ) : (
        <>
          <Focus addSubject={setCurrentSubject} />
          <FocusHistory focusHistory={history} onClear={onClear} />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: colors.darkBlue,
  },
});
