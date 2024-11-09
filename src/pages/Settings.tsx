import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Box, Button, Card, TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { setUsername } from "../redux/settingsSlice.ts";
import ChangeLang from "../components/ChangeLang.tsx";
import ThemeToggleButton from "../components/ChangeTheme.tsx";
import { RootState } from "../redux/store.ts";

const Settings = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { username } = useSelector((state: RootState) => state.settings);
  const theme = useTheme();

  const usernameInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string>("");

  const handleButtonClick = () => {
    if (usernameInputRef.current) {
      const newUsername = usernameInputRef.current.value;
      if (!newUsername) {
        setError(t("usernameRequired"));
        return;
      }
      dispatch(setUsername(newUsername));
      setError("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleButtonClick();
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <Card
        sx={{
          padding: 2,
          background: theme.palette.grey[100],
          width: "600px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "250px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            justifyContent: "space-between",
            mb: 6,
          }}
        >
          <ChangeLang />
          <ThemeToggleButton />
        </Box>

        <Box
          sx={{ display: "flex", width: "100%", alignItems: "center", gap: 1 }}
        >
          <TextField
            label={t("username")}
            defaultValue={username}
            inputRef={usernameInputRef}
            variant="outlined"
            onKeyPress={handleKeyPress}
            type={"text"}
            sx={{ flex: 1 }}
            error={!!error}
            helperText={error && error}
          />
          <Button
            variant="contained"
            onClick={handleButtonClick}
            sx={{ mt: error ? "-22px" : "0" }}
          >
            {t("submit")}
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default Settings;
