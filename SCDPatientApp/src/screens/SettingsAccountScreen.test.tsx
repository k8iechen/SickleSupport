import * as React from 'react';

import render from '../test/UITesting';

import SettingsAccountScreen from './SettingsAccountScreen';

test('can render', () => {
  const root = render(
    <SettingsAccountScreen />
  );
  expect(root).toBeTruthy();
});


