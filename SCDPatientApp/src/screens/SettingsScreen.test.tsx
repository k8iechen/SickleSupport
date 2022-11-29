import * as React from 'react';
import {
  fireEvent,
  screen,
} from '@testing-library/react-native';

import render from '../test/UITesting';

import SettingsScreen from './SettingsScreen';

test('can render', () => {
  const navMock = {'goBack': jest.fn()};
  const root = render(
    <SettingsScreen navigation={navMock} />
  );
  expect(root).toBeTruthy();
});


test('expected elements are rendered', () => {
  const navMock = {'goBack': jest.fn()};
  render(
    <SettingsScreen navigation={navMock} />
  );

  expect(screen.getByLabelText("go-back")).toBeTruthy();
  expect(screen.getByText("Settings")).toBeTruthy();
  expect(screen.getByText("Account")).toBeTruthy();
  expect(screen.getByText("Notifications")).toBeTruthy();
  expect(screen.getByText("Privacy & Security")).toBeTruthy();
});
