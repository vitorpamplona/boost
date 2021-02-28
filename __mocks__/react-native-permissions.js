const {
  RESULTS,
} = require('react-native-permissions/dist/commonjs/results.js')

export { RESULTS };

// mock out any functions you want in this style...
export const check = jest.fn().mockResolvedValue(RESULTS.GRANTED);

export const openSettings = jest.fn();

export const request = jest.fn().mockResolvedValue(RESULTS.GRANTED);
