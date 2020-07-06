import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
import * as storageMethods from './utils/storageMethods';
import * as dateMethods from './utils/dateMethods';

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

  _updateBudget = async () => {
    const response = await storageMethods.checkCurrentMonthBudget();

    if (response !== false) {
      this.setState({
        budget: response,
      });
      return;
    }

    this._renderEnterBudgetComponent();
  };

  render() {
    return (
      <View style={styles.appContainer}>
        <Text>
          Your budget is {this.state.budget || 'not set'}!
        </Text>
      </View>
    );
  }
}

export default App;

App.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.func).isRequired,
};
