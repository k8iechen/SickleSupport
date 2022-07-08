import * as React from 'react';
import {
  render,
} from '@testing-library/react-native';
import SettingsScreen from '../screens/SettingsScreen';

test('can render', () => {
  const root = render (
    <SettingsScreen/>
  );
  expect(root).toBeTruthy();
});
