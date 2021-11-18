/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../models/types';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          HomeScreen: 'home',
          HistoryScreen: 'history',
          PainCrisisFormScreen: '+',
          ResourcesScreen: 'resources',
          PassportScreen: 'passport',
        },
      },
      NotFound: '*',
    },
  },
};

export default linking;
