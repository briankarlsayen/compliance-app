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
interface IExpandProps {
  header: boolean;
  contact: boolean;
  pdfSettings: boolean;
  groups: boolean;
}

const LayoutDetails = (props: ITextFieldProps) => {
  const { name, inputField, value, setInputField } = props ?? {};
  const defaultExpandVal = {
    header: false,
    contact: false,
    pdfSettings: false,
    groups: false,
  };
  const [expand, setExpand] = useState<IExpandProps>(defaultExpandVal);
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

  const contactCheckbox = [
    {
      label: "Show Centre",
    },
    {
      label: "Show E-mail",
    },
    {
      label: "Show Room",
    },
    {
      label: "Show Address",
    },
    {
      label: "Show Name",
    },
    {
      label: "Show Phone",
    },
  ];

  const pdfSettingsCheckbox = [
    {
      label: "Show scoring",
    },
    {
      label: "Show all selectable answers",
    },
    {
      label: "Show charts",
    },
    {
      label: "Show tickets (based on user's profile)",
    },
    {
      label: "Show photos at the bottom of each group",
    },
    {
      label: "Hide question numbers",
    },
    {
      label: "Hide unanswered questions/groups",
    },
    {
      label: "Hide information panel questions",
    },
    {
      label: "Print PDF report in landscape mode",
    },
  ];

  const groupsRadioBtn = [
    {
      label: "Follow checklist template",
    },
    {
      label: "Show all (overide template setting)",
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
        <Grid container spacing={3}>
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
          <Grid item xs={12} md={12}>
            {/* <Box sx={{ py: 5 }}> */}
            <Grid container spacing={2} component={Paper}>
              <Grid
                item
                md={12}
                xs={12}
                style={{
                  backgroundColor: "#9e9e9e",
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
                  onClick={() =>
                    setExpand({ ...expand, header: !expand.header })
                  }
                >
                  {expand.header ? (
                    <ExpandLessOutlinedIcon />
                  ) : (
                    <ExpandMoreOutlinedIcon />
                  )}
                </Button>
              </Grid>
              {expand.header && (
                <Grid item xs={12} md={12}>
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
            {/* </Box> */}
          </Grid>
          <Grid item xs={12} md={12}>
            {/* <Box sx={{ py: 5 }}> */}
            <Grid container spacing={2} component={Paper}>
              <Grid
                item
                md={12}
                xs={12}
                style={{
                  backgroundColor: "#9e9e9e",
                  display: "flex",
                  justifyContent: "space-between",
                  paddingLeft: 5,
                  alignItems: "center",
                }}
              >
                <Typography style={{ color: "white", fontWeight: 500 }}>
                  {i18n.t("contact_details")}
                </Typography>
                <Button
                  style={{ color: "white" }}
                  onClick={() =>
                    setExpand({ ...expand, contact: !expand.contact })
                  }
                >
                  {expand.contact ? (
                    <ExpandLessOutlinedIcon />
                  ) : (
                    <ExpandMoreOutlinedIcon />
                  )}
                </Button>
              </Grid>
              {expand.contact && (
                <Grid item md={12}>
                  <Grid container>
                    {contactCheckbox?.map(({ label }) => (
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
            {/* </Box> */}
          </Grid>
          <Grid item xs={12} md={12}>
            <Grid container spacing={2} component={Paper}>
              <Grid
                item
                md={12}
                xs={12}
                style={{
                  backgroundColor: "#9e9e9e",
                  display: "flex",
                  justifyContent: "space-between",
                  paddingLeft: 5,
                  alignItems: "center",
                }}
              >
                <Typography style={{ color: "white", fontWeight: 500 }}>
                  {i18n.t("pdf_settings")}
                </Typography>
                <Button
                  style={{ color: "white" }}
                  onClick={() =>
                    setExpand({ ...expand, pdfSettings: !expand.pdfSettings })
                  }
                >
                  {expand.pdfSettings ? (
                    <ExpandLessOutlinedIcon />
                  ) : (
                    <ExpandMoreOutlinedIcon />
                  )}
                </Button>
              </Grid>
              {expand.pdfSettings && (
                <Grid item md={12}>
                  <Grid container>
                    {pdfSettingsCheckbox?.map(({ label }) => (
                      <Grid item xs={6} md={4}>
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
          </Grid>
          <Grid item xs={12} md={12}>
            <Grid container spacing={2} component={Paper}>
              <Grid
                item
                md={12}
                xs={12}
                style={{
                  backgroundColor: "#9e9e9e",
                  display: "flex",
                  justifyContent: "space-between",
                  paddingLeft: 5,
                  alignItems: "center",
                }}
              >
                <Typography style={{ color: "white", fontWeight: 500 }}>
                  {i18n.t("groups")}
                </Typography>
                <Button
                  style={{ color: "white" }}
                  onClick={() =>
                    setExpand({ ...expand, groups: !expand.groups })
                  }
                >
                  {expand.groups ? (
                    <ExpandLessOutlinedIcon />
                  ) : (
                    <ExpandMoreOutlinedIcon />
                  )}
                </Button>
              </Grid>
              {expand.groups && (
                <Grid item md={12}>
                  <Grid container>
                    {groupsRadioBtn?.map(({ label }) => (
                      <Grid item xs={6} md={6}>
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
