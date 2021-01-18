const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

function run(port, whiteList) {
  const app = express()

  app.use(morgan('common'))
  app.use(express.json())
  app.use(
    cors({
      origin: whiteList && String(whiteList).split(','),
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
  run(parseInt(PORT, 10), WHITE_LIST)
}

process.on('uncaughtException', err =>
  console.error(new Date().toLocaleString(), ': UNCAUGHT EXCEPTION', err.stack)
)

process.on('unhandledRejection', err =>
  console.error(new Date().toLocaleString(), ': UNHANDLED REJECTION', err.stack)
)

module.exports = { run }
