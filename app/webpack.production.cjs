process.env.TS_NODE_PROJECT =
  process.env.TS_NODE_PROJECT || 'script/tsconfig.json'

require('ts-node/register')

module.exports = require('./webpack.production.config.ts').default
