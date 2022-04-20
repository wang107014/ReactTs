import momHttp, { MomPlatFormUrl } from '@/utils/axios';

const LoginApi = {
// 工序下拉
  processSearch(params: any) {
    return momHttp.http(
      { type: 'get', url: MomPlatFormUrl + '/process/search' },
      params,
    );
  },
}
export default LoginApi
