module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex: '.*\\.(spec|test)\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['src/**/*.(t|j)s'],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
};
