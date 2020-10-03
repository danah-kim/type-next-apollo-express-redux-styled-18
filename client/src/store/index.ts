import userReducer, { userActions } from './user';

import { configureStore, EnhancedStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { ThunkMiddlewareFor } from '@reduxjs/toolkit/src/getDefaultMiddleware';
import { AnyAction, combineReducers } from 'redux';

let store: EnhancedStore<any, AnyAction, [ThunkMiddlewareFor<any>]>;

const rootReducer = combineReducers({
  user: userReducer,
});

function createStore(initialState: any) {
  return configureStore({
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware()],
    preloadedState: initialState,
    devTools: process.env.NODE_ENV !== 'production',
  });
}

export const initializeStore = (initialState: any = {}) => {
  let _store = store ?? createStore(initialState);

  if (typeof window === 'undefined') return _store;

  if (!store) store = _store;

  return _store;
};

declare global {
  type RootState = ReturnType<typeof rootReducer>;
}

export { userActions };
