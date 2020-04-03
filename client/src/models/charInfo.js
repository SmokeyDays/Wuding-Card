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
      const state = yield select(state => state.charInfo);
      const myHealth = state.myHealth + diff;
      window.g_socket.emit('changeHealth', { health: myHealth, roomId: window.g_roomId });
      yield put({ type: 'updateState', payload: { myHealth } })
    },
    *changeLevel({diff}, { put , select }) {
      const state = yield select(state => state.charInfo);
      const myLevel = state.myLevel + diff;
      window.g_socket.emit('changeLevel', { level: myLevel, roomId: window.g_roomId });
      yield put({ type: 'updateState', payload: { myLevel } })
    },
    *changeMana({diff}, { put , select }) {
      const state = yield select(state => state.charInfo);
      const myMana = state.myMana + diff;
      window.g_socket.emit('changeMana', { mana: myMana, roomId: window.g_roomId });
      yield put({ type: 'updateState', payload: { myMana } })
    }
  },
  subscriptions: {
    setupHealth({ history, dispatch }) {
      history.listen(({ pathname, query }) => {
        if (pathname === '/room') {
          window.g_socket.on('changeHealth-by-opposite', ({health}) => {
            dispatch({ type: 'updateState', payload: {
              oppositeHealth: health,
            } });
          })
        }
      });
    },
    setupLevel({ history, dispatch }) {
      history.listen(({ pathname, query }) => {
        if (pathname === '/room') {
          window.g_socket.on('changeLevel-by-opposite', ({level}) => {
            dispatch({ type: 'updateState', payload: {
              oppositeLevel: level,
            } });
          })
        }
      });
    },
    setupMana({ history, dispatch }) {
      history.listen(({ pathname, query }) => {
        if (pathname === '/room') {
          window.g_socket.on('changeMana-by-opposite', ({mana}) => {
            dispatch({ type: 'updateState', payload: {
              oppositeMana: mana,
            } });
          })
        }
      });
    }
  },
}