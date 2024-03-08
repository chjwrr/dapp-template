import { configureStore } from '@reduxjs/toolkit'
import settingReducer from './setting'
import signMsgReducer from './signMsg'

import { combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';


import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = () => {
  return {
    getItem(_key:any) {
      return Promise.resolve(null);
    },
    setItem(_key:any, value:any) {
      return Promise.resolve(value);
    },
    removeItem(_key:any) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window === "undefined" ? createNoopStorage() : createWebStorage('local');

const persistConfig = {
  key: 'root',
  storage,
  blacklist: []
};

const reducer = combineReducers({
  setting:settingReducer,
  signMsg:signMsgReducer
});

const persistedReducer = persistReducer(persistConfig, reducer);
export const reduxStore = configureStore({
  reducer: persistedReducer,
  // middleware: [thunk],
});

export const persistor = persistStore(reduxStore)
export type RootState = ReturnType<typeof reduxStore.getState>