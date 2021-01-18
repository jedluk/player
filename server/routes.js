const express = require('express')
const validateDirQuery = require('./validators/validateDirQuery')
const validateFileQuery = require('./validators/validateFileQuery')

const router = express.Router()

router.get('/dirs', ...validateDirQuery, require('./handlers/getDirs'))
router.get('/stream/file', ...validateFileQuery, require('./handlers/getFiles'))
router.get('/preferences', require('./handlers/getPreferences'))
router.post('/preferences', require('./handlers/postPreferences'))
router.patch('/preferences', require('./handlers/patchPreferences'))

module.exports = router
