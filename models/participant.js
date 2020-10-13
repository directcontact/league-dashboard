const mongoose = require('mongoose');
const Stat = require('./stat');
const Timeline = require('./timeline');

const Schema = mongoose.Schema;

const participantSchema = new Schema({
  participantId: Number,
  teamId: Number,
  champion: String,
  spell1Id: Number,
  spell2Id: Number,
  stats: Stat.schema,
  timeline: Timeline.schema,
});

module.exports = mongoose.model('Participant', participantSchema);
