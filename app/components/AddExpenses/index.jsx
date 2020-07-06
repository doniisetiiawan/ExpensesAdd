/* eslint-disable react/no-access-state-in-setstate */
import PropTypes from 'prop-types';
import React from 'react';
import { Button, View } from 'react-native';
import AddExpensesModal from '../AddExpensesModal';

class AddExpenses extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
    };
  }

  _toggleModal = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
    });
  };

  render() {
    return (
      <View>
        <AddExpensesModal
          modalVisible={this.state.modalVisible}
          month={this.props.month}
          toggleModal={() => this._toggleModal()}
          year={this.props.year}
        />
        <Button
          color="#86B2CA"
          onPress={() => this._toggleModal()}
          title="Add Expense"
        />
      </View>
    );
  }
}

export default AddExpenses;

AddExpenses.propTypes = {
  month: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
};
