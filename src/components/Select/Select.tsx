import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { TypeExploit } from "../../utils/enums/TypeExploit";
import { SelectType } from "../../utils/enums/TypeSelect";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers/RootReducer";
import { AccessTypes } from "../../utils/enums/AccessTypes";
interface selectProps {
  handleChange: (event: SelectChangeEvent) => void;
  label: SelectType;
}

export default function BasicSelect({ handleChange, label }: selectProps) {
  const draftHostState = useSelector(
    (state: RootState) => state.hosts.draftHosts
  );

  const renderMenuItem = (type: SelectType) => {
    if (type === SelectType.TypeExploit) {
      return (
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label={label}
          onChange={selectChange}
        >
          <MenuItem value={TypeExploit.localExploit}>
            {TypeExploit.localExploit}
          </MenuItem>
          <MenuItem value={TypeExploit.remoteExploit}>
            {TypeExploit.remoteExploit}
          </MenuItem>
        </Select>
      );
    }

    if (type === SelectType.FileServerNode) {
      return (
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label={label}
          onChange={selectChange}
        >
          {draftHostState.map((host) => {
            if (!host.IsRouter && !host.IsSwitch) {
              return (
                <MenuItem value={host.label.text}>{host.label.text}</MenuItem>
              );
            }
            return null;
          })}
        </Select>
      );
    }

    if (type === SelectType.ClientNode) {
      return (
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label={label}
          onChange={selectChange}
        >
          {draftHostState.map((host) => {
            if (!host.IsRouter && !host.IsSwitch) {
              return (
                <MenuItem value={host.label.text}>{host.label.text}</MenuItem>
              );
            }
            return null;
          })}
        </Select>
      );
    }

    if (type === SelectType.AccessType) {
      return (
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label={label}
          onChange={selectChange}
        >
          <MenuItem value={AccessTypes.Access}>{AccessTypes.Access}</MenuItem>
          <MenuItem value={AccessTypes.read}>{AccessTypes.read}</MenuItem>
          <MenuItem value={AccessTypes.write}>{AccessTypes.write}</MenuItem>
        </Select>
      );
    }
  };

  const selectChange = (e: SelectChangeEvent) => {
    setValue(e.target.value as TypeExploit);
    handleChange(e);
  };

  const [value, setValue] = React.useState<TypeExploit | string>(
    TypeExploit.localExploit
  );

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        {renderMenuItem(label)}
      </FormControl>
    </Box>
  );
}
