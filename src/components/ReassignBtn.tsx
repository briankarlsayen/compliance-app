import React, { useEffect, useState } from "react";
import { Typography, Box, Paper, Button } from "@material-ui/core";

import {
  Theme,
  ThemeProvider,
  createTheme,
  makeStyles,
  withStyles,
} from "@material-ui/core/styles";
import { i18n } from "../i18n";
import { blue, grey } from "@material-ui/core/colors";

import { useHistory } from "react-router-dom";
import Select from "../common/Select";
i18n.initialise();

const useStyles = makeStyles({
  root: {
    "& .MuiTableCell-head": {
      color: "white",
      backgroundColor: "#223d79",
      paddingTop: "1rem",
      paddingBottom: "1rem",
    },
    "& .MuiTableRow-root.Mui-selected": {
      backgroundColor: "#E3EEFA",
    },
  },
  customDatePicker: {
    height: "2.5rem",
  },
});

interface IReassign {
  id: number;
  centre: string;
  room: string;
  name: string;
  template: string;
  createdDate: string;
  creator: string;
  ticket: string;
  score: string;
  complete: boolean;
}

const blueTheme = createTheme({
  palette: {
    primary: {
      main: blue[500],
    },
  },
});

const greyTheme = createTheme({
  palette: {
    primary: {
      main: grey[600],
    },
  },
});

export default function ReassignBtn({}) {
  const classes = useStyles();
  const history = useHistory<IReassign[]>();
  function backBtn() {
    return history.goBack();
  }
  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "end",
        gap: 5,
      }}
    >
      <ThemeProvider theme={greyTheme}>
        <Button variant="contained" color="primary" onClick={backBtn}>
          <Typography style={{ fontWeight: "bold" }} variant="body2">
            {i18n.t("back")}
          </Typography>
        </Button>
      </ThemeProvider>
      <ThemeProvider theme={blueTheme}>
        <Button variant="contained" color="primary" onClick={backBtn}>
          <Typography style={{ fontWeight: "bold" }} variant="body2">
            {i18n.t("reassign")}
          </Typography>
        </Button>
      </ThemeProvider>
    </Box>
  );
}
