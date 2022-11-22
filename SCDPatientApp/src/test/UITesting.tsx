import * as React from 'react';
import {
  NativeBaseProvider,
} from 'native-base';
import {
  render as NativeRender,
} from '@testing-library/react-native';

import type { IAuthStore } from '../stores/Auth';
import { AuthContext } from '../contexts/AuthContext';

const FakeAuthStore = {
  getPatient: () => ({}),
} as IAuthStore;

const FakeAuthProvider: React.FC = ({children}) => {
  return (
    <AuthContext.Provider value={FakeAuthStore}>{children}</AuthContext.Provider>
  );
};

export default function render(comp: React.ReactNode) {
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
      <FakeAuthProvider>
        {comp}
      </FakeAuthProvider>
    </NativeBaseProvider>,
  );
}
