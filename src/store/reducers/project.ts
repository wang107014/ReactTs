import projectState from "@/store/state/project";
import * as projectActionTypes from "@/store/actionTypes/project";
import { StoreAction } from "./index";

const projectReducer = (
  state = projectState,
  { type, payload }: StoreAction
) => {
  switch (type) {
    case projectActionTypes.SET_PROJECTINFO:
      return {
        ...state,
        ...payload,
      };
    case "LOGOUT":
      return {
        ...projectState,
      };

    default:
      return state;
  }
};

export default projectReducer;
