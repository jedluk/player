const express = require('express')
const validateQuery = require('./validators/validateDirQuery')
const validateFileQuery = require('./validators/validatreFileQuery')

const router = express.Router()

router.get('/dirs', ...validateQuery, require('./handlers/getDirs'))
router.get('/stream/file', ...validateFileQuery, require('./handlers/getFiles'))
router.get('/preferences', require('./handlers/getPreferences'))
router.post('/preferences', require('./handlers/postPreferences'))
router.patch('/preferences', require('./handlers/patchPreferences'))

module.exports = router
