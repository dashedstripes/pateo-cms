const express = require('express')
const router = express.Router()
const field = require('../models/field')

const allowedAttributes = ['id', 'title', 'slug', 'objectId', 'pageId', 'fieldInputId']

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

router.route('/:field_id')
  .get((req, res) => {
    field.find({
      where: {
        id: req.params.field_id
      },
      attributes: allowedAttributes
    })
      .then((field) => res.json(field))
      .catch((error) => res.json(error))
  })

  .put((req, res) => {
    field.update({
      title: req.body.title,
      objectId: req.body.objectId,
      pageId: req.body.pageId,
      fieldInputId: req.body.fieldInputId
    }, {
        where: {
          id: req.params.field_id
        }
      }).then((rowCount) => res.json(rowCount))
      .catch((error) => res.json(error))
  })

  .delete((req, res) => {
    field.destroy({
      where: {
        id: req.params.field_id
      }
    }).then((rowCount) => res.json(rowCount))
      .catch((error) => res.json(error))
  })

module.exports = router