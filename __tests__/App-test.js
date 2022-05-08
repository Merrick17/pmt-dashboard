/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';
import ShallowRenderer from 'react-test-renderer/shallow';
// Note: test renderer must be required after react-native.
const renderer = new ShallowRenderer();

it('renders correctly', () => {
  renderer.create(<App />);
});
