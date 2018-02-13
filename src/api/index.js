const express = require('express')
const router = express.Router()

router.use('/objects', require('./objects'))

module.exports = router