import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SettingsState {
  language: string;
  username: string;
  isLightMode: boolean;
}

const initialState: SettingsState = {
  language: "en",
  username: "",
  isLightMode: true,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<string>) {
      state.language = action.payload;
    },
    setUsername(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
    toggleTheme(state) {
      state.isLightMode = !state.isLightMode;
    },
  },
});

export const selectLanguage = (state: { settings: SettingsState }) =>
  state.settings.language;

export const selectIsLightMode = (state: { settings: SettingsState }) =>
  state.settings.isLightMode;

export const { setLanguage, setUsername, toggleTheme } = settingsSlice.actions;
export default settingsSlice.reducer;
