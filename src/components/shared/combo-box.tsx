import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { ISelectModel } from "./models/select-model";

export default function ComboBox({
  options,
  onChangeValue,
}: {
  options: ISelectModel[];
  onChangeValue: any;
}) {
  function _onChangeValue(value: ISelectModel | null) {
    onChangeValue(value);
  }
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={options}
      sx={{ width: 300 }}
      onChange={(event, value) => _onChangeValue(value)}
      renderInput={(params) => (
        <TextField {...params} label="Select Exchange" />
      )}
    />
  );
}
