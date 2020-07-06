import { Platform, StyleSheet, StatusBar } from 'react-native';

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    ...Platform.select({
      ios: { paddingTop: 20 },
      android: { paddingTop: StatusBar.currentHeight },
    }),
  },
});
export default styles;
