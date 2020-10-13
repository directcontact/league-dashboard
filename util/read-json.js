const es = require('event-stream');
const JSONStream = require('JSONStream');
const fs = require('fs');

const Game = require('../models/game');
const Team = require('../models/team');
const Ban = require('../models/ban');
const Participant = require('../models/participant');
const Stat = require('../models/stat');
const Timeline = require('../models/timeline');
const CreepsPerMinDelta = require('../models/creepsPerMinDelta');
const XpPerMinDelta = require('../models/xpPerMinDelta');
const GoldPerMinDelta = require('../models/goldPerMinDelta');
const DamageTakenPerMinDelta = require('../models/damageTakenPerMinDelta');
const ParticiantIdentity = require('../models/participantIdentity');
const Player = require('../models/player');

const { getChampions } = require('./api');

module.exports = {
  async readFile(json) {
    let stream = fs.createReadStream(json, { encoding: 'utf8' });
    let parser = JSONStream.parse('*');

    let champions = await getChampions();

    stream
      .pipe(parser)
      .pipe(
        es.mapSync((game) => {
          let gameDoc = new Game({
            gameId: game.gameId,
            platformId: game.platformId,
            gameDuration: game.gameDuration,
            queueId: game.queueId,
            mapId: game.mapId,
            seasonId: game.seasonId,
            gameMode: game.gameMode,
          });

          for (let i = 0; i < game.teams.length; i++) {
            let teamDoc = new Team({
              teamId: game.teams[i].teamId,
              win: game.teams[i].win,
              firstBlood: game.teams[i].firstBlood,
              firstTower: game.teams[i].firstTower,
              firstInhibitor: game.teams[i].firstInhibitor,
              firstBaron: game.teams[i].firstBaron,
              firstDragon: game.teams[i].firstDragon,
              firstRiftHerald: game.teams[i].firstRiftHerald,
              towerKills: game.teams[i].towerKills,
              inhibitorKills: game.teams[i].inhibitorKills,
              baronKills: game.teams[i].baronKills,
              dragonKills: game.teams[i].dragonKills,
              vilemawKills: game.teams[i].vilemawKills,
              riftHeraldKills: game.teams[i].riftHeraldKills,
            });

            for (let j = 0; j < game.teams[i].bans.length; j++) {
              let champion = champions.filter(
                (champion) => champion.key === game.teams[i].bans[j].championId
              )[0];
              let banDoc = new Ban({
                champion: champion ? champion.name : '',
                pickTurn: game.teams[i].bans[j].pickTurn,
              });

              teamDoc.bans.push(banDoc);
            }

            gameDoc.teams.push(teamDoc);
          }

          for (let i = 0; i < game.participants.length; i++) {
            let champion = champions.filter(
              (champion) => champion.key === game.participants[i].championId
            )[0];

            let participantDoc = new Participant({
              participantId: game.participants[i].participantId,
              teamId: game.participants[i].teamId,
              champion: champion.name,
              spell1Id: game.participants[i].spell1Id,
              spell2Id: game.participants[i].spell2Id,
            });

            let statDoc = new Stat({
              participantId: game.participants[i].stats.participantId,
              win: game.participants[i].stats.win,
              item0: game.participants[i].stats.item0,
              item1: game.participants[i].stats.item1,
              item2: game.participants[i].stats.item2,
              item3: game.participants[i].stats.item3,
              item4: game.participants[i].stats.item4,
              item5: game.participants[i].stats.item5,
              item6: game.participants[i].stats.item6,
              kills: game.participants[i].stats.kills,
              deaths: game.participants[i].stats.deaths,
              assists: game.participants[i].stats.assists,
              largestKillingSpree:
                game.participants[i].stats.largestKillingSpree,
              largestMultiKill: game.participants[i].stats.largestMultiKill,
              killingSprees: game.participants[i].stats.killingSprees,
              longestTimeSpentLiving:
                game.participants[i].stats.longestTimeSpentLiving,
              doubleKills: game.participants[i].stats.doubleKills,
              tripleKills: game.participants[i].stats.tripleKills,
              quadraKills: game.participants[i].stats.quadraKills,
              pentaKills: game.participants[i].stats.pentaKills,
              unrealKills: game.participants[i].stats.unrealKills,
              totalDamageDealt: game.participants[i].stats.totalDamageDealt,
              magicDamageDealt: game.participants[i].stats.magicDamageDealt,
              physicalDamageDealt:
                game.participants[i].stats.physicalDamageDealt,
              trueDamageDealt: game.participants[i].stats.trueDamageDealt,
              largestCriticalStrike:
                game.participants[i].stats.largestCriticalStrike,
              totalDamageDealtToChampions:
                game.participants[i].stats.totalDamageDealtToChampions,
              magicDamageDealtToChampions:
                game.participants[i].stats.magicDamageDealtToChampions,
              physicalDamageDealtToChampions:
                game.participants[i].stats.physicalDamageDealtToChampions,
              trueDamageDealtToChampions:
                game.participants[i].stats.trueDamageDealtToChampions,
              totalHeal: game.participants[i].stats.totalHeal,
              totalUnitsHealed: game.participants[i].stats.totalUnitsHealed,
              damageSelfMitigated:
                game.participants[i].stats.damageSelfMitigated,
              damageDealtToObjectives:
                game.participants[i].stats.damageDealtToObjectives,
              damageDealtToTurrets:
                game.participants[i].stats.damageDealtToTurrets,
              visionScore: game.participants[i].stats.visionScore,
              timeCCingOthers: game.participants[i].stats.timeCCingOthers,
              totalDamageTaken: game.participants[i].stats.totalDamageTaken,
              magicalDamageTaken: game.participants[i].stats.magicalDamageTaken,
              physicalDamageTaken:
                game.participants[i].stats.physicalDamageTaken,
              trueDamageTaken: game.participants[i].stats.trueDamageTaken,
              goldEarned: game.participants[i].stats.goldEarned,
              goldSpent: game.participants[i].stats.goldSpent,
              turretKills: game.participants[i].stats.turretKills,
              inhibitorKills: game.participants[i].stats.inhibitorKills,
              totalMinionsKilled: game.participants[i].stats.totalMinionsKilled,
              neutralMinionsKilled:
                game.participants[i].stats.neutralMinionsKilled,
              neutralMinionsKilledTeamJungle:
                game.participants[i].stats.neutralMinionsKilledTeamJungle,
              neutralMinionsKilledEnemyJungle:
                game.participants[i].stats.neutralMinionsKilledEnemyJungle,
              totalTimeCrowdControlDealt:
                game.participants[i].stats.totalTimeCrowdControlDealt,
              champLevel: game.participants[i].stats.champLevel,
              visionWardsBoughtInGame:
                game.participants[i].stats.visionWardsBoughtInGame,
              sightWardsBoughtInGame:
                game.participants[i].stats.sightWardsBoughtInGame,
              wardsPlaced: game.participants[i].stats.wardsPlaced,
              wardsKilled: game.participants[i].stats.wardsKilled,
              firstBloodKill: game.participants[i].stats.firstBloodKill,
              firstBloodAssist: game.participants[i].stats.firstBloodAssist,
              firstTowerKill: game.participants[i].stats.firstTowerKill,
              firstTowerAssist: game.participants[i].stats.firstTowerAssist,
              firstInhibitorKill: game.participants[i].stats.firstInhibitorKill,
              firstInhibitorAssist:
                game.participants[i].stats.firstInhibitorAssist,
              perk0: game.participants[i].stats.perk0,
              perk0Var1: game.participants[i].stats.perk0Var1,
              perk0Var2: game.participants[i].stats.perk0Var2,
              perk0Var3: game.participants[i].stats.perk0Var3,
              perk1: game.participants[i].stats.perk1,
              perk1Var1: game.participants[i].stats.perk1Var1,
              perk1Var2: game.participants[i].stats.perk1Var2,
              perk1Var3: game.participants[i].stats.perk1Var3,
              perk2: game.participants[i].stats.perk2,
              perk2Var1: game.participants[i].stats.perk2Var1,
              perk2Var2: game.participants[i].stats.perk2Var2,
              perk2Var3: game.participants[i].stats.perk2Var3,
              perk3: game.participants[i].stats.perk3,
              perk3Var1: game.participants[i].stats.perk3Var1,
              perk3Var2: game.participants[i].stats.perk3Var2,
              perk3Var3: game.participants[i].stats.perk3Var3,
              perk4: game.participants[i].stats.perk4,
              perk4Var1: game.participants[i].stats.perk4Var1,
              perk4Var2: game.participants[i].stats.perk4Var2,
              perk4Var3: game.participants[i].stats.perk4Var3,
              perk5: game.participants[i].stats.perk5,
              perk5Var1: game.participants[i].stats.perk5Var1,
              perk5Var2: game.participants[i].stats.perk5Var2,
              perk5Var3: game.participants[i].stats.perk5Var3,
              perkPrimaryStyle: game.participants[i].stats.perkPrimaryStyle,
              perkSubStyle: game.participants[i].stats.perkSubStyle,
              statPerk0: game.participants[i].stats.statPerk0,
              statPerk1: game.participants[i].stats.statPerk1,
              statPerk2: game.participants[i].stats.statPerk2,
            });

            participantDoc.stats = statDoc;

            let timelineDoc = new Timeline({
              participantId: game.participants[i].timeline.participantId,
              role: game.participants[i].timeline.role,
              lane: game.participants[i].timeline.lane,
            });

            if ('creepsPerMinDeltas' in game.participants[i].timeline) {
              let cpmdDoc = new CreepsPerMinDelta({
                '0-10':
                  '0-10' in game.participants[i].timeline.creepsPerMinDeltas
                    ? game.participants[i].timeline.creepsPerMinDeltas['0-10']
                    : -1,
                '10-20':
                  '10-20' in game.participants[i].timeline.creepsPerMinDeltas
                    ? game.participants[i].timeline.creepsPerMinDeltas['10-20']
                    : -1,
                '30-end':
                  '30-end' in game.participants[i].timeline.creepsPerMinDeltas
                    ? game.participants[i].timeline.creepsPerMinDeltas['30-end']
                    : -1,
              });

              timelineDoc.creepsPerMinDelta = cpmdDoc;
            }

            if ('xpPerMinDeltas' in game.participants[i].timeline) {
              let xpmdDoc = new XpPerMinDelta({
                '0-10':
                  '0-10' in game.participants[i].timeline.xpPerMinDeltas
                    ? game.participants[i].timeline.xpPerMinDeltas['0-10']
                    : -1,
                '10-20':
                  '10-20' in game.participants[i].timeline.xpPerMinDeltas
                    ? game.participants[i].timeline.xpPerMinDeltas['10-20']
                    : -1,
                '30-end':
                  '30-end' in game.participants[i].timeline.xpPerMinDeltas
                    ? game.participants[i].timeline.xpPerMinDeltas['30-end']
                    : -1,
              });

              timelineDoc.xpPerMinDelta = xpmdDoc;
            }

            if ('goldPerMinDeltas' in game.participants[i].timeline) {
              let gpmdDoc = new GoldPerMinDelta({
                '0-10':
                  '0-10' in game.participants[i].timeline.goldPerMinDeltas
                    ? game.participants[i].timeline.goldPerMinDeltas['0-10']
                    : -1,
                '10-20':
                  '10-20' in game.participants[i].timeline.goldPerMinDeltas
                    ? game.participants[i].timeline.goldPerMinDeltas['10-20']
                    : -1,
                '30-end':
                  '30-end' in game.participants[i].timeline.goldPerMinDeltas
                    ? game.participants[i].timeline.goldPerMinDeltas['30-end']
                    : -1,
              });

              timelineDoc.goldPerMinDelta = gpmdDoc;
            }

            if ('damageTakenPerMinDeltas' in game.participants[i].timeline) {
              let dtpmdDoc = new DamageTakenPerMinDelta({
                '0-10':
                  '0-10' in
                  game.participants[i].timeline.damageTakenPerMinDeltas
                    ? game.participants[i].timeline.damageTakenPerMinDeltas[
                        '0-10'
                      ]
                    : -1,
                '10-20':
                  '10-20' in
                  game.participants[i].timeline.damageTakenPerMinDeltas
                    ? game.participants[i].timeline.damageTakenPerMinDeltas[
                        '10-20'
                      ]
                    : -1,
                '30-end':
                  '30-end' in
                  game.participants[i].timeline.damageTakenPerMinDeltas
                    ? game.participants[i].timeline.damageTakenPerMinDeltas[
                        '30-end'
                      ]
                    : -1,
              });

              timelineDoc.damageTakenPerMinDelta = dtpmdDoc;
            }

            participantDoc.timeline = timelineDoc;

            gameDoc.participants.push(participantDoc);
          }

          for (let i = 0; i < game.participantIdentities.length; i++) {
            let partIdentDoc = new ParticiantIdentity({
              participantId: game.participantIdentities[i].participantId,
            });

            let playerDoc = new Player({
              platformId: game.participantIdentities[i].player.platformId,
              accountId: game.participantIdentities[i].player.accountId,
              summonerName: game.participantIdentities[i].player.summonerName,
              summonerId: game.participantIdentities[i].player.summonerId,
              currentPlatformId:
                game.participantIdentities[i].player.currentPlatformId,
              currentAccountId:
                game.participantIdentities[i].player.currentAccountId,
              matchHistoryUri:
                game.participantIdentities[i].player.matchHistoryUri,
              profileIcon: game.participantIdentities[i].player.profileIcon,
            });

            partIdentDoc.player = playerDoc;

            gameDoc.participantIdentities.push(partIdentDoc);
          }

          gameDoc.save().then((err, doc) => {
            if (err) return console.error(err);
            console.log(doc);
          });
        })
      )
      .on('error', (error) => {
        console.error(error);
      })
      .on('end', () => {});
  },
};
