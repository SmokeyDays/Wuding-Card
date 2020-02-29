export default {
  state: {
    currentUser: null,
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
    *login({ stub, nickName }, { put }) {
      const { accessToken, endTime, currentUser } = yield window.g_axios.post('/login', { stub, nickName });
      yield put({ type: 'updateState', payload: { currentUser } });
      window.g_cache.setItem('accessToken', accessToken, endTime);
      window.g_axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
      window.g_socket.emit('login', { accessToken });
    },
    *fetchCurrentUser(actions, { put }) {
      const { currentUser } = yield window.g_axios.post('/current-user');
      yield put({ type: 'updateState', payload: { currentUser } });
    },
    *logout(actions, { put }) {
      yield put({ type: 'updateState', payload: { currentUser: null } });
      window.g_cache.removeItem('accessToken');
      window.g_axios.defaults.headers.common.Authorization = null;
      window.g_socket.emit('logout');
    }
  },
  subscriptions: {
    setup({ dispatch }) {
      const accessToken = window.g_cache.getItem('accessToken');
      if (accessToken) {
        window.g_socket.emit('login', { accessToken });
        dispatch({ type: 'fetchCurrentUser' });
      }
      window.g_socket.on('login-success', ({ user }) => {
        console.log('socket-login-success', user)
      })
    }
  },
}