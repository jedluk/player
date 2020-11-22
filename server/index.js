const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const { NODE_ENV, PORT = '8083', WHITE_LIST = [] } = process.env

function makeServer(port = parseInt(PORT, 10)) {
  const app = express()
  app.use(morgan('common'))
  app.use(
    cors({
      origin: ['production', 'development'].includes(NODE_ENV)
        ? ['http://localhost:3000', ...String(WHITE_LIST).split(',')]
        : undefined,
    })
  )
  app.use('/api', require('./routes'))
  app.all('*', (_, res) => res.status(400).send({ msg: 'Not found!' }))
  app.use(require('./middleware/errorHandler'))
  app.listen(port, () => console.log(`Listening on port ${PORT}`))
}

if ('development' === NODE_ENV) {
  makeServer()
}

module.exports = { run: makeServer }