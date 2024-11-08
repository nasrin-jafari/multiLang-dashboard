import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useTranslation } from "react-i18next";

const ChangeLang: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = React.useState(i18n.language);

  const handleChange = (event: SelectChangeEvent) => {
    const newLang = event.target.value;
    i18n.changeLanguage(newLang);
    localStorage.setItem("language", newLang);
    setLanguage(newLang);
    
  };

  return (
    <Box sx={{ width :'140px' }}>
      <InputLabel
        id="language-select-label"
        sx={{ fontSize: "0.8rem" }} // تنظیم اندازه فونت
      >
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
          sx={{ height: "32px" }} // تنظیم ارتفاع Select
        >
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="fa">فارسی</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default ChangeLang;
