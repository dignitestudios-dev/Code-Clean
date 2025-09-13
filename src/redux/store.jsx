import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth.slice";
import providerReducer from "./slices/provider.slice";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useReducer from "./slices/users.slice";
import chatReducer from "./slices/chat.slice";

const persistConfig = {
  key: "root",
  whitelist: ["auth", "events", "users", "provider", "chat"],
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  provider: providerReducer,
  user: useReducer,
  chat: chatReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
