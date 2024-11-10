import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { IoCloseSharp } from "react-icons/io5";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { CustomModalProps } from "../types/typeComponents.ts";

const CustomModal: React.FC<CustomModalProps> = ({
  open,
  title,
  content,
  onConfirm,
  onClose,
  type,
  maxWidth,
}) => {
  const theme = useTheme();
  const { t, i18n } = useTranslation();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      style={{
        direction: i18n.language === "en" ? "ltr" : "rtl",
        backgroundColor: "rgba(6, 70, 93, 0.2)",
      }}
      maxWidth={maxWidth ? maxWidth : "sm"}
      PaperProps={{
        sx: {
          borderRadius: "20px",
          padding: "20px",
          background: theme.palette.grey[100],
          textAlign: "justify",
          boxShadow: 4,
          width: "100%",
        },
      }}
    >
      <DialogActions>
        <Button onClick={onClose} sx={{ padding: "5px", fontSize: "24px" }}>
          <IoCloseSharp style={{ color: theme.palette.primary.main }} />
        </Button>
      </DialogActions>
      <DialogTitle sx={{ display: "flex", justifyContent: "center" }}>
        {title}
      </DialogTitle>
      <DialogContent sx={{ padding: "10px" }}>{content}</DialogContent>
      <Button
        onClick={onClose}
        sx={{ padding: "5px", fontSize: "24px" }}
      ></Button>
      {type === "delete" && (
        <DialogActions>
          <Button
            onClick={onClose}
            variant="contained"
            color="error"
            sx={{ marginRight: "8px" }}
          >
            {t("noQuestion")}
          </Button>
          <Button
            onClick={onConfirm}
            variant="contained"
            color="success"
            sx={{ marginRight: "8px" }}
          >
            {t("yesQuestion")}
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default CustomModal;
