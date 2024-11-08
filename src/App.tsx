import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ThemeRtlLayout from "./lib/settings/ThemeRtlLayout";
import { ThemeProviderComponent } from "./lib/theme/ThemeContext";
import './i18n'; 
import { useTranslation } from 'react-i18next';
import Dashboard from "./components/Home";
import TodoList from "./components/TodoList"; // فرض کنید این کامپوننت را دارید
import Weather from "./components/Weather"; // فرض کنید این کامپوننت را دارید
import Settings from "./components/Settings"; // فرض کنید این کامپوننت را دارید

function App() {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === 'fa';

  const appContent = (
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
  );

  return (
    <>
      {isRtl ? (
        <ThemeRtlLayout>{appContent}</ThemeRtlLayout>
      ) : (
        appContent
      )}
    </>
  );
}

export default App;