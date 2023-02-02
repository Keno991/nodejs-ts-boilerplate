import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

const config = {
  testEnvironment: 'node',
  verbose: true,
  moduleFileExtensions: ['ts', 'js'],
  testPathIgnorePatterns: ['/node_modules/'],
  collectCoverage: false,
  testMatch: ['**/*.test.ts'],
  setupFiles: ['<rootDir>/__tests__/__mocks__/env.ts'],
  setupFilesAfterEnv: ['<rootDir>/__tests__/__mocks__/setup.ts'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>',
  }),
  transform: {
    '^.+\\.ts': 'ts-jest',
  },
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/server.ts',
    '!src/database/index.ts',
  ],
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
};

export default config;
