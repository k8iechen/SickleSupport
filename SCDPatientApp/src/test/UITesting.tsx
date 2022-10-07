import * as React from 'react';
import {
  NativeBaseProvider,
} from 'native-base';
import {
  render as NativeRender,
} from '@testing-library/react-native';

export default function render(comp) {
  const inset = {
    frame: {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    },
    insets: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
  };
  return NativeRender(
    <NativeBaseProvider initialWindowMetrics={inset}>
      {comp}
    </NativeBaseProvider>,
  );
}
