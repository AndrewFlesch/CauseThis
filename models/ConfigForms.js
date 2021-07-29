const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConfigformsSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: String,
    required: true
  },
  category: {
    type: String
  },
  parent: {
    type: String
  },
  children: {
    type: [String]
  },
  openToChildren: {
    type: Boolean
  },
  level: {
    type: Number
  },
  formtype: {
    type: String,
  },
  formoptions: {
    type: [String]
  },
  date: {
    type: Date,
    default: Date.now
  },
  locationdefault: {
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

module.exports = ConfigForms = mongoose.model('configforms', ConfigformsSchema);
