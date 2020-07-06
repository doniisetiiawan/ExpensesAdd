import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';

const expenses = [
  { amount: '4', category: 'coffee', description: 'Latte' },
  {
    amount: '1.50',
    category: 'books',
    description: 'Sunday Paper',
  },
  { amount: '35', category: 'car', description: 'Gas' },
  {
    amount: '60',
    category: 'restaurant',
    description: 'Steak dinner',
  },
];

export const getIconComponent = (
  categoryName,
  size,
  color,
) => (
  <Icon
    name={categories[categoryName].iconName}
    size={size || 30}
    color={color || '#3D4A53'}
  />
);
