import * as React from 'react';

import {
  render,
} from '../testing/UITesting';

import SettingsAccountScreen from './SettingsAccountScreen';

test('can render', () => {
  const root = render(
    <SettingsAccountScreen />
  );
  expect(root).toBeTruthy();
});


