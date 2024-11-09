import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ThemeRtlLayout from "./lib/settings/ThemeRtlLayout";
import { ThemeProviderComponent } from "./lib/theme/ThemeContext";
import "./i18n";
import { useTranslation } from "react-i18next";
import Dashboard from "./pages/Home.tsx";
import TodoList from "./pages/TodoList.tsx";
import Weather from "./pages/Weather.tsx";
import Settings from "./pages/Settings.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { Box } from "@mui/material";
import { persistor, store } from "./redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";
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
