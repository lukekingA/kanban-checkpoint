let router = require('express').Router()
let Tasks = require('../models/task')

//GET  -- ? boardsId also ? readability
router.get('/lists/:id', (req, res, next) => {
  Tasks.find({ listId: req.params.id })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      console.log(err)
      next()
    })
})

//POST  
router.post('/boards/:boardId/lists/:listId', (req, res, next) => {
  req.body.authorId = req.session.uid
  req.body.boardId = req.params.boardId
  req.body.listId = req.params.listId
  Lists.create(req.body)
    .then(newList => {
      res.send(newList)
    })
    .catch(err => {
      console.log(err)
      next()
    })
})

//PUT
router.put('/tasks/:id', (req, res, next) => {
  Tasks.findById(req.params.id)

})



//DELETE
router.delete('/tasks/:id', (req, res, next) => {
  Tasks.findOneAndDelete({ _id: req.params.id, authorId: req.session.uid })
    .then(list => {
      res.send("Successfully Deleted")
    })
    .catch(err => {
      res.status(400).send('ACCESS DENIED; Invalid Request')
    })
})