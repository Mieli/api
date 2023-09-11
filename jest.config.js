/* eslint-env node */

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFiles: ['./src/__tests__/setupEnv.js'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    testMatch: ['**/__tests__/**/*.ts'],
    globals: {

    }
};