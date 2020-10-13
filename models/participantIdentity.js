const mongoose = require('mongoose');
const Player = require('./player');

const Schema = mongoose.Schema;

const participantIdentitySchema = new Schema({
  participantId: Number,
  player: Player.schema,
});

module.exports = mongoose.model(
  'ParticipantIdentity',
  participantIdentitySchema
);
