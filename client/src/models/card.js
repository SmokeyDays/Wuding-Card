export default {
  state: {
    myCardGroups: [], // 牌组
    myCardStack: [], // 牌堆
  },
  reducers: {
    updateState(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
  effects: {
    *fetchMyCardGroups(actions, { put }) {
      const { myCardGroups } = yield window.g_axios.post('/card/my-card-groups');
      yield put({ type: 'updateState', payload: { myCardGroups } });
    }
  },
  subscriptions: {
    setup({ history, dispatch }) {
      history.listen(({ pathname, query }) => {
        if (pathname === '/room') {
          const { action } = query;
          if (action === 'duel') {
            dispatch({ type: 'fetchMyCardGroups' });
          }
        }
      });
    }
  },
}