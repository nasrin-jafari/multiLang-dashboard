import { Card, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { BsMoon, BsSun } from "react-icons/bs";
import { useThemeContext } from "../lib/theme/ThemeContext";
import CustomTooltip from "./CustomToolTip";
const ThemeToggleButton = () => {
  const { toggleTheme, isLightMode } = useThemeContext();
  const theme = useTheme();
  return (
    <CustomTooltip title="  ctrl + q تغییر پس زمینه">
      <Card
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100px",
          background : theme.palette.grey[100]
        }}
      >
        <IconButton
          aria-label={isLightMode ? "ligh-theme" : "dark-theme"}
          onClick={toggleTheme}
        >
          <BsMoon
            size={24}
            style={{
              color: isLightMode
                ? theme.palette.grey[200]
                : theme.palette.primary.main,
            }}
          />
        </IconButton>
        <IconButton
          aria-label={isLightMode ? "ligh-theme" : "dark-theme"}
          onClick={toggleTheme}
        >
          <BsSun
            size={24}
            style={{
              color: isLightMode
                ? theme.palette.primary.main
                : theme.palette.grey[200],
            }}
          />
        </IconButton>
      </Card>
    </CustomTooltip>
  );
};
export default ThemeToggleButton;
