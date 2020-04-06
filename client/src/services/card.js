import _ from 'lodash';

let timeout = null;
let needLoadIds = [];

export const loadCardInfos = async (ids) => {
  return new Promise((resolve) => {
    needLoadIds = [...needLoadIds,...ids];
    clearTimeout(timeout);
    timeout = setTimeout(async () => {
      const cardIds = _.clone(needLoadIds)
      needLoadIds = []
      if (cardIds.length > 0) {
        const { cardInfos } = await window.g_axios.post('/card/card-infos', { cardIds: _.uniq(cardIds) });
        resolve(cardInfos)
      }
    }, 10)
  });
}