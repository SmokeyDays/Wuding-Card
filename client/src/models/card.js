import _ from 'lodash';
import update from 'immutability-helper';
import loadImage from 'image-promise';
import 即时 from "@/assets/logo/1即时法术.png";
import 触发 from "@/assets/logo/2触发法术.png";
import 持续 from "@/assets/logo/3持续法术.png";
import 法阵 from "@/assets/logo/4法阵.png";
import 攻击 from "@/assets/logo/5攻击.png";
import 防御 from "@/assets/logo/6防御.png";
import 法器 from "@/assets/logo/7法器.png";
import 万物 from "@/assets/logo/8万物.png";

export default {
  state: {
    myCardGroups: [], // 牌组
    myCardsInStack: [], // 牌堆
    myCardsInHand: [], // 手牌
    myCardsInBattlefield: [], // 战场
    myCardsInCemetery: [], // 墓地
    myCardsInGui: [], // 归墟
    myCardsInHandMax: 60,
    myCardsInBattlefieldMax: 15,
    cardLogos: {},
  },
  reducers: {
    updateState(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    loadMyCardsInStackFromMyCardsGroup(state) {
      return {
        ...state,
        myCardsInStack: _.sortBy(state.myCardGroups, () => 0.5 - Math.random()),
      };
    },
    randomSortMyCardsInStack(state) {
      return {
        ...state,
        myCardsInStack: _.sortBy(state.myCardsInStack, () => 0.5 - Math.random()),
      };
    },
    moveMyCards(state, { fromSpace, toSpace, cards, isEnd = true }) {
      const cardsIds = cards.map(item => item._id);
      const fromSpaceCards = state[fromSpace].filter(item => !cardsIds.includes(item._id));
      const toSpaceCards = isEnd ? [...state[toSpace], ...cards] : [...cards, ...state[toSpace]]; // 合并数组
      return {
        ...state,
        [fromSpace]: fromSpaceCards,
        [toSpace]: toSpaceCards,
      };
    },
    setMyCard(state, { key, _id, data }) {
      const index = state[key].findIndex(item => item._id === _id);
      return update(state, {
        [key]: {
          [index]: {
            $apply: before => ({
              ...before,
              ...data
            })
          }
        }
      });
    },
    updateCardLogos(state, {name, image}) {
      return update(state, {
        cardLogos: {
          [name]: {
            $set: image,
          }
        }
      });
    }
  },
  effects: {
    *fetchMyCardGroups({ autoSetMyCardsInStack }, { put, select }) {
      const { myCardGroups } = yield window.g_axios.post('/card/my-card-groups');
      yield put({ type: 'updateState', payload: { myCardGroups } });
      if (autoSetMyCardsInStack) {
        yield put({ type: 'loadMyCardsInStackFromMyCardsGroup' });
        const state = yield select(state => state.card)
        const myCardsInHandTest = state.myCardsInStack.slice(0, 40)
        const myCardsInBattlefieldTest = state.myCardsInStack.slice(40, 50)
        yield put({
          type: 'moveMyCards',
          cards: myCardsInHandTest.map(item => ({ ...item, visible: 'MYSELF' })),
          fromSpace: 'myCardsInStack',
          toSpace: 'myCardsInHand',
        }); // TODO: 删除
        yield put({
          type: 'moveMyCards',
          cards: myCardsInBattlefieldTest.map(item => ({ ...item, visible: 'MYSELF' })),
          fromSpace: 'myCardsInHand',
          toSpace: 'myCardsInBattlefield',
        }); // TODO: 删除
      }
    },
    *loadAssets(action, {put, select} ) {
      const cardLogos = {即时,触发,持续,法阵,攻击,防御,法器,万物};
      const cardTypes = Object.keys(cardLogos)
      const oldCardLogos = yield select(state => state.card.cardLogos);
      for (let i = 0; i < cardTypes.length; i++) {
        const name = `cardLogo${i+1}`;
        if(!oldCardLogos[name]) {
          const image = yield loadImage(cardLogos[cardTypes[i]])
          yield put({type: 'updateCardLogos', name: cardTypes[i], image})
        }
      }
    }
  },
  subscriptions: {
    setup({ history, dispatch }) {
      history.listen(({ pathname, query }) => {
        if (pathname === '/room') {
          const { action } = query;
          if (action === 'duel') {
            dispatch({ type: 'fetchMyCardGroups', autoSetMyCardsInStack: true });
          }
          // 加载资源
          dispatch({ type: 'loadAssets' });
        }
      });
    }
  },
}