const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User', // References the User model
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now, // Automatically set to current date/time
  },
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
