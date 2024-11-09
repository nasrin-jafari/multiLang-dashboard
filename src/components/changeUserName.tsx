import { useEffect, useState } from "react";
import CustomModal from "./CustomModal";
import { Box, Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useTranslation } from "react-i18next";

const ChangeUserName = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { username } = useSelector((state: RootState) => state.settings);
  const { t } = useTranslation();

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");

    if (!hasVisited && !username && location.pathname !== "/settings") {
      setOpen(true);
      localStorage.setItem("hasVisited", "true");
    }
  }, [username, location]);

  const handleRedirectToSetting = () => {
    navigate("/settings");
  };

  return (
    <div>
      <CustomModal
        open={open}
        title={t("registerUserName")}
        onClose={() => {
          setOpen(false);
        }}
        content={
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p>{t("changeUserName")}</p>
            <Button variant="contained" onClick={handleRedirectToSetting}>
              {t("redirectToSettings")}
            </Button>
          </Box>
        }
      />
    </div>
  );
};

export default ChangeUserName;
