const express = require('express')
const validateQuery = require('./middleware/validateDirQuery')

const router = express.Router()

router.get('/dirs', validateQuery, require('./handlers/getDirs'))
router.get('/stream/file', require('./handlers/getFiles'))

module.exports = router
