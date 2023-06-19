import React, { Dispatch, SetStateAction, useState } from "react";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import { i18n } from "../i18n";
import {
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TablePagination,
  TableCell,
  Checkbox,
  Button,
  Paper,
  Typography,
  FormControl,
  Grid,
  TextField,
} from "@material-ui/core";
import {
  Theme,
  ThemeProvider,
  createStyles,
  createTheme,
  makeStyles,
  withStyles,
} from "@material-ui/core/styles";
import Select from "../common/Select";
import { FormControlLabel } from "@mui/material";

interface IChecklistPDFReportProps {
  logo: string;
  layout: string;
  name: string;
  title: string;
}

export default function ChecklistPDFReport() {
  const defaultVal = {
    logo: "",
    layout: "",
    name: "",
    title: "",
  };

  const [inputField, setInputField] =
    useState<IChecklistPDFReportProps>(defaultVal);
  console.log(
    "🚀 ~ file: ChecklistPDFReport.tsx:46 ~ ChecklistPDFReport ~ inputField:",
    inputField
  );
  const CustomReport = () => {
    const logoPropsContainer = {
      id: "logo",
      value: inputField.logo!,
      itemValueKey: "id",
      items: [
        {
          id: 1,
          name: "No Logo",
        },
        {
          id: 2,
          name: "With Logo",
        },
      ],
      onChange: (e: any) => setInputField({ ...inputField, logo: e.id }),
      itemLabelKey: "name",
    };

    const layoutPropsContainer = {
      id: "layout",
      value: inputField.layout!,
      itemValueKey: "id",
      items: [
        {
          id: 1,
          name: "Select Layout",
        },
        {
          id: 2,
          name: "Sample Layout",
        },
      ],
      onChange: (e: any) => setInputField({ ...inputField, layout: e.id }),
      itemLabelKey: "name",
    };
    return (
      <Paper
        elevation={3}
        style={{
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: 10,
          // marginBottom: "2rem",
        }}
      >
        <Typography> {i18n.t("custom_report")}</Typography>
        <Box style={{ padding: "1rem" }}>
          <Grid container>
            <Grid item xs={12} md={6}>
              <Grid container>
                <Grid
                  item
                  xs={4}
                  md={4}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  {i18n.t("logo")}
                </Grid>
                <Grid item xs={8} md={8}>
                  <Select {...logoPropsContainer} />
                </Grid>
                <Grid
                  item
                  xs={4}
                  md={4}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  {i18n.t("layout")}
                </Grid>
                <Grid item xs={8} md={8}>
                  <Select {...layoutPropsContainer} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    );
  };
  const namePropsContainer = {
    name: "name",
    inputField: inputField,
    setInputField,
    value: inputField.name,
  };

  return (
    <Box style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <CustomReport />
      <LayoutDetails {...namePropsContainer} />
    </Box>
  );
}

interface ITextFieldProps {
  name: string;
  value: any;
  inputField: IChecklistPDFReportProps;
  setInputField: Dispatch<SetStateAction<IChecklistPDFReportProps>>;
}

const LayoutDetails = (props: ITextFieldProps) => {
  const { name, inputField, value, setInputField } = props ?? {};
  const [expandHeader, setExpandHeader] = useState<boolean>(false);
  const namePropsContainer = {
    name: "name",
    inputField: inputField,
    setInputField,
    value: inputField.name,
  };

  const titlePropsContainer = {
    id: "title",
    value: inputField.title!,
    itemValueKey: "id",
    items: [
      {
        id: 1,
        name: "Select Title",
      },
      {
        id: 2,
        name: "Sample Title",
      },
    ],
    onChange: (e: any) => setInputField({ ...inputField, title: e.id }),
    itemLabelKey: "name",
  };

  const headerCheckBox = [
    {
      label: "Show Name",
    },
    {
      label: "Show Due Date",
    },
    {
      label: "Show Creator",
    },
    {
      label: "Show Template",
    },
    {
      label: "Show Creation Date",
    },
    {
      label: "Show Version",
    },
  ];
  return (
    <Paper
      elevation={3}
      style={{
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        // marginBottom: "2rem",
      }}
    >
      <Typography> {i18n.t("layout_details")}</Typography>
      <Box style={{ padding: "1rem" }}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Grid container>
              <Grid
                item
                xs={4}
                md={4}
                style={{ display: "flex", alignItems: "center" }}
              >
                {i18n.t("checklist_name")}
              </Grid>
              <Grid item xs={8} md={8}>
                <OutlinedTextField {...namePropsContainer} />
              </Grid>
              <Grid
                item
                xs={4}
                md={4}
                style={{ display: "flex", alignItems: "center" }}
              >
                {i18n.t("title")}
              </Grid>
              <Grid item xs={8} md={8}>
                <Select {...titlePropsContainer} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={12}>
            <Box sx={{ py: 5 }}>
              <Grid container spacing={2} component={Paper}>
                <Grid
                  item
                  md={12}
                  style={{
                    backgroundColor: "#223D79",
                    display: "flex",
                    justifyContent: "space-between",
                    paddingLeft: 5,
                    alignItems: "center",
                  }}
                >
                  <Typography style={{ color: "white", fontWeight: 500 }}>
                    {i18n.t("header")}
                  </Typography>
                  <Button
                    style={{ color: "white" }}
                    onClick={() => setExpandHeader(!expandHeader)}
                  >
                    {expandHeader ? (
                      <ExpandLessOutlinedIcon />
                    ) : (
                      <ExpandMoreOutlinedIcon />
                    )}
                  </Button>
                </Grid>
                {expandHeader && (
                  <Grid item md={12}>
                    <Grid container>
                      {headerCheckBox?.map(({ label }) => (
                        <Grid item md={6}>
                          <FormControlLabel
                            control={<Checkbox name="showName" />}
                            label={label}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                )}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

const OutlinedTextField = (props: ITextFieldProps) => {
  const { name, inputField, value, setInputField } = props ?? {};
  return (
    <TextField
      // required
      id={name}
      name={name}
      // label="name"
      fullWidth
      size="small"
      variant="outlined"
      value={value}
      onChange={
        (e: any) => {
          setInputField({ ...inputField, [name]: e.target.value });
        }

        // console.log(e.target.value)
      }
    />
  );
};
