import { createStore, applyMiddleware, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import promiseMiddleware from "redux-promise";
import storage from "redux-persist/lib/storage";
import storeData from "@/store/reducers";

const reducers = combineReducers({
  storeData,
});

const persistConfig = {
  key: "REDUX",
  keyPrefix: "BOE_",
  storage,
};

const appPersistReducer = persistReducer(persistConfig, reducers);
const store: any = createStore(
  appPersistReducer,
  applyMiddleware(promiseMiddleware)
);
const persistor = persistStore(store);

export { store, persistor };
