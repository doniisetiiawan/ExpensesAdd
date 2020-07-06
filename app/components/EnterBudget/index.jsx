import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Button,
  Text,
  TextInput,
  View,
} from 'react-native';
import styles from './styles';

class EnterBudget extends Component {
  constructor(props) {
    super(props);

    this.state = {
      budget: undefined,
    };
  }

  _saveAndUpdateBudget = () => {
    this.props.route.params.saveAndUpdateBudget(
      this.state.budget,
    );
    this.props.navigation.pop();
  };

  _setBudgetValue = (budget) => {
    this.setState({
      budget,
    });
  };

  render() {
    return (
      <View style={styles.enterBudgetContainer}>
        <Text style={styles.enterBudgetHeader}>
          Enter Your {this.props.route.params.monthString}{' '}
          Budget
        </Text>
        <Text style={styles.enterBudgetText}>
          What s your spending goal?
        </Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(budget) => this._setBudgetValue(budget)}
          value={this.state.budget}
          placeholder="0"
          keyboardType="numeric"
        />
        <View>
          <Button
            color="#3D4A53"
            disabled={!this.state.budget}
            onPress={() => this._saveAndUpdateBudget()}
            title="Save Budget"
          />
        </View>
      </View>
    );
  }
}

export default EnterBudget;

EnterBudget.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.func).isRequired,
  route: PropTypes.objectOf(PropTypes.any).isRequired,
};
