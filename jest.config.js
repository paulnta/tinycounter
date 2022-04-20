/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src/', '<rootDir>/server/'],
  testPathIgnorePatterns: ['/node_modules/', '/generated/', '_utils'],
}
