module.exports = {
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'json'],
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  moduleNameMapper: {
    '\\.(scss|css)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/src/client/js/$1' 
  }
};
