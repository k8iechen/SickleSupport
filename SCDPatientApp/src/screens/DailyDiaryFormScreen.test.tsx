import * as React from 'react';

import render from '../test/UITesting';

import DailyDiaryFormScreen from "./DailyDiaryFormScreen";

test('make screen', () => {
  const mockNav = {};
  const screen = render(
    <DailyDiaryFormScreen navigation={mockNav} />
  );
});
