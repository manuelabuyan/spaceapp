import { StyleSheet, Platform, StatusBar } from "react-native";

export default StyleSheet.create({
  SafeViewStyle: {
    flex: 1,
    backgroundColor: '#000000',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  }
});