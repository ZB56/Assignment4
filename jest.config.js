/**
 * Jest configuration.
 *
 * The React Native preset leaves `node_modules` untransformed apart from a
 * short allow-list. React Navigation and react-native-screens ship untranspiled
 * ES modules, so they have to be added to that list or the test run fails on
 * their `export` statements before any assertion is reached.
 *
 * @format
 */

const transformAllowList = [
  'react-native',
  '@react-native',
  '@react-navigation',
  'react-native-screens',
  'react-native-safe-area-context',
].join('|');

module.exports = {
  preset: '@react-native/jest-preset',
  transformIgnorePatterns: [`node_modules/(?!(${transformAllowList})/)`],
};
