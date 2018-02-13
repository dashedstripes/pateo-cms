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

  .post((req, res) => {
    object.create({
      title: req.body.title
    })
      .then((object) => {
        res.json(object)
      })
      .catch((error) => res.json(error))
  })

router.route('/:object_id')
  .get((req, res) => {
    object.find({
      where: {
        id: req.params.object_id
      },
      attributes: allowedAttributes
    })
      .then((object) => res.json(object))
      .catch((error) => res.json(error))
  })

module.exports = router