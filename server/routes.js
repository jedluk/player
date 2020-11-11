const express = require('express')
const validateQuery = require('./middleware/validateQuery')

const router = express.Router()

router.get('/dirs', validateQuery, require('./handlers/getDirs'))

module.exports = router
