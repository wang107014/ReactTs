import MomHttp from './http';
export const baseUrl = process.env.REACT_APP_API_BASE || '/api/v1';
export const MomPlatFormUrl = '/mom/platform';
const momHttp = new MomHttp({
  baseUrl,
  code: '00000',
  logoutCode: '99999',
  // 登录失败回调
  logoutCallback: () => {
    debugger
    // window.location.href = process.env.REACT_APP_PATH + '/login';
  },
  // 请求头公共设置（通常设置ut）
  reqSet: (req: any) => {
    // req.headers['_uuuut'] = '9999999';
  },
});

export default momHttp;
