import * as projectActionTypes from "../actionTypes/project";

export const setProjectInfo = (params: any) => {
  return {
    type: projectActionTypes.SET_PROJECTINFO,
    payload: params,
  };
};
