const express = require('express')
const router = express.Router()
const object = require('../models/object')

const allowedAttributes = ['id', 'title', 'slug']

router.route('/')
  .get((req, res) => {
    object.findAll({
      attributes: allowedAttributes,
      order: [
        ['title', 'ASC']
      ]
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

  .put((req, res) => {
    object.update({
      title: req.body.title,
      // Even though we don't actually pass anything here
      // Sequelize seems to want something for slug despite the fact
      // that the model generates the slug on update
      slug: req.body.slug
    }, {
        where: {
          id: req.params.object_id
        }
      }).then((rowCount) => res.json(rowCount))
      .catch((error) => res.json(error))
  })

  .delete((req, res) => {
    object.destroy({
      where: {
        id: req.params.object_id
      }
    }).then((rowCount) => res.json(rowCount))
      .catch((error) => res.json(error))
  })

module.exports = router