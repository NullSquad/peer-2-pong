module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  testPathIgnorePatterns: ['/node_modules/', '/build/'],
};