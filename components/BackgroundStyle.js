import { StyleSheet, Dimensions } from 'react-native';

const Window = Dimensions.get('window');

export default StyleSheet.create({
  BackgroundStyle: {
    height: Window.height,
    width: Window.width,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  }
});