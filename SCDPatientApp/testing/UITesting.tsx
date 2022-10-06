import {
  NativeBaseProvider
} from 'native-base';
import {
  render as native_render,
} from '@testing-library/react-native';

export const render = (comp) => {
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

