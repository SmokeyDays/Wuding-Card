import _ from 'lodash';

export default {
  state: {
    myCardGroups: [], // 牌组
    myCardsInStack: [], // 牌堆
    myCardsInHand: [], // 手牌
    myCardsInBattlefield: [], // 战场
    myCardsInCemetery: [], // 墓地
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
    moveMyCardsInStackCards(state, { cards, way }) {
      const cardsIds = cards.map(item => item._id);
      const myCardsInStack = state.myCardsInStack.filter(item => !cardsIds.includes(item._id) );
      return {
        ...state,
        myCardsInStack,
        [way]: cards,
      };
    }
  },
  effects: {
    *fetchMyCardGroups({ autoSetMyCardsInStack }, { put }) {
      const { myCardGroups } = yield window.g_axios.post('/card/my-card-groups');
      yield put({ type: 'updateState', payload: { myCardGroups } });
      if (autoSetMyCardsInStack) {
        yield put({ type: 'loadMyCardsInStackFromMyCardsGroup' });
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