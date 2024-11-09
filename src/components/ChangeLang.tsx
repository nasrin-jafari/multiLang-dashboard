import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../redux/settingsSlice.ts";
import { RootState } from "../redux/store.ts";
import { useTheme } from "@mui/material/styles";

const ChangeLang: React.FC = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const language = useSelector((state: RootState) => state.settings.language);
  const theme = useTheme();

  const handleChange = (event: SelectChangeEvent) => {
    const newLang = event.target.value;
    i18n.changeLanguage(newLang);
    dispatch(setLanguage(newLang));
  };

  return (
    <Box sx={{ width: "140px" }}>
      <InputLabel id="language-select-label" sx={{ fontSize: "0.8rem" }}>
        {t("toggleLanguage")}
      </InputLabel>
      <FormControl
        fullWidth
        sx={{
          "& .MuiSelect-select": {
            height: "32px",
            display: "flex",
            alignItems: "center",
          },
        }}
      >
        <Select
          labelId="language-select-label"
          id="language-select"
          value={language}
          label={t("toggleLanguage")}
          onChange={handleChange}
          sx={{ height: "32px" }}
          MenuProps={{
            PaperProps: {
              sx: {
                backgroundColor: theme.palette.grey[50],
                "& .MuiMenuItem-root": {
                  "&:hover": {
                    backgroundColor: theme.palette.grey[100],
                  },
                  "&.Mui-selected": {
                    backgroundColor: theme.palette.primary.main,
                    "&:hover": {
                      backgroundColor: theme.palette.primary.main,
                    },
                  },
                },
              },
            },
          }}
        >
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="fa">فارسی</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default ChangeLang;
