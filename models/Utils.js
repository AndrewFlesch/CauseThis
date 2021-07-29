const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UtilsSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: String,
    required: true
  },
  items: {
    type: [String],
  },
})

module.exports = Utils = mongoose.model('utils', UtilsSchema);
