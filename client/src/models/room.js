import update from 'immutability-helper';
import { message } from 'antd';

export default {
  state: {
    rooms: [],
    roomsTotal: 0,
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
    *createRoom({ data }, { put, select }) {
      const { room } = yield window.g_axios.post('/room/create', data);
      message.success('创建成功');
      const roomState = yield select(state => state.room);
      const rooms = update(roomState.rooms, { $splice: [[0, 0, room]] });
      yield put({ type: 'updateState', payload: { rooms, roomsTotal: roomState.roomsTotal + 1 } });
    },
    *fetchRooms({ page, filters }, { put }) {
      const { rooms, roomsTotal } = yield window.g_axios.post('/room/list', { page, filters });
      yield put({ type: 'updateState', payload: { rooms, roomsTotal } });
    }
  },
  subscriptions: {
    setup({ history, dispatch }) {
      history.listen(({ pathname, query }) => {
        if (pathname === '/') {
          dispatch({ type: 'fetchRooms' });
          window.g_roomId = null;
        }
        if (pathname === '/room') {
          const { roomId, action } = query;
          window.g_socket.emit('join-room', { roomId, action });
          window.g_roomId = roomId;
          window.g_socket.on('someone-joined-room', (data) => {

          });
        }
      });
    }
  },
}