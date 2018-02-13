const express = require('express')
const router = express.Router()
const object = require('../models/object')

const allowedAttributes = ['id', 'title', 'slug']

router.route('/')
  .get((req, res) => {
    object.findAll({
      attributes: allowedAttributes
    })
      .then((objects) => res.json(objects))
      .catch((error) => res.json(error))
  })

module.exports = router