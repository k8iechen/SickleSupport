import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { RootTabScreenProps } from '../models/navigation';

export default function PainCrisisFormScreen({ navigation }: RootTabScreenProps<'PainCrisisFormScreen'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Aowkin Pain Crisis Form Screen</Text>
      <View style={styles.separator} />
      <EditScreenInfo path="/screens/PainCrisisFormScreen.tsx" />
</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
