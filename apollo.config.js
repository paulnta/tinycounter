module.exports = {
  client: {
    includes: ['src/**/*.{js,ts,tsx}'],
    excludes: ['**/node_modules/**', '**/generated/**'],
    service: {
      name: 'tinycounter',
      url: 'http://localhost:4000/graphql',
    },
  },
}
