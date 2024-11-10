import { forwardRef, Ref } from "react";
import { Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { InputAutoCompleteProps } from "../types/typeComponents.ts";

const CustomPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.grey[50],
  border: "1px solid #ccc",
  boxShadow: theme.shadows[1],
}));

const InputAutoComplete = forwardRef(
  (
    { options, placeholder, onChange }: InputAutoCompleteProps,
    ref: Ref<HTMLInputElement>,
  ) => {
    return (
      <Autocomplete
        disablePortal
        options={options}
        onChange={(_, newValue) => {
          onChange(newValue);
        }}
        PaperComponent={CustomPaper}
        renderInput={(params) => (
          <TextField {...params} label={placeholder} inputRef={ref} />
        )}
        sx={{ width: 250 }}
      />
    );
  },
);

export default InputAutoComplete;
