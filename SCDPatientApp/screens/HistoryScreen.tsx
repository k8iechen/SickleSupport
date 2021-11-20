import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { RootTabScreenProps } from '../models/navigation';

export default function HistoryScreen({ navigation }: RootTabScreenProps<'HistoryScreen'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Aowkin History Screen</Text>
      <View style={styles.separator} />
      <EditScreenInfo path="/screens/HistoryScreen.tsx" />
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
