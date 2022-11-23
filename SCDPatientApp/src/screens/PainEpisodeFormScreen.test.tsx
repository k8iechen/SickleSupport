import * as React from 'react';

import render from '../test/UITesting';

import PainEpisodeFormScreen from "./PainEpisodeFormScreen";

test('make screen', () => {
  const mockNav = {};
  const screen = render(
    <PainEpisodeFormScreen navigation={mockNav} />
  );
});
