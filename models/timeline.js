const mongoose = require('mongoose');

const CreepsPerMinDelta = require('./creepsPerMinDelta');
const XpPerMinDelta = require('./xpPerMinDelta');
const GoldPerMinDelta = require('./goldPerMinDelta');
const DamagePerMinDelta = require('./damageTakenPerMinDelta');

const Schema = mongoose.Schema;

const timelineSchema = new Schema({
  participantId: Number,
  creepsPerMinDelta: CreepsPerMinDelta.schema,
  xpPerMinDelta: XpPerMinDelta.schema,
  goldPerMinDelta: GoldPerMinDelta.schema,
  damagePerMinDelta: DamagePerMinDelta.schema,
  role: String,
  lane: String,
});

module.exports = mongoose.model('Timeline', timelineSchema);
