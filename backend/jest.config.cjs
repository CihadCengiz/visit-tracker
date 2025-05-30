/** @type {import('jest').Config} */
module.exports = {
  // ESM-friendly preset for ts-jest
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',

  // Tell ts-jest to treat .ts as ESM
  extensionsToTreatAsEsm: ['.ts'],

  // Strip .js from import paths at test time
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
};
