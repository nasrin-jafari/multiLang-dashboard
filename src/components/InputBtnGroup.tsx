import { Box, Button, TextField } from "@mui/material";
import React, { forwardRef, Ref } from "react";

interface InputBtnGroupProps {
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
  type?: "text" | "number" | "password";
  textBtn: string;
}

const InputBtnGroup = forwardRef(
  (
    {
      placeholder,
      onChange,
      onClick,
      type = "text",
      textBtn,
    }: InputBtnGroupProps,
    ref: Ref<HTMLInputElement>,
  ) => {
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        onClick();
      }
    };

    return (
      <Box
        sx={{ display: "flex", width: "100%", alignItems: "center", gap: 1 }}
      >
        <TextField
          label={placeholder}
          variant="outlined"
          inputRef={ref}
          onChange={onChange}
          onKeyPress={handleKeyPress}
          type={type}
          sx={{ flex: 1 }}
        />

        <Button type="button" variant="contained" onClick={onClick}>
          {textBtn}
        </Button>
      </Box>
    );
  },
);

export default InputBtnGroup;
