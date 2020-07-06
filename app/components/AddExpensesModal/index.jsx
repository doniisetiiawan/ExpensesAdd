/* eslint-disable react/no-access-state-in-setstate */
import PropTypes from 'prop-types';
import React from 'react';
import {
  Modal,
  Text,
  TextInput,
  View,
  Button,
} from 'react-native';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './styles';
import ExpandableCell from '../ExpandableCell';
import * as storageMethods from '../../utils/storageMethods';

class AddExpensesModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: '',
      description: '',
      date: new Date(),
      expanded: false,
      show: false,
    };
  }

  _changeAmount = (amount) => {
    this.setState({
      amount,
    });
  };

  _changeDescription = (description) => {
    this.setState({
      description,
    });
  };

  _getDatePickerHeight = (event) => {
    this.setState({
      datePickerHeight: event.nativeEvent.layout.width,
    });
  };

  _onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.date;
    this.setState({
      date: currentDate,
      show: !this.state.show,
    });
  };

  _onExpand = () => {
    this.setState({
      expanded: !this.state.expanded,
      show: !this.state.show,
    });
  };

  _clearFieldsAndCloseModal = () => {
    this.setState({
      amount: '',
      description: '',
    });

    this.props.toggleModal();
  };

  _saveItemToBudget = async () => {
    const expenseObject = {
      amount: this.state.amount,
      date: moment(this.state.date).format('ll'),
      description: this.state.description,
    };
    const month = this.state.date.getMonth() + 1;
    const year = this.state.date.getFullYear();
    await storageMethods.saveItemToBudget(
      month,
      year,
      expenseObject,
    );

    this._clearFieldsAndCloseModal();
  };

  render() {
    const expandableCellTitle = `Date: ${moment(
      this.state.date,
    ).format('ll')} (tap to change)`;

    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.props.modalVisible}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.headerText}>
            Add an Expense
          </Text>
          <View style={styles.amountRow}>
            <Text style={styles.amountText}>Amount</Text>
            <TextInput
              keyboardType="numeric"
              onChangeText={(value) => this._changeAmount(value)}
              placeholder="0"
              style={styles.amountInput}
              value={this.state.amount}
            />
          </View>
          <Text style={styles.descriptionText}>
            Description
          </Text>
          <TextInput
            onChangeText={(value) => this._changeDescription(value)}
            placeholder="Book on React Native development"
            style={styles.descriptionInput}
            value={this.state.description}
          />
          <View
            style={[
              styles.expandableCellContainer,
              {
                maxHeight: this.state.expanded
                  ? this.state.datePickerHeight
                  : 40,
              },
            ]}
          >
            <ExpandableCell
              expanded={this.state.expanded}
              onPress={() => this._onExpand()}
              title={expandableCellTitle}
            >
              {this.state.show && (
                <DateTimePicker
                  value={this.state.date}
                  mode="date"
                  onChange={this._onDateChange}
                />
              )}
            </ExpandableCell>
          </View>
        </View>
        <Button
          color="#86B2CA"
          disabled={
            !(this.state.amount && this.state.description)
          }
          onPress={() => this._saveItemToBudget()}
          title="Save Expense"
        />
        <Button
          color="#E85C58"
          onPress={() => this._clearFieldsAndCloseModal()}
          title="Cancel"
        />
      </Modal>
    );
  }
}

export default AddExpensesModal;

AddExpensesModal.propTypes = {
  modalVisible: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
};
