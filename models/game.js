const mongoose = require('mongoose');
const Team = require('./team');
const Participant = require('./participant');
const ParticipantIdentity = require('./participantIdentity');

const Schema = mongoose.Schema;

const gameSchema = new Schema({
  gameId: Number,
  platformId: String,
  gameDuration: Number,
  queueId: Number,
  mapId: Number,
  seasonId: Number,
  gameMode: String,
  teams: [Team.schema],
  participants: [Participant.schema],
  participantIdentities: [ParticipantIdentity.schema],
});

module.exports = mongoose.model('Game', gameSchema);
