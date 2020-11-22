const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

function makeServer(env, port, whiteList) {
  const app = express()
  app.use(morgan('common'))
  app.use(
    cors({
      origin: env === 'development' ? String(whiteList).split(',') : undefined,
    })
  )
  app.use('/api', require('./routes'))
  app.all('*', (_, res) => res.status(400).send({ msg: 'Not found!' }))
  app.use(require('./middleware/errorHandler'))

  app.listen(port, () => {
    console.log('Listening on port:', port)
  })
}

if ('development' === process.env.NODE_ENV) {
  const { PORT = 8083, WHITE_LIST = 'http://localhost:3000' } = process.env
  makeServer('development', parseInt(PORT, 10), WHITE_LIST)
}

module.exports = { run: makeServer }
