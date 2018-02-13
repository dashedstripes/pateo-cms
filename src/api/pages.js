const express = require('express')
const router = express.Router()
const page = require('../models/page')

const allowedAttributes = ['id', 'title', 'slug']

router.route('/')
  .get((req, res) => {
    page.findAll({
      attributes: allowedAttributes
    })
      .then((pages) => res.json(pages))
      .catch((error) => res.json(error))
  })

  .post((req, res) => {
    page.create({
      title: req.body.title
    })
      .then((page) => {
        res.json(page)
      })
      .catch((error) => res.json(error))
  })

router.route('/:page_id')
  .get((req, res) => {
    page.find({
      where: {
        id: req.params.page_id
      },
      attributes: allowedAttributes
    })
      .then((page) => res.json(page))
      .catch((error) => res.json(error))
  })

  .put((req, res) => {
    page.update({
      title: req.body.title
    }, {
        where: {
          id: req.params.page_id
        }
      }).then((rowCount) => res.json(rowCount))
      .catch((error) => res.json(error))
  })

  .delete((req, res) => {
    page.destroy({
      where: {
        id: req.params.page_id
      }
    }).then((rowCount) => res.json(rowCount))
      .catch((error) => res.json(error))
  })

module.exports = router