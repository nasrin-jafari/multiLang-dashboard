import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import settingsReducer from "./settingsSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, settingsReducer);

export const store = configureStore({
  reducer: {
    settings: persistedReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export const persistor = persistStore(store);
