process.env.TS_NODE_PROJECT =
  process.env.TS_NODE_PROJECT || 'script/tsconfig.json'

require('ts-node/register')

module.exports = require('./webpack.development.config.ts').default
