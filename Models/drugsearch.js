const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const drugSearchSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  drug: {
    type: Schema.Types.ObjectId,
    ref: 'Drug'
  },
  searchDate: {
    type: Date,
    default: Date.now
  }
});

const DrugSearch = mongoose.model('DrugSearch', drugSearchSchema);

module.exports = DrugSearch;
