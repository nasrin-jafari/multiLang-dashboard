import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store.ts";
import { useTheme } from "@mui/material/styles";
import ChangeUserName from "../components/changeUserName.tsx";
const getIranTime = () => {
  const date = new Date();
  const iranTime = new Date(
    date.toLocaleString("en-US", { timeZone: "Asia/Tehran" })
  );
  return iranTime;
};

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const [currentTime, setCurrentTime] = useState(getIranTime());
  const greetings = {
    morning: t("Welcome.morning"),
    afternoon: t("Welcome.afternoon"),
    evening: t("Welcome.evening"),
  };

  const getGreetingMessage = (hour: number) => {
    if (hour < 12) {
      return greetings.morning;
    } else if (hour < 18) {
      return greetings.afternoon;
    } else {
      return greetings.evening;
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getIranTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const hours = currentTime.getHours();
  const greeting = getGreetingMessage(hours);
  const { username } = useSelector((state: RootState) => state.settings);
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <ChangeUserName />
      <Typography
        variant="h1"
        component="h1"
        sx={{
          fontSize: "6rem",
          fontWeight: "bold",
          color: theme.palette.primary.main,
        }}
      >
        {currentTime.toLocaleTimeString("fa-IR")}
      </Typography>
      <Typography variant="h1" component="h2" sx={{ fontSize: "2rem" }}>
        {greeting} <span>{username ? `${username}!` : `${t("Guest")}!`}</span>
      </Typography>
    </Box>
  );
};

export default Dashboard;
