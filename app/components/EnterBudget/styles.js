import { Platform, StatusBar, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  enterBudgetContainer: {
    flex: 1,
    ...Platform.select({
      ios: { paddingTop: 20 },
      android: { paddingTop: StatusBar.currentHeight },
    }),
  },
  enterBudgetHeader: {
    color: '#3D4A53',
    fontSize: 24,
    margin: 10,
    textAlign: 'center',
  },
  enterBudgetText: {
    color: '#3D4A53',
    fontSize: 16,
    margin: 10,
    textAlign: 'center',
  },
  textInput: {
    height: 40,
    borderColor: '#86B2CA',
    borderWidth: 1,
    color: '#3D4A53',
    margin: 10,
    padding: 10,
    textAlign: 'center',
  },
});

export default styles;
