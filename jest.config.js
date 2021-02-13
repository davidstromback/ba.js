module.exports = {
    "setupTestFrameworkScriptFile": "./node_modules/jest-enzyme/lib/index.js",
    "testEnvironment": "enzyme",
    "moduleFileExtensions": [
      "ts",
      "tsx",
      "js",
      "jsx"
    ],
    "transform": {
      "^.+\\.ts(x)": "babel-jest"
    },
    "testMatch": [
      "**/__tests__/**/*.ts?(x)",
      "**/?(*.)+(spec|test).ts?(x)"
    ]
  }