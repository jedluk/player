const express = require('express')
const validateQuery = require('./middleware/validateDirQuery')
const validateFileQuery = require('./middleware/validatreFileQuery')

const router = express.Router()

router.get('/dirs', validateQuery, require('./handlers/getDirs'))
router.get('/stream/file', validateFileQuery, require('./handlers/getFiles'))

module.exports = router
