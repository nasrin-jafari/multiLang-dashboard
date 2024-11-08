import {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
  ReactNode,
} from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { lightTheme, darkTheme } from "./Theme";

interface ThemeContextProps {
  isLightMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProviderComponent = ({
  children,
}: {
  children: ReactNode;
}) => {
  const savedThemeMode = localStorage.getItem("theme");
  const [isLightMode, setIsLightMode] = useState(
    savedThemeMode === "light" || !savedThemeMode
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        (event.ctrlKey && event.key.toLowerCase() === "q") ||
        event.key === "ض"
      ) {
        toggleTheme();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const toggleTheme = () => {
    setIsLightMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("theme", newMode ? "light" : "dark");
      return newMode;
    });
  };

  const theme = useMemo(
    () => (isLightMode ? lightTheme : darkTheme),
    [isLightMode]
  );

  return (
    <ThemeContext.Provider value={{ isLightMode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error(
      "useThemeContext must be used within a ThemeProviderComponent"
    );
  }
  return context;
};
