import React, { lazy } from 'react';
import { Modal, message } from 'antd';
export enum requestCode {
  failedCode = 111, // 失败
  successCode = '000', // 成功
  noLoginTokenCode = 202, // 无token
  noRouterCode = 404, // 路劲找不到
  serverErrorCode = 500, // 服务错误
}
export type statusCode = requestCode;
/**
 * @author lgf
 * @param status 状态
 * @param content 弹窗的文本提示语
 */
export const toast = (
  status: statusCode = requestCode.successCode,
  content: string = '操作成功',
): void => {
  if (status === requestCode.successCode) {
    message.success(content);
  } else if (status === requestCode.failedCode) {
    message.error(content);
  }
};

/**
 * @description 异步引入组件
 * @param path 路径
 */
export const lazyComponent = (path: string) => {
  return lazy(() => import(`@/pages/${path}`));
};
