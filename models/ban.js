const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const banSchema = new Schema({
  champion: String,
  pickTurn: Number,
});

module.exports = mongoose.model('Ban', banSchema);
