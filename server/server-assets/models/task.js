let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let schemaName = 'Task'

let comment = new Schema({
  content: {
    type: String,
    required: true
  },
  authorId: {
    type: ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

let task = new Schema({
  description: {
    type: String,
    required: true
  },
  listId: {
    type: ObjectId,
    ref: 'List',
    required: true
  },
  authorId: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  boardid: {
    type: ObjectId,
    ref: 'Board',
    required: true
  },
  comments: [comment]
}, {
  timestamps: true
})


module.exports = mongoose.model(schemaName, task)