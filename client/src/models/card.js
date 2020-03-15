import _ from 'lodash';
import update from 'immutability-helper';

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
      const toSpaceCards = isEnd ? [...state[toSpace], ...cards]: [...cards, ...state[toSpace]]; // 合并数组
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
  },
  subscriptions: {
    setup({ history, dispatch }) {
      history.listen(({ pathname, query }) => {
        if (pathname === '/room') {
          const { action } = query;
          if (action === 'duel') {
            dispatch({ type: 'fetchMyCardGroups', autoSetMyCardsInStack: true });
          }
        }
      });
    }
  },
}