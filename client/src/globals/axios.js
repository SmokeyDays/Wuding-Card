/* global API_BASE_URL */
import axios from 'axios';
import { message } from 'antd';

axios.defaults.baseURL = API_BASE_URL;
axios.defaults.headers.common[ 'Accept' ] = 'application/json';
axios.defaults.headers.common[ 'Content-Type' ] = 'application/json';
const accessToken = window.g_cache.getItem('accessToken');
if (accessToken) {
  axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
}
axios.interceptors.response.use(function (response) {
  return response.data;
}, function (error) {
  const { data, status } = error.response || {};
  if (status === 401) {
    window.g_cache.removeItem('accessToken');
  } else if (status === 400 && data.message) {
    message.error(data.message);
  } else {
    message.error('网络错误');
  }
  return Promise.reject(error);
});

window.g_axios = axios;
