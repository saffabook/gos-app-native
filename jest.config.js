module.exports = {
  preset: 'react-native',
  setupFiles: [
    "<rootDir>/__mocks__/navigationMocks.js"
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?@?react-native|@react-native-community|@react-navigation)',
  ],
};
