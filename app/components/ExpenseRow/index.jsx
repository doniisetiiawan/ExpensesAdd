import PropTypes from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';

function ExpenseRow(props) {
  return (
    <View style={styles.expenseRowContainer}>
      <Text style={styles.descriptionText}>
        {props.description}
      </Text>
      <Text style={styles.amountText}>{props.amount}</Text>
    </View>
  );
}

export default ExpenseRow;

ExpenseRow.propTypes = {
  amount: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
