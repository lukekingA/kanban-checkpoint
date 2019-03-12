let router = require('express').Router()
let Lists = require('../models/list')

//GET
router.get('/boards/:id', (req, res, next) => {
  Lists.find({
      boardId: req.params.id
    })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      console.log(err)
      next()
    })
})

//POST
router.post('/boards/:id', (req, res, next) => {
  req.body.authorId = req.session.uid
  req.body.boardId = req.params.id
  Lists.create(req.body)
    .then(newList => {
      res.send(newList)
    })
    .catch(err => {
      console.log(err)
      next()
    })
})

//DELETE
router.delete('/:id', (req, res, next) => {
  Lists.findOneAndRemove({
      _id: req.params.id,
      authorId: req.session.uid
    })
    .then(list => {
      // if (!board.authorId.equals(req.session.uid)) {
      //   return res.status(401).send("ACCESS DENIED!")
      // }
      // board.remove(err => {
      //   if (err) {
      //     console.log(err)
      //     next()
      //     return
      //   }
      res.send("Successfully Deleted")
    })
    .catch(err => {
      res.status(400).send('ACCESS DENIED; Invalid Request')
    })
})

module.exports = router