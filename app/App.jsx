import React, { Component } from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
import * as storageMethods from './utils/storageMethods';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      budget: undefined,
    };
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillMount = async () => {
    const response = await storageMethods.checkCurrentMonthBudget();

    if (response !== false) {
      this.setState({
        budget: response,
      });
      return;
    }

    alert('You have not set a budget for this month!');
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
