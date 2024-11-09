import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PersistGate } from "redux-persist/integration/react";
import Layout from "./components/Layout";
import "./i18n";
import ThemeRtlLayout from "./lib/settings/ThemeRtlLayout";
import { ThemeProviderComponent } from "./lib/theme/ThemeContext";
import Dashboard from "./pages/Home.tsx";
import Settings from "./pages/Settings.tsx";
import TodoList from "./pages/TodoList.tsx";
import Weather from "./pages/Weather.tsx";
import { persistor, store } from "./redux/store.ts";
function App() {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === "fa";

  const appContent = (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProviderComponent>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="todoList" element={<TodoList />} />
                <Route path="weather" element={<Weather />} />
                <Route path="settings" element={<Settings />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ThemeProviderComponent>
      </PersistGate>
    </Provider>
  );

  return (
    <Box
      sx={{
        "& .Toastify__toast-body": {
          fontFamily: "vazir",
          fontSize: "14px",
          textAlign: "justify",
          direction: "rtl",
        },
        "& .Toastify__toast": {
          flexDirection: "row-reverse",
        },
      }}
    >
      {isRtl ? <ThemeRtlLayout>{appContent}</ThemeRtlLayout> : appContent}

      <ToastContainer />
    </Box>
  );
}

export default App;
