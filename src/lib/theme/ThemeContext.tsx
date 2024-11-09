import {
  createContext,
  useContext,
  useEffect,
  ReactNode,
  useMemo,
} from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { lightTheme, darkTheme } from "./Theme";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLightMode, toggleTheme } from "../../redux/settingsSlice.ts";
import { RootState } from "../../redux/store.ts";

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
  const dispatch = useDispatch();
  const isLightMode = useSelector((state: RootState) =>
    selectIsLightMode(state),
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        (event.ctrlKey && event.key.toLowerCase() === "q") ||
        event.key === "ض"
      ) {
        dispatch(toggleTheme());
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [dispatch]);

  const theme = useMemo(
    () => (isLightMode ? lightTheme : darkTheme),
    [isLightMode],
  );

  return (
    <ThemeContext.Provider
      value={{ isLightMode, toggleTheme: () => dispatch(toggleTheme()) }}
    >
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
      "useThemeContext must be used within a ThemeProviderComponent",
    );
  }
  return context;
};
