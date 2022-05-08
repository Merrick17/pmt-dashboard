module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: [
    // 1. specific setup for react-native
    '@testing-library/jest-native/extend-expect',

    // 2. global setup & mocking for some services:
    './jest.setup.js',

    // 3. mocking for more services:
    './__mocks__/react-native-firebase.js',
    './__mocks__/@react-native-community/google-signin.ts',
  ],
  // 4. Exclusinons List:
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)/)',
  ],
};
