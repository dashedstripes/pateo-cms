const express = require('express')
const router = express.Router()
const content = require('../models/content')

const allowedAttributes = ['id', 'title', 'slug', 'objectId']

router.route('/')
  .get((req, res) => {
    content.findAll({
      attributes: allowedAttributes
    })
      .then((contents) => res.json(contents))
      .catch((error) => res.json(error))
  })

  .post((req, res) => {
    content.create({
      title: req.body.title,
      objectId: req.body.objectId
    })
      .then((content) => {
        res.json(content)
      })
      .catch((error) => res.json(error))
  })

router.route('/:content_id')
  .get((req, res) => {
    content.find({
      where: {
        id: req.params.content_id
      },
      attributes: allowedAttributes
    })
      .then((content) => res.json(content))
      .catch((error) => res.json(error))
  })

  .put((req, res) => {
    content.update({
      title: req.body.title,
      objectId: req.body.objectId
    }, {
        where: {
          id: req.params.content_id
        }
      }).then((rowCount) => res.json(rowCount))
      .catch((error) => res.json(error))
  })

  .delete((req, res) => {
    content.destroy({
      where: {
        id: req.params.content_id
      }
    }).then((rowCount) => res.json(rowCount))
      .catch((error) => res.json(error))
  })

module.exports = router