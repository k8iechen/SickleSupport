import * as React from 'react';
import {
  NativeBaseProvider
} from 'native-base';
import {
  fireEvent,
  render as native_render,
  screen,
} from '@testing-library/react-native';

import SettingsScreen from '../screens/SettingsScreen';

const render = (comp) => {
  const inset = {
    frame: { x: 0, y: 0, width: 0, height: 0 },
    insets: { top: 0, left: 0, right: 0, bottom: 0 },
  };
  return native_render(
    <NativeBaseProvider initialWindowMetrics={inset}>
      {comp}
    </NativeBaseProvider>
  );
};

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
      "Account": "settings-account",
      "Notifications": "settings-notifications",
      "Privacy & Security": "settings-security"})) {
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
