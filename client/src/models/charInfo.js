export default {
  state: {
    myHealth: 10, // 我的命火
    oppositeHealth: 10, // 对面命火
    myLevel: 1, // 我的命火
    oppositeLevel: 1, // 对面命火
    myMana: 1, // 我的命火
    oppositeMana: 1, // 对面命火
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
    *changeHealth({diff}, { put , select }) {
      const state = yield select(state => state);
      const myHealth = state.charInfo.myHealth + diff;
      window.g_socket.emit('changeHealth', { health: myHealth, userId: state.auth.currentUser, roomId: window.g_roomId });
      yield put({ type: 'updateState', payload: { myHealth } })
    },
    *changeLevel({diff}, { put , select }) {
      const state = yield select(state => state);
      const myLevel = state.charInfo.myLevel + diff;
      window.g_socket.emit('changeLevel', { level: myLevel, userId: state.auth.currentUser, roomId: window.g_roomId });
      yield put({ type: 'updateState', payload: { myLevel } })
    },
    *changeMana({diff}, { put , select }) {
      const state = yield select(state => state);
      const myMana = state.charInfo.myMana + diff;
      window.g_socket.emit('changeMana', { mana: myMana, userId: state.auth.currentUser, roomId: window.g_roomId });
      yield put({ type: 'updateState', payload: { myMana } })
    }
  },
  subscriptions: {
    setupCharInfo({ history, dispatch }) {
      history.listen(({ pathname, query }) => {
        if (pathname === '/room') {
          window.g_socket.on('changeCharInfo-by-opposite', ({charInfo}) => {
            dispatch({ type: 'updateState', payload: {
              oppositeHealth: charInfo.health,
              oppositeLevel: charInfo.level,
              oppositeMana: charInfo.mana,
            } });
          })
        }
      });
    }
  },
}