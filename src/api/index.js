const express = require('express')
const router = express.Router()

router.use('/objects', require('./objects'))
router.use('/pages', require('./pages'))
router.use('/contents', require('./contents'))
router.use('/fields', require('./fields'))
router.use('/field_values', require('./field_values'))
router.use('/field_inputs', require('./field_inputs'))

module.exports = router