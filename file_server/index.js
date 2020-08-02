const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const path = require('path')

const {
  PORT = 8083,
  UPLOAD_DIR = path.join('.', 'uploads'),
  CLIENT_DIR = path.join('..', 'client', 'build'),
} = process.env

const app = express()
app.use(morgan('common'))
app.use(
  cors({
    origin: 'http://localhost:3000',
  })
)
app.use('/api', require('./routes'))
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
app.use('/uploads', express.static(UPLOAD_DIR))
app.use(express.static(CLIENT_DIR))
app.all('*', (_, res) => res.status(400).send('Not found!'))

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
