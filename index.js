const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const path = require('path')

const {
  PORT = '8083',
  ASSETS_DIR = path.join(__dirname, 'assets'),
  CLIENT_DIR = path.join(__dirname, 'client', 'build'),
  NODE_ENV,
} = process.env

const app = express()
app.use(morgan('common'))
if (NODE_ENV !== 'production') {
  app.use(
    cors({
      origin: 'http://localhost:3000',
    })
  )
}
app.use('/api', require('./routes'))
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
app.use('/assets', express.static(ASSETS_DIR))
app.use(express.static(CLIENT_DIR))
app.all('*', (_, res) => res.status(400).send('Not found!'))

app.listen(parseInt(PORT, 10), () => console.log(`Listening on port ${PORT}`))
