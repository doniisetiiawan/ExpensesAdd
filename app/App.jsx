import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View } from 'react-native';
import styles from './styles';
import * as storageMethods from './utils/storageMethods';
import * as dateMethods from './utils/dateMethods';
import AddExpenses from './components/AddExpenses';
import CurrentMonthExpenses from './components/CurrentMonthExpenses';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      budget: undefined,
    };
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillMount = () => {
    // storageMethods.resetAsyncStorage();
    this.setState({
      month: dateMethods.getMonth(),
      year: dateMethods.getYear(),
    });

    this._updateBudget();
  };

  _renderEnterBudgetComponent = () => {
    this.props.navigation.push('EnterBudget', {
      monthString: dateMethods.getMonthString(
        this.state.month,
      ),
      saveAndUpdateBudget: (budget) => this._saveAndUpdateBudget(budget),
    });
  };

  _saveAndUpdateBudget = async (budget) => {
    await storageMethods.saveMonthlyBudget(
      this.state.month,
      this.state.year,
      budget,
    );

    this._updateBudget();
  };

  _updateCurrentMonthExpenses = async () => {
    const responseObject = await storageMethods.getMonthObject(
      this.state.month,
      this.state.year,
    );

    if (responseObject) {
      this.setState({
        budget: responseObject.budget,
        expenses: responseObject.expenses,
        spent: responseObject.spent,
      });
    }
  };

  _updateBudget = async () => {
    const response = await storageMethods.checkCurrentMonthBudget();

    if (response !== false) {
      this.setState({
        budget: response,
      });

      this._updateCurrentMonthExpenses();
      return;
    }

    this._renderEnterBudgetComponent();
  };

  render() {
    return (
      <View style={styles.appContainer}>
        <CurrentMonthExpenses
          budget={this.state.budget || '0'}
          expenses={this.state.expenses}
          month={this.state.month}
          spent={this.state.spent || 0}
          year={this.state.year}
        />
        <AddExpenses
          month={this.state.month}
          updateCurrentMonthExpenses={() => this._updateCurrentMonthExpenses()}
          year={this.state.year}
        />
      </View>
    );
  }
}

export default App;

App.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.func).isRequired,
};
