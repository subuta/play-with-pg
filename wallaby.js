const _ = require('lodash')
const path = require('path')

process.env.NODE_ENV = 'test'

module.exports = (wallaby) => {
  return {
    files: [
      'lib/**/*.js',
      'db/**/*.js',
      'knexfile.js',
      { pattern: 'db/dump.sql', binary: true },
      '!lib/**/*.spec.js'
    ],

    tests: [
      'lib/**/*.spec.js'
    ],

    env: {
      type: 'node',
      runner: 'node'
    },

    compilers: {
      '**/*.js': wallaby.compilers.babel()
    },
    testFramework: 'ava'
  }
}
