export default {
  state: {
    myRoll: 0, // 我的摇点
    oppositeRoll: 0, // 对面摇点
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
    *roll(actions, { put }) {
      const myRoll = Math.ceil(Math.random()*6)
      window.g_socket.emit('roll', { roll: myRoll, roomId: window.g_roomId });
      yield put({ type: 'updateState', payload: { myRoll } })
    }
  },
  subscriptions: {
    setup({ history, dispatch }) {
      history.listen(({ pathname, query }) => {
        if (pathname === '/room') {
          // 监听对面摇点
          window.g_socket.on('roll-by-opposite', ({roll}) => {
            dispatch({ type: 'updateState', payload: {
              oppositeRoll: roll,
            } });
          })
        }
      });
    }
  },
}