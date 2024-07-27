module.exports = {
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
    "\\.(css|less|scss|sass)$": "jest-transform-stub",
  },
  testEnvironment: "jsdom",
  transformIgnorePatterns: ["node_modules/(?!(some-module|another-module)/)"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "<rootDir>/mocks/styleMock.js",
  },
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
};
