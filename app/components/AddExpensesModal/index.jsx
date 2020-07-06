/* eslint-disable react/no-access-state-in-setstate,react/prop-types,react/no-array-index-key */
import PropTypes from 'prop-types';
import React from 'react';
import {
  Modal,
  Text,
  TextInput,
  View,
  Button,
  ScrollView,
} from 'react-native';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import SelectPicker from 'react-native-form-select-picker';
import hash from 'object-hash';
import styles from './styles';
import ExpandableCell from '../ExpandableCell';
import * as storageMethods from '../../utils/storageMethods';
import * as iconMethods from '../../utils/iconMethods';

class AddExpensesModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: '',
      category: undefined,
      categoryPickerExpanded: false,
      date: new Date(),
      description: '',
      datePickerExpanded: false,
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

  _onDatePickerExpand = () => {
    this.setState({
      datePickerExpanded: !this.state.datePickerExpanded,
      show: !this.state.show,
    });
  };

  _clearFieldsAndCloseModal = () => {
    this.setState({
      amount: '',
      category: undefined,
      categoryPickerExpanded: false,
      date: new Date(),
      datePickerExpanded: false,
      description: '',
    });

    this.props.toggleModal();
  };

  _saveItemToBudget = async () => {
    const expenseObject = {
      amount: this.state.amount,
      category: this.state.category,
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

  _onCategoryPickerExpand = () => {
    this.setState({
      categoryPickerExpanded: !this.state
        .categoryPickerExpanded,
    });
  };

  _renderCategoryPicker = () => {
    const categoryNames = Object.keys(
      iconMethods.categories,
    );

    return categoryNames.map((elem, index) => (
      <SelectPicker.Item
        key={hash(index)}
        label={iconMethods.categories[elem].name}
        value={elem}
      />
    ));
  };

  _setItemCategory = (category) => {
    this.setState({
      category,
    });
  };

  render() {
    const expandableCellDatePickerTitle = `Date: ${moment(
      this.state.date,
    ).format('ll')} (tap to change)`;
    const expandableCellCategoryPickerTitle = `Category: ${
      this.state.category
        ? iconMethods.categories[this.state.category].name
        : 'None (tap to change)'
    }`;

    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.props.modalVisible}
      >
        <ScrollView style={styles.modalContainer}>
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
                maxHeight: this.state.datePickerExpanded
                  ? this.state.datePickerHeight
                  : 40,
              },
            ]}
          >
            <ExpandableCell
              expanded={this.state.datePickerExpanded}
              onPress={() => this._onDatePickerExpand()}
              title={expandableCellDatePickerTitle}
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

          <View
            style={[
              styles.expandableCellContainer,
              {
                height: this.state.categoryPickerExpanded
                  ? 200
                  : 40,
              },
            ]}
          >
            <View style={styles.categoryIcon}>
              {this.state.category
                && iconMethods.getIconComponent(
                  this.state.category,
                )}
            </View>
            <ExpandableCell
              expanded={this.state.categoryPickerExpanded}
              onPress={() => this._onCategoryPickerExpand()}
              title={expandableCellCategoryPickerTitle}
            >
              <SelectPicker
                onValueChange={(value) => this._setItemCategory(value)}
                selected={this.state.category}
                placeholder="Categories..."
              >
                {this._renderCategoryPicker()}
              </SelectPicker>
            </ExpandableCell>
          </View>
        </ScrollView>

        <Button
          color="#86B2CA"
          disabled={
            !(
              this.state.amount
              && this.state.description
              && this.state.category
            )
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
