const express = require('express')
const router = express.Router()
const fieldInput = require('../models/fieldInput')

const allowedAttributes = ['id', 'title', 'type']

router.route('/')
  .get((req, res) => {
    fieldInput.findAll({
      attributes: allowedAttributes
    })
      .then((fieldInputs) => res.json(fieldInputs))
      .catch((error) => res.json(error))
  })

module.exports = router