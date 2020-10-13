const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const playerSchema = new Schema({
  platformId: String,
  accountId: String,
  summonerName: String,
  summonerId: String,
  currentPlatformId: String,
  currentAccountId: String,
  matchHistoryUri: String,
  profileIcon: Number,
});

module.exports = mongoose.model('Player', playerSchema);
