const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const creepsPerMinDeltaSchema = new Schema({
  '0-10': Number,
  '10-20': Number,
  '30-end': Number,
});

module.exports = mongoose.model('CreepsPerMinDelta', creepsPerMinDeltaSchema);
