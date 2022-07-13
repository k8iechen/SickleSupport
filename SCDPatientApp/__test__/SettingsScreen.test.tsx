import * as React from 'react';
import {
  NativeBaseProvider
} from 'native-base';
import {
  render as native_render,
  screen,
} from '@testing-library/react-native';

import SettingsScreen from '../screens/SettingsScreen';

const render = (comp, options) => {
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
  const backButton = screen.getByLabelText("go-back");
  expect(backButton).toBeTruthy();

  const settingsHeader = screen.getByText("Settings");
  expect(settingsHeader).toBeTruthy();
});
