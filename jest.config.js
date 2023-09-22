module.exports = {
  preset: 'react-native',
  setupFiles: [
    "<rootDir>/__mocks__/navigationMocks.js",
    "<rootDir>/__mocks__/@react-native-community/setup-tests.js"
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?@?react-native|@react-native-community|@react-navigation|@react-native-community/async-storage/(?!(lib)))',
  ],
};
