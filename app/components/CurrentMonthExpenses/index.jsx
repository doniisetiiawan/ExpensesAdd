import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { FlatList, Text, View } from 'react-native';
import ProgressBar from '@kcodev/react-native-progress-bar';
import styles from './styles';
import * as dateMethods from '../../utils/dateMethods';
import ExpenseRow from '../ExpenseRow';

class CurrentMonthExpenses extends Component {
  _renderRowData = (rowData) => {
    if (rowData) {
      return (
        <ExpenseRow
          amount={rowData.item.amount}
          category={rowData.item.category}
          description={rowData.item.description}
        />
      );
    }
  };

  _renderRowSeparator = (sectionID) => (
    <View key={sectionID} style={styles.rowSeparator} />
  );

  render() {
    console.log(this.props.budget);
    console.log(this.props.spent);
    const dataSource = this.props.expenses || [];

    return (
      <View style={styles.currentMonthExpensesContainer}>
        <View style={styles.currentMonthExpensesHeader}>
          <Text style={styles.headerText}>
            Your{' '}
            {`${dateMethods.getMonthString(
              this.props.month,
            )} ${this.props.year}`}{' '}
            budget:
          </Text>
          <Text style={styles.subText}>
            { this.props.spent } of { this.props.budget } spent
          </Text>
          <ProgressBar
            value={this.props.spent}
            maxValue={parseInt(this.props.budget, 10)}
            backgroundColor="#A3E75A"
            style={styles.progressView}
            useNativeDriver
          />
        </View>
        <FlatList
          data={dataSource}
          renderItem={(rowData) => this._renderRowData(rowData)}
          ItemSeparatorComponent={(sectionID) => this._renderRowSeparator(sectionID)}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

export default CurrentMonthExpenses;

CurrentMonthExpenses.propTypes = {
  budget: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object),
  month: PropTypes.string.isRequired,
  spent: PropTypes.number.isRequired,
  year: PropTypes.string.isRequired,
};

CurrentMonthExpenses.defaultProps = {
  expenses: [],
};
