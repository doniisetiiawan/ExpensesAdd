import PropTypes from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
import * as iconMethods from '../../utils/iconMethods';

function ExpenseRow(props) {
  return (
    <View style={styles.expenseRowContainer}>
      <View style={styles.icon}>
        { iconMethods.getIconComponent(props.category) }
      </View>
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
  category: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
