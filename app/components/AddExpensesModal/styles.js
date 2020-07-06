import {
  Platform,
  StatusBar,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    ...Platform.select({
      ios: { paddingTop: 20 },
      android: { paddingTop: StatusBar.currentHeight },
    }),
  },
  amountInput: {
    borderColor: '#86B2CA',
    borderRadius: 10,
    borderWidth: 1,
    color: '#3D4A53',
    height: 40,
    margin: 10,
    padding: 10,
    width: 200,
  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  amountText: {
    color: '#3D4A53',
    margin: 10,
    marginLeft: 20,
    paddingTop: 10,
  },
  descriptionInput: {
    borderColor: '#86B2CA',
    borderRadius: 10,
    borderWidth: 1,
    color: '#3D4A53',
    height: 40,
    margin: 10,
    padding: 10,
  },
  descriptionText: {
    color: '#3D4A53',
    marginBottom: 5,
    marginLeft: 20,
    marginRight: 10,
    marginTop: 10,
  },
  headerText: {
    color: '#7D878D',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  expandableCellContainer: {
    flex: 1,
  },
});

export default styles;
