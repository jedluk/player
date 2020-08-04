const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const path = require('path')

const {
  PORT = '8083',
  UPLOAD_DIR = path.join(__dirname, 'uploads'),
  CLIENT_DIR = path.join(__dirname, '..', 'client', 'build'),
} = process.env
console.log({ PORT, UPLOAD_DIR, CLIENT_DIR })

const CORS = cors({
  origin: 'http://localhost:3000',
})

const app = express()
app.use(morgan('common'))
app.use(CORS)
app.use('/api', require('./routes'))
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
app.use('/uploads', express.static(UPLOAD_DIR))
app.use(express.static(CLIENT_DIR))
app.all('*', (_, res) => res.status(400).send('Not found!'))

app.listen(parseInt(PORT, 10), () => console.log(`Listening on port ${PORT}`))
