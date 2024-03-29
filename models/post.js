const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  title: {
    type: [String],
    required: true
  },
  category: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  duration: {
    type: Number,
  },
  location: {
    type: String
  },
  notes: {
    type: String
  },
  description: {
    type: String
  },
  weather: {
    type: String
  }

})

module.exports = Post = mongoose.model('post', PostSchema);
