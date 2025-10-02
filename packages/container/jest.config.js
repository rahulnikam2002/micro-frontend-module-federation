const path = require("path");

module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/__mocks__/fileMock.js",
  },
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[jt]s?(x)",
  ],

  // ✅ Coverage settings
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/index.{js,ts,tsx}", // ignore entry file
    "!src/**/types.{ts,tsx}", // ignore type-only files
    "!src/**/*.d.ts", // ignore type declaration files
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov", "html"],
  
  // Ensure 100% statement coverage for SonarCloud
  coverageThreshold: {
    global: {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100
    }
  },

  // 👇 Ensures lcov paths match Sonar sources (e.g. packages/container/src/…)
  rootDir: path.resolve(__dirname, "."),
};
