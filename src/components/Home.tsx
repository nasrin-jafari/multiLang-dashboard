import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

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

  return (
    <Box sx={{display :"flex" ,flexDirection :"column", justifyContent :"center" , alignItems :"center" , height :"100%"}}>
      <Typography variant="h1" component="h1" sx={{fontSize :"2.5rem" , fontWeight :"bold"}}>{currentTime.toLocaleTimeString("fa-IR")}</Typography>
      <Typography  variant="h1" component="h2" sx={{fontSize :"2rem"}}>{greeting}</Typography>
    </Box>
  );
};

export default Dashboard;