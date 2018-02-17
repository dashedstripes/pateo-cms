const express = require('express')
const router = express.Router()
const fieldValue = require('../models/fieldValue')

const allowedAttributes = ['id', 'value', 'fieldId', 'contentId']

router.route('/')

  .post((req, res) => {
    fieldValue.create({
      value: req.body.value,
      fieldId: req.body.fieldId,
      contentId: req.body.contentId
    })
      .then((fieldValue) => {
        res.json(fieldValue)
      })
      .catch((error) => res.json(error))
  })

router.route('/:field_value_id')
  .get((req, res) => {
    fieldValue.find({
      where: {
        id: req.params.field_value_id
      },
      attributes: allowedAttributes
    })
      .then((fieldValue) => res.json(fieldValue))
      .catch((error) => res.json(error))
  })

  .put((req, res) => {
    fieldValue.update({
      value: req.body.value,
      fieldId: req.body.fieldId,
      contentId: req.body.contentId
    }, {
        where: {
          id: req.params.field_value_id
        }
      }).then((rowCount) => res.json(rowCount))
      .catch((error) => res.json(error))
  })

  .delete((req, res) => {
    fieldValue.destroy({
      where: {
        id: req.params.field_value_id
      }
    }).then((rowCount) => res.json(rowCount))
      .catch((error) => res.json(error))
  })

module.exports = router