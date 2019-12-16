// @flow

import axios from 'axios';

const apiConfig = {
  baseURL: 'https://api.monpetitgazon.com/',
  timeout: 1000,
};

export default {
  getPlayerList: () => axios.get('stats/championship/1/2018', apiConfig),
  getPlayer: (playerId: string) =>
    axios.get(`stats/player/${playerId}?season=2018`, apiConfig),
};
