const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const path = require('path')
const serveStatic = require('serve-static')

const {
  SERVER_MODE,
  NODE_ENV,
  PORT = '8083',
  ASSETS_DIR = path.join(__dirname, '..', 'assets'),
} = process.env

function makeServer(port = parseInt(PORT, 10)) {
  const app = express()
  app.use(morgan('common'))
  app.use(
    cors({
      origin: NODE_ENV !== 'production' ? 'http://localhost:3000' : undefined,
    })
  )
  app.use('/api', require('./routes'))
  app.use(
    '/static',
    serveStatic(path.join(ASSETS_DIR), {
      setHeaders: function (res, path) {
        res.setHeader('Content-Type', 'audio/mpeg')
      },
    })
  )
  app.all('*', (_, res) => res.status(400).send({ msg: 'Not found!' }))
  app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broken!')
  })
  app.listen(port, () => console.log(`Listening on port ${PORT}`))
}

if (SERVER_MODE === 'standalone') {
  makeServer()
}

module.exports = { run: makeServer }
