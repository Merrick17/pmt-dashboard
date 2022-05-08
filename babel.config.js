module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|react-native-elements|@react-native(-community)?)/)',
  ],
};
