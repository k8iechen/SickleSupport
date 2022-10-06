import * as React from 'react';
import {
  fireEvent,
  screen,
} from '@testing-library/react-native';

import {
  render,
} from '../testing/UITesting';

import SettingsScreen from './SettingsScreen';

test('can render', () => {
  const navMock = {'navigate': jest.fn()};
  const root = render(
    <SettingsScreen navigation={navMock} />
  );
  expect(root).toBeTruthy();
});


test('expected elements are rendered', () => {
  const navMock = {'navigate': jest.fn()};
  render(
    <SettingsScreen navigation={navMock} />
  );

  expect(screen.getByLabelText("go-back")).toBeTruthy();
  expect(screen.getByText("Settings")).toBeTruthy();
  expect(screen.getByText("Account")).toBeTruthy();
  expect(screen.getByText("Notifications")).toBeTruthy();
  expect(screen.getByText("Privacy & Security")).toBeTruthy();
});

describe('navigation to sub-settings screens', () => {
  test('Go Back', () => {
    const navMock = {'navigate': jest.fn(), 'goBack': jest.fn()};
    render(
      <SettingsScreen navigation={navMock} />
    );
    const button = screen.getByLabelText("go-back");
    fireEvent.press(button);

    expect(navMock.goBack).toHaveBeenCalled();
  });

  for(const [subscreen, route] of Object.entries({
      "Account": "Settings.Account",
      "Notifications": "Settings.Notifications",
      "Privacy & Security": "Settings.Security"})) {
    test(subscreen, () => {
      const navMock = {'navigate': jest.fn()};
      const {getByText} = render(
        <SettingsScreen navigation={navMock} />
      );
      const button = getByText(subscreen);
      fireEvent.press(button);

      expect(navMock.navigate).toHaveBeenCalledWith(route);
    });
  }
});
