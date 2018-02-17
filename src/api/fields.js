const express = require('express')
const router = express.Router()
const field = require('../models/field')

const allowedAttributes = ['id', 'title', 'slug', 'objectId']

router.route('/')

  .post((req, res) => {
    field.create({
      title: req.body.title,
      objectId: req.body.objectId,
      pageId: req.body.pageId,
      fieldInputId: req.body.fieldInputId
    })
      .then((field) => {
        res.json(field)
      })
      .catch((error) => res.json(error))
  })

module.exports = router