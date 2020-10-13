const fetch = require('node-fetch');

module.exports = {
  async getChampions() {
    let res = await fetch(
      'http://ddragon.leagueoflegends.com/cdn/10.20.1/data/en_US/champion.json'
    );
    if (res.ok) {
      let json = await res.json();
      let mapping = [];
      for (key in json.data) {
        mapping.push({ key: parseInt(json.data[key].key), name: key });
      }
      champions = mapping;
      return champions;
    }

    return '';
  },
};
