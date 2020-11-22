const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

function makeServer(
  port = parseInt(PORT, 10),
  whiteList = 'http://localhost:3000',
  env = 'development'
) {
  const app = express()
  app.use(morgan('common'))
  app.use(
    cors({
      origin: ['production', 'development'].includes(env)
        ? String(whiteList).split(',')
        : undefined,
    })
  )
  app.use('/api', require('./routes'))
  app.all('*', (_, res) => res.status(400).send({ msg: 'Not found!' }))
  app.use(require('./middleware/errorHandler'))
  app.listen(parseInt(port, 10), () => console.log(`Listening on port ${port}`))
}

const { NODE_ENV, PORT = '8083', WHITE_LIST = [] } = process.env

if ('development' === NODE_ENV) {
  makeServer(PORT, WHITE_LIST, NODE_ENV)
}

module.exports = { run: makeServer }
