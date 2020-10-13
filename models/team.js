const mongoose = require('mongoose');
const Ban = require('./ban');

const Schema = mongoose.Schema;

const teamSchema = new Schema({
  teamId: Number,
  win: String,
  firstBlood: Boolean,
  firstTower: Boolean,
  firstInhibitor: Boolean,
  firstBaron: Boolean,
  firstDragon: Boolean,
  firstRiftHerald: Boolean,
  towerKills: Number,
  inhibitorKills: Number,
  baronKills: Number,
  dragonKills: Number,
  vilemawKills: Number,
  riftHeraldKills: Number,
  bans: [Ban.schema],
});

module.exports = mongoose.model('Team', teamSchema);
