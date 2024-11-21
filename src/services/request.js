import axios from 'axios';
import qs from 'qs';
import { MessagePlugin } from 'tdesign-react';

// 默认请求头
const defaultRequestHeaders = {
  'Content-Type': 'application/x-www-form-urlencoded'
  // 'Content-Type': 'application/json'
};

const ins = axios.create({
  // 线上
  // baseURL: 'http://1.94.212.127/api/',
  // baseURL: '/api',
  // 本地
  // baseURL: 'http://10.11.1.155:5000',
  baseURL: import.meta.env.PUBLIC_APISERVER,
  headers: defaultRequestHeaders,
  // withCredentials: true,
  timeout: 300000, // 5min
});

// 请求拦截
// ins.interceptors.request.use((config) => {
//   // 请求头参数用作区分Operator Customer平台
//   // config.headers.portal = 'operator';

//   return config;
// }, (error) => {
//   return Promise.reject(error);
// });

// // 响应拦截
// ins.interceptors.response.use((response) => {
//   return response;
// }, (error) => {
//   return Promise.reject(error);
// });

// 记录请求取消方法
const InitiatedRequest = {};

/**
 * @param {String} url - 接口地址
 * @param {Objech} data - 请求参数
 * @param {String} propsType - 'custom' or null - 是否自定义传参格式
 * @param {Boolean} cancelOff - 部分特殊场景请求不需要做校验取消上一次请求 true-取消  false-不取消
 * @param {Boolean} Interface - 部分接口不需要统一处理返回信息是否报错，原样返回接口返参
 * @param {object} headers - 请求头，对于部分接口请求头类型不同
 */

const request = async ({
  url = '',
  data = {},
  method = 'get',
  propsType = '',
  cancelOff = false,
  Interface = false,
  headers = defaultRequestHeaders
}) => {
  // 只有get请求需要取消重复请求
  if (method !== 'get') cancelOff = true;

  const requestIns = async () => {
    // 取消重复请求
    if (!cancelOff && InitiatedRequest[url + method]) {
      InitiatedRequest[url + method].cancel('cancel request');

      InitiatedRequest[url + method] = undefined;
      delete InitiatedRequest[url + method];
    }

    InitiatedRequest[url + method] = axios.CancelToken.source();

    switch (method.toLocaleUpperCase()) {
      case 'GET':
        return ins.get(url, {
          params: data,
          cancelToken: InitiatedRequest[url + method].token,
          headers
        });
      case 'POST':
        if (propsType === 'custom') {
          return ins.post(url,
            data,
            {
              cancelToken: InitiatedRequest[url + method].token,
              headers,
            }
          );
        }

        return ins.post(url, qs.stringify(data), { cancelToken: InitiatedRequest[url + method].token, headers });
      case 'PUT':
        if (propsType === 'custom') {
          return ins.put(url, data, { cancelToken: InitiatedRequest[url + method].token, headers });
        }

        return ins.put(url, qs.stringify(data), { cancelToken: InitiatedRequest[url + method].token, headers });
      case 'DELETE':
        if (propsType === 'custom') {
          return ins.delete(url,
            {
              data,
              cancelToken: InitiatedRequest[url + method].token,
              headers
            });
        }

        return ins.delete(url,
          {
            data: qs.stringify(data),
            cancelToken: InitiatedRequest[url + method].token,
            headers
          });
      default:
        return ins.get(url, {
          params: data,
          cancelToken: InitiatedRequest[url + method].token,
          headers
        });
    }
  }

  try {
    const { data } = await requestIns();

    (InitiatedRequest)[url + method] = '';
    // 未登录
    if (data.message === 'illegal token' || data.code == 4) {
      throw Error('Please login again');
    }

    if (Interface) {
      return data
    }

    // 接口其他错误
    if ((data.code >= 1) && (data.code <= 3)) {
      // message.warning(data?.message || '');
      MessagePlugin.warning(data?.message || '');
      return false
    } else if (data.code >= 4) {
      throw Error(data.message);
    }

    let newData = data.data || data;

    return newData;

  } catch (error) {
    // 未登录
    // if (error.message === 'Please login again') {
    //   message.warning(error?.message || '');
    //   // localStorage.removeItem('operatorU');
    //   // localStorage.removeItem('operatorP');
    //   Cookies.remove('token');

    //   // 延迟跳转，如直接跳转会导致未登录提示框一闪而过
    //   setTimeout(() => {
    //     if (!window.location.pathname.includes('/home')) {
    //       window.location.replace('/home');
    //     }
    //     // resetCookie();
    //   }, 600);

    //   return false;
    // }

    if (error.message === 'cancel request') {
      return false;
    }

    // 接口其他错误
    // message.error(error?.message || '');
    MessagePlugin.error(error.message || '');
    return false;
  } finally { }
}

export default request
