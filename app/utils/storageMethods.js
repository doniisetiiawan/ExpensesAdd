/* eslint-disable no-prototype-builtins */
import { AsyncStorage } from 'react-native';
import * as dateMethods from './dateMethods';

export const getAsyncStorage = async () => {
  const response = await AsyncStorage.getItem('expenses');
  return JSON.parse(response) || {};
};

export const setAsyncStorage = (expenses) => AsyncStorage.setItem(
  'expenses',
  JSON.stringify(expenses),
);

export const checkCurrentMonthBudget = async () => {
  const year = dateMethods.getYear();
  const month = dateMethods.getMonth();

  const response = await getAsyncStorage();

  if (
    response === null
    || !response.hasOwnProperty(year)
    || !response[year].hasOwnProperty(month)
  ) {
    return false;
  }

  return response[year][month].budget;
};

export const saveMonthlyBudget = async (
  month,
  year,
  budget,
) => {
  const response = await getAsyncStorage();

  if (!response.hasOwnProperty(year)) {
    response[year] = {};
  }

  if (!response[year].hasOwnProperty(month)) {
    response[year][month] = {
      budget: undefined,
      expenses: [],
      spent: 0,
    };
  }

  response[year][month].budget = budget;

  await setAsyncStorage(response);
};

export const resetAsyncStorage = () => setAsyncStorage({});

export const logAsyncStorage = async () => {
  const response = await getAsyncStorage();

  console.log('Logging Async Storage');
  console.table(response);
};
