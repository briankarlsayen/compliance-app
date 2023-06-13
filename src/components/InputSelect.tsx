import React from "react";
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Typography,
} from "@material-ui/core";
import {
  ThemeProvider,
  makeStyles,
  createTheme,
} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: "20vw",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  select: {
    height: "10vh",
  },
  inputLabel: {
    fontSize: "4vh",
    alignSelf: "center",
  },
}));

interface InputSelectProps {
  inputField: any;
  setInputField: any;
  name: string;
  menu: MenuProps[];
  label: string;
  isObjectInput?: boolean;
  inputVal: any;
}

interface MenuProps {
  id: number;
  name: string;
}

export default function InputSelect(props: InputSelectProps) {
  const classes = useStyles();
  const {
    inputField,
    setInputField,
    name,
    menu,
    label,
    isObjectInput,
    inputVal,
  } = props;
  console.log("🚀 ~ file: InputSelect.tsx:49 ~ InputSelect ~ props:", props);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setInputField(isObjectInput ? { ...inputField, [name]: value } : value);
  };
  return (
    <FormControl variant="standard" className={classes.formControl}>
      <InputLabel>{label}</InputLabel>
      <Select
        value={inputVal}
        label={label}
        name={name}
        onChange={handleChange}
        MenuProps={{
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
          },
          transformOrigin: {
            vertical: "top",
            horizontal: "left",
          },
          getContentAnchorEl: null,
        }}
      >
        {menu.length > 0 &&
          menu.map(({ id, name }) => <MenuItem value={id}>{name}</MenuItem>)}

        {/* <MenuItem value="form">Form Templates</MenuItem>
        <MenuItem value="partner">Partner Provided Form Templates</MenuItem> */}
      </Select>
    </FormControl>
  );
}
