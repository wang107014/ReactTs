import Axios, { AxiosRequestConfig } from 'axios';
import { message } from "antd";

export interface MomHttpProps {
  baseUrl: string;
  code: string;
  logoutCode: string | number;
  logoutCallback: () => void;
  reqSet?: (req: any) => void;
}

interface AxiosConfig {
  timeout?: number;
  headers: {
    'Content-Type': string;
  };
}

interface UrlOpt {
  type: 'get' | 'post';
  url: string;
  options?: AxiosRequestConfig;
}

// 接口请求参数去除前后空格
const dealParams=(params?: any) => {
  if (params) {
    for (let key in params) {
      if (Object.prototype.toString.call (params[key]) == '[object Object]') {
        dealParams (params[key]);
      } else {
        params[key]=
          typeof params[key] == 'string' ? params[key].trim () : params[key];
      }
    }
  }
  return params;
};

class MomHttp {
  baseUrl: string;
  code: string;
  logoutCode: string | number;
  axios: any;
  logoutCallback: any;

  constructor (
    {
      baseUrl,
      code,
      logoutCode,
      logoutCallback,
      reqSet,
    }: MomHttpProps) {
    this.baseUrl=baseUrl;
    this.code=code;
    this.logoutCode=logoutCode;
    this.logoutCallback=logoutCallback;
    this.initConfig (reqSet);
  }

  initConfig (callback?: any) {
    const config: AxiosConfig={
      // timeout: 60000,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const axios=Axios.create (config);
    axios.interceptors.request.use (
      (req: any) => {
        req.url=`${this.baseUrl || ''}${req.url}`;
        req.headers['ut']=sessionStorage.getItem ('ut') || '';
        callback && callback (req);
        return req;
      },
      (error: any) => {
        console.log (error);
      },
    );

    // 返回后拦截
    axios.interceptors.response.use (
      (response: any): any => {
        return response.data.code === this.code
          ? response.data
          : Promise.reject (response.data);
      },
      (error: any) => {
        if (!error.response) {
          message.error ('网络或服务异常');
        }
        if (error.response.status === 404) {
          message.error ('您访问的页面或接口不存在');
        }
        if (error.response.status === 403) {
          message.error ('无权限');
        }
        if (error.response.status === 500) {
          message.error ('网络或服务异常');
        }
        return Promise.reject (error);
      },
    );
    this.axios=axios;
  }

  http (urlObj: UrlOpt, params: any) {
    return this.axios ({
      method: urlObj.type,
      url: urlObj.url,
      params: urlObj.type == 'get' ? dealParams (params) : null,
      data: urlObj.type == 'post' ? dealParams (params) : null,
      ...urlObj.options,
    }).catch ((err: any) => {
      if (err.msg) {
        message.error (err.msg);
        if (err.code === this.logoutCode) {
          this.logoutCallback ();
        }
      }
      return Promise.reject (err);
    });
  }
}

export default MomHttp;
