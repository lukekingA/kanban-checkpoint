let router = require('express').Router()
let Tasks = require('../models/task')

//GET  
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
router.post('/lists/:id', (req, res, next) => {
  req.body.authorId = req.session.uid
  req.body.listId = req.params.id
  Tasks.create(req.body)
    .then(newTask => {
      res.send(newTask)
    })
    .catch(err => {
      console.log(err)
      next()
    })
})

//Post Comment
router.post('/:id', (req, res, next) => {
  req.body.authorId = req.session.uid
  Tasks.findById(req.params.id).then(task => {
    task.comments.push(req.body)
    task.save(err => {
      if (err) {
        res.status(400).send('failure to save task comment')
      }
      res.send('saved task comment')
    })
  }).catch(next)

})


//PUT Task
router.put('/:id', (req, res, next) => {
  Tasks.findById(req.params.id).then(task => {
    if (!task.authorId.equals(req.session.uid)) {
      return res.status(401).send("ACCESS DENIED!")
    }
    task.update(req.body, (err) => {
      if (err) {
        console.log(err)
        res.status(400).send('failure to update task')
      }
      res.send('Successfully updated task')
    })
  }).catch(next)

})

//Delete Comment

router.delete('/:taskId/comment/:commentId', (req, res, next) => {
  Tasks.findById(req.params.taskId).then(task => {
    let comment = task.comments.find(c => c._id == req.params.commentId)
    if (comment) {
      task.comments.splice(task.comments.indexOf(comment), 1)
      task.save()
    }
  }).then(comment => {
    res.send({
      message: 'Comment Deleted',
      data: comment
    })
  }).catch(err => {
    res.status(400).send('ACCESS DENIED; Invalid Request')
  })
})

//DELETE Task
router.delete('/:id', (req, res, next) => {
  Tasks.findOneAndRemove({
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

module.exports = router