import React from "react";
import {
  ThemeProvider,
  createTheme,
  makeStyles,
} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import grey from "@material-ui/core/colors/grey";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import lightGreen from "@material-ui/core/colors/lightGreen";

export default function CheckLists() {
  return <CenteredTabs />;
}

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  tabs: {
    background: grey[100],
  },
  tab: {
    margin: "2rem",
  },
});

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const buttonTheme = createTheme({
  palette: {
    primary: {
      main: lightGreen[600],
    },
  },
});

function ChecklistTemplates() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        marginTop: "3rem",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <Typography style={{ fontWeight: "bold" }}>
          Checklist Templates
        </Typography>
        <Typography>&nbsp;/ Health & Safety</Typography>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
      >
        <Typography variant="caption">
          Create new checklist template in this folder:
        </Typography>
        <div>
          <ThemeProvider theme={buttonTheme}>
            <Button
              variant="contained"
              color="primary"
              style={{
                color: "white",
              }}
            >
              <AddIcon fontSize="small" />
              <Typography style={{ fontWeight: "bold" }} variant="body2">
                NEW TEMPLATE
              </Typography>
            </Button>
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
}

function CenteredTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Paper className={classes.root}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
          className={classes.tabs}
        >
          <Tab label="Checklist Templates" {...a11yProps(0)} />
          <Tab label="To-Do List" {...a11yProps(1)} />
          <Tab label="Schedules & Surveys" {...a11yProps(2)} />
          <Tab label="Register" {...a11yProps(3)} />
          <Tab label="Settings" {...a11yProps(4)} />
        </Tabs>
      </Paper>
      <Paper className={classes.tab}>
        <TabPanel value={value} index={0}>
          <ChecklistTemplates />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Typography>To-Do List</Typography>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Typography>Schedules & Surveys</Typography>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Typography>Register</Typography>
        </TabPanel>
        <TabPanel value={value} index={4}>
          <Typography>Settings</Typography>
        </TabPanel>
      </Paper>
    </>
  );
}
