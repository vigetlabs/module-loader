module.exports = {
  testURL: 'http://localhost:3000',
  testEnvironment: 'jsdom',
  rootDir: '..',
  collectCoverageFrom: ['src/**/*.js?(x)', 'lib/**/*.js?(x)'],
  moduleDirectories: ['.', './src', './node_modules'],
  moduleFileExtensions: ['js', 'json', 'jsx', 'css'],
  testMatch: ['**/__tests__/**/*.test.js?(x)'],
  moduleNameMapper: {
    'test-helpers': '<rootDir>/test/helpers.js'
  },
  transform: {
    '^.+\\.jsx?$': 'babel-jest'
  },
  preset: 'jest-puppeteer'
}
