const express = require('express')
const router = express.Router()

router.use('/objects', require('./objects'))
router.use('/pages', require('./pages'))
router.use('/contents', require('./contents'))

module.exports = router