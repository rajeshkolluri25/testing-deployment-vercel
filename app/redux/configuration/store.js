import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import createWebStorage from "redux-persist/es/storage/createWebStorage";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userApi } from "../authentication";
import authUserSlice from "../authentication/authUserSlice";
import storageSlice from "../storage/storageSlice";
import { propertyApi } from "../property";
import { changePasswordRequestApi } from "../authentication/changePasswordSlice";

export function createPersistStore() {
  const isServer = typeof window === "undefined";
  if (isServer) {
    return {
      getItem() {
        return Promise.resolve(null);
      },
      setItem() {
        return Promise.resolve();
      },
      removeItem() {
        return Promise.resolve();
      },
    };
  }
  return createWebStorage("local");
}
const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createPersistStore();

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["authUser", "stateStorage", "validatingOtp"],
};

const rootReducer = combineReducers({
  [userApi.reducerPath]: userApi.reducer,
  authUser: authUserSlice,
  stateStorage: storageSlice,
  [propertyApi.reducerPath]: propertyApi.reducer,
  [changePasswordRequestApi.reducerPath]: changePasswordRequestApi.reducer,
});
const middlewares = [
  userApi.middleware,
  propertyApi.middleware,
  changePasswordRequestApi.middleware,
];
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([...middlewares]),
});

setupListeners(store.dispatch);
export const persistor = persistStore(store);
