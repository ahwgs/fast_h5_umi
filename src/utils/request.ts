import Axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { getCookie, setCookie } from '@/utils/cookie';
import { HttpCode } from '@/common';
import { Toast } from 'antd-mobile';
import { getDvaApp } from 'umi';
import { ServerApiErrorInfo } from '@/common/types';
import appConfig, { DefaultConfig } from '../appConfig';

const { axiosBaseUrl, axiosCookie, axiosTimeout }: DefaultConfig = appConfig;

function errorReport(
  url: string,
  error: string | Error,
  requestOptions: AxiosRequestConfig,
  response?: AnyObject,
) {
  if (window.$sentry) {
    const errorInfo: ServerApiErrorInfo = {
      error: typeof error === 'string' ? new Error(error) : error,
      type: 'request',
      requestUrl: url,
      requestOptions: JSON.stringify(requestOptions),
    };

    if (response) {
      errorInfo.response = JSON.stringify(response);
    }

    window.$sentry.log(errorInfo);
  }
}

Axios.defaults.timeout = axiosTimeout;
Axios.defaults.baseURL = axiosBaseUrl;
Axios.defaults.withCredentials = axiosCookie;

function requestSuccess(config: any) {
  const cookie = getCookie();
  const defaultHeader: any = {
    version: '123',
  };
  if (cookie) {
    defaultHeader.Token = cookie;
  }
  // eslint-disable-next-line no-param-reassign
  config.headers = { ...defaultHeader, ...config.headers };
  return config;
}

function requestFail(error: any) {
  return Promise.reject(error);
}

function responseSuccess(response: AxiosResponse) {
  const { headers, data, config } = response;
  if (headers.token) {
    setCookie('token', headers.token);
  }
  const { url = '' } = config;

  const { code, hasError, data: resData, message } = data;
  if (code !== HttpCode.SUCCESS || hasError) {
    errorReport(url, message, config, response);
    if (code === HttpCode.FAIL || hasError) {
      return Toast.fail(message || '系统异常,请联系管理员');
    }
    if (code === HttpCode.WARN) {
      return Toast.fail(message || '系统警告,请注意检查');
    }
    if (code === HttpCode.NO_LOGIN) {
      Toast.offline('未登录或登录已过期，请重新登录。');
      return getDvaApp()?._store?.dispatch({
        type: 'user/fetchLogout',
      });
    }
  }
  return resData;
}

function responseFail(error: AxiosError) {
  return Promise.reject(error);
}

// 添加拦截器
Axios.interceptors.request.use(requestSuccess, requestFail);
Axios.interceptors.response.use(responseSuccess, responseFail);

/**
 *
 * @param config
 */
export const request = (config: AxiosRequestConfig) =>
  Axios(config)
    .then(response => response)
    .catch(error => error);

export const Get = (url: string, params?: object, config?: AxiosRequestConfig) =>
  request(
    Object.assign({}, config, {
      url,
      params: { ...params, _t: new Date().getTime() },
      method: 'get',
    }),
  );

export const Post = (url: string, data?: object, config?: AxiosRequestConfig) =>
  request(
    Object.assign({}, config, {
      url,
      data,
      method: 'post',
    }),
  );

export const Put = (url: string, data?: object, config?: AxiosRequestConfig) =>
  request(
    Object.assign({}, config, {
      url,
      data,
      method: 'put',
    }),
  );

export const Delete = (url: string, data?: object, config?: AxiosRequestConfig) =>
  request(
    Object.assign({}, config, {
      url,
      data,
      method: 'delete',
    }),
  );
