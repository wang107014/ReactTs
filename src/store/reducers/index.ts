import { combineReducers } from "redux";
import projectReducer from "./project";

export interface StoreAction {
  type: string;
  payload?: any;
}
// 拿到单个模块的reducer 进行合并 传给store
const reducer = combineReducers({
  project: projectReducer,
});

export default reducer;
