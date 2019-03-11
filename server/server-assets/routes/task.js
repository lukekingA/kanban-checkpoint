let router = require('express').Router()
let Tasks = require('../models/task')

//GET  -- ? boardsId also ? readability
router.get('/lists/:id', (req, res, next) => {
  Tasks.find({
      listId: req.params.id
    })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      console.log(err)
      next()
    })
})

//POST  Task
router.post('/lists/:listId', (req, res, next) => {
  req.body.authorId = req.session.uid
  req.body.listId = req.params.listId
  Tasks.create(req.body)
    .then(newList => {
      res.send(newList)
    })
    .catch(err => {
      console.log(err)
      next()
    })
})

//Post Comment
router.post('/tasks/:id', (req, res, next) => {
  req.body.authorId = req.session.uid
  Tasks.findById(req.params.id).then(task => {
      task.comments.push(req.body)
    })
    .catch(err => {
      console.log(err)
      next()
    })
})


//PUT Task
router.put('/tasks/:id', (req, res, next) => {
  Tasks.findById(req.params.id).then(task => {
    if (!task.authorId.equals(req.session.uid)) {
      return res.status(401).send("ACCESS DENIED!")
    }
    task.update(req.body, (err) => {
      if (err) {
        console.log(err)
        next()
      }
    })
  })

})

//Delete Comment

router.delete('/tasks/:taskId/comment/:commentId', (req, res, next) => {
  Tasks.findById(req.params.taskId).then(task => {
    let comment = task.comments.find(c => c._id == req.params.commentId)
    if (comment) {
      task.comments.splice(task.comments.indexOf(comment), 1)
    }
  }).then(comment => {
    res.send('Comment Deleted')
  }).catch(err => {
    res.status(400).send('ACCESS DENIED; Invalid Request')
  })
})

//DELETE Task
router.delete('/tasks/:id', (req, res, next) => {
  Tasks.findOneAndDelete({
      _id: req.params.id,
      authorId: req.session.uid
    })
    .then(list => {
      res.send("Successfully Deleted")
    })
    .catch(err => {
      res.status(400).send('ACCESS DENIED; Invalid Request')
    })
})