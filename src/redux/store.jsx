import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth.slice";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useReducer from "./slices/users.slice";
import providerSlice from "./slices/provider.slice";


const persistConfig = {
  key: "root",
  whitelist: ["auth", "events", "users","provider"],
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  provider: providerSlice,
  user: useReducer,
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
