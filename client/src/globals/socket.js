/* global SOCKET_WS_URL */
import io from 'socket.io-client';

const socket = io(SOCKET_WS_URL, { transport: 'websocket' });
window.g_socket = socket;