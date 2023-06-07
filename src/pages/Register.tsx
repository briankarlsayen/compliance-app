import React, { useEffect, useState } from "react";
import {
  TextField,
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  InputAdornment,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TablePagination,
  TableCell,
} from "@material-ui/core";
import Grid from "@mui/material/Grid";
import { Button, Paper, Typography } from "@mui/material";
import AutoComplete from "../common/AutoComplete";
import { grey, lightGreen } from "@material-ui/core/colors";
import { Search } from "@material-ui/icons";
import { i18n } from "../i18n";
import { fetchSurvey } from "../api/checklist";
import {
  Theme,
  ThemeProvider,
  createStyles,
  createTheme,
  makeStyles,
  withStyles,
  ThemeOptions,
} from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import blue from "@material-ui/core/colors/blue";
interface IRegister {
  centre: string;
  centreAlias: string;
  room: string;
  roomAlias: string;
  personType: string;
  people: string;
  checklistTemplate: string;
  creator: string;
  tag: string;
  createdDateRange: string;
  checklistDateRange: string;
}

interface IRegisterTblProps {
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

const greyTheme = createTheme({
  palette: {
    primary: {
      main: grey[500],
    },
  },
});

const useStyles = makeStyles({
  root: {
    "& .MuiTableCell-head": {
      color: "white",
      backgroundColor: "#223d79",
      padding: "1rem",
    },
  },
});

const buttonTheme = createTheme({
  palette: {
    primary: {
      main: lightGreen[600],
    },
  },
});

const blueTheme = createTheme({
  palette: {
    primary: {
      main: blue[500],
    },
  },
});

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: "white",
    },
    body: {
      fontSize: 14,
      verticalAlign: "top",
    },
  })
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
      height: "44px",
    },
  })
)(TableRow);

export default function Register() {
  const [inputField, setInputField] = useState<IRegister>({
    centre: "",
    centreAlias: "",
    room: "",
    roomAlias: "",
    personType: "",
    people: "",
    checklistTemplate: "",
    creator: "",
    tag: "",
    createdDateRange: "",
    checklistDateRange: "",
  });

  const updateField = (e: any) => {
    setInputField({
      ...inputField,
      [e.target.name]: e.target.value,
    });
  };
  // const centreList = [
  //     {
  //         id: 1,
  //         name: 'one',
  //     },
  //     {
  //         id: 2,
  //         name: 'two',
  //     },
  //     {
  //         id: 3,
  //         name: 'three',
  //     },
  // ]
  const centreList = ["all", "one", "two", "three"];
  const centreAliasList = ["all", "one", "two", "three"];
  const roomList = ["all", "one", "two", "three"];
  const roomAliasList = ["all", "one", "two", "three"];
  const personTypeList = ["all", "one", "two", "three"];
  const peopleList = ["all", "one", "two", "three"];
  const checklistTemplateList = ["all", "one", "two", "three"];
  const creatorList = ["all", "one", "two", "three"];
  const tagList = ["all", "one", "two", "three"];

  const classes = useStyles();

  const TableData = () => {
    return (
      <Box className={classes.root}>
        <RegistterTable />
      </Box>
    );
  };

  const RegistterTable = () => {
    function createData(
      centre: string,
      room: string,
      name: string,
      template: string,
      createdDate: string,
      creator: string,
      ticket: string,
      score: string,
      complete: boolean
    ) {
      return {
        centre,
        room,
        name,
        template,
        createdDate,
        creator,
        ticket,
        score,
        complete,
      };
    }

    const isServer = typeof window === "undefined";

    const processEnv: any = isServer ? process.env : {};

    const silentCheckUrl =
      processEnv?.REACT_APP_SILENT_CHECK_URL || "http://localhost:3000";
    const [registerList, setRegisterList] = useState<IRegisterTblProps[]>();
    const processRows = (data: IRegisterTblProps[]) => {
      const createdRows = data.map(
        ({
          centre,
          room,
          name,
          template,
          createdDate,
          creator,
          ticket,
          score,
          complete,
        }) => {
          return createData(
            centre,
            room,
            name,
            template,
            createdDate,
            creator,
            ticket,
            score,
            complete
          );
        }
      );
      setRegisterList(createdRows);
    };
    const DEFAULT_ROWS_PAGE = 10;
    const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PAGE);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
      try {
        setLoading(true);
        const list = [
          {
            centre: "Head Office",
            room: "new market",
            name: "Brian Sayen",
            template: "Yen Lumagbas",
            createdDate: "5/06/2023",
            creator: "Husband and Wife",
            ticket: "743",
            score: "0/6",
            complete: true,
          },
        ];
        setRegisterList(list);
        processRows(list);
        // processRows(mockData)
        setLoading(false);
      } catch (error) {
        console.log("failed to get register");
      }
    };

    useEffect(() => {
      fetchData();
    }, []);

    const handleChangePage = (
      event: React.MouseEvent<HTMLButtonElement> | null,
      newPage: number
    ) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      setRowsPerPage(parseInt(event.target.value));
      setPage(0);
    };

    const formatDate = (date: string) => {
      return new Date(date)
        .toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
        .split(" ")
        .join("-")
        .toUpperCase();
    };

    return (
      <>
        {registerList && (
          <TableContainer
            component={Paper}
            style={{ marginTop: "2rem", borderRadius: "5px" }}
          >
            <Table data-testid="survey-table" role="table" size="small">
              <TableHead>
                <TableRow role="rowheader">
                  <StyledTableCell role="columnheader">
                    <Typography style={{ fontWeight: "bold" }}>
                      {i18n.t("checklist_name")}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell role="columnheader">
                    <Typography style={{ fontWeight: "bold" }}>
                      {i18n.t("template")}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell role="columnheader" align="center">
                    <Typography style={{ fontWeight: "bold" }}>
                      {i18n.t("created_date")}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell role="columnheader">
                    <Typography style={{ fontWeight: "bold" }}>
                      {i18n.t("creator")}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell role="columnheader">
                    <Typography style={{ fontWeight: "bold" }}>
                      {i18n.t("centre")}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell role="columnheader">
                    <Typography style={{ fontWeight: "bold" }}>
                      {i18n.t("room")}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell role="columnheader">
                    <Typography style={{ fontWeight: "bold" }}>
                      {i18n.t("ticket")}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell role="columnheader">
                    <Typography style={{ fontWeight: "bold" }}>
                      {i18n.t("score")}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell role="columnheader">
                    <Typography style={{ fontWeight: "bold" }}>
                      {i18n.t("completed")}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell role="columnheader">
                    <Typography style={{ fontWeight: "bold" }}>
                      {i18n.t("actions")}
                    </Typography>
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {registerList &&
                  registerList
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map(
                      (
                        {
                          centre,
                          room,
                          name,
                          template,
                          createdDate,
                          creator,
                          ticket,
                          score,
                          complete,
                        },
                        index
                      ) => (
                        <StyledTableRow key={index}>
                          <StyledTableCell>
                            {/* <Link
                            to={`/checklists/surveys/${row.name}`}
                            style={{
                              textDecoration: "none",
                              color: "blue",
                            }}
                          >
                            asdasdasd
                          </Link> */}
                            {name}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {/* {formatDate(row.expiry_date)} */}
                            {template}
                          </StyledTableCell>
                          <StyledTableCell>{createdDate}</StyledTableCell>
                          <StyledTableCell>{creator}</StyledTableCell>
                          <StyledTableCell>{centre}</StyledTableCell>
                          <StyledTableCell>{room}</StyledTableCell>
                          <StyledTableCell>{ticket}</StyledTableCell>
                          <StyledTableCell>{score}</StyledTableCell>
                          <StyledTableCell>
                            {complete ? "True" : "False"}
                          </StyledTableCell>

                          <StyledTableCell>
                            <ThemeProvider theme={blueTheme}>
                              <Box style={{ display: "flex", gap: 5 }}>
                                <Button
                                  variant="outlined"
                                  color="primary"
                                  size="small"
                                  style={{ textTransform: "none" }}
                                >
                                  {i18n.t("edit")}
                                </Button>
                                <Button
                                  variant="outlined"
                                  color="primary"
                                  size="small"
                                  style={{ textTransform: "none" }}
                                >
                                  {i18n.t("delete")}
                                </Button>
                              </Box>
                            </ThemeProvider>
                          </StyledTableCell>
                        </StyledTableRow>
                      )
                    )}
              </TableBody>
            </Table>
            {registerList && (
              <TablePagination
                rowsPerPageOptions={[10, 25]}
                component="div"
                count={registerList?.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            )}
          </TableContainer>
        )}
        <Loading loading={loading} />
      </>
    );
  };

  return (
    <div>
      <Paper
        elevation={3}
        style={{
          padding: "2rem",
          marginTop: "2rem",
          marginBottom: "2rem",
        }}
      >
        <Box style={{ padding: "2rem" }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth size="small" variant="outlined">
                <InputLabel id="sched-for-label">Centre</InputLabel>
                <Select
                  label="Centre"
                  labelId="select-sched-for"
                  id="select-sched-for"
                  value={inputField.centre}
                  name="centre"
                  onChange={updateField}
                  variant="outlined"
                >
                  {centreList.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
                {/* <AutoComplete
                                    fieldLabel="to"
                                    itemKey="id"
                                    itemLabel="name"
                                    items={centreList}
                                    onChange={(_event: any, newValue: any) => {
                                        setInputField({
                                            ...inputField,
                                            centre: [...newValue],
                                        })
                                    }}
                                    // onChange={updateField}
                                    selectedItems={inputField.centre}
                                /> */}
              </FormControl>
              <FormControl fullWidth size="small" variant="outlined">
                <InputLabel id="sched-for-label">Room</InputLabel>
                <Select
                  label="Room"
                  labelId="select-sched-for"
                  id="select-sched-for"
                  value={inputField.room}
                  name="room"
                  onChange={updateField}
                  variant="outlined"
                >
                  {roomList.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth size="small" variant="outlined">
                <InputLabel id="sched-for-label">Checklist Template</InputLabel>
                <Select
                  label="Checklist Template"
                  labelId="select-sched-for"
                  id="select-sched-for"
                  value={inputField.checklistTemplate}
                  name="checklistTemplate"
                  onChange={updateField}
                  variant="outlined"
                >
                  {checklistTemplateList.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth size="small" variant="outlined">
                <InputLabel id="sched-for-label">Centre Alias</InputLabel>
                <Select
                  label="Centre"
                  labelId="select-sched-for"
                  id="select-sched-for"
                  value={inputField.centreAlias}
                  name="centre"
                  onChange={updateField}
                  variant="outlined"
                >
                  {centreAliasList.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth size="small" variant="outlined">
                <InputLabel id="sched-for-label">Room Alias</InputLabel>
                <Select
                  label="Room Alias"
                  labelId="select-sched-for"
                  id="select-sched-for"
                  value={inputField.roomAlias}
                  name="roomAlias"
                  onChange={updateField}
                  variant="outlined"
                >
                  {roomAliasList.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth size="small" variant="outlined">
                <InputLabel id="sched-for-label">Creator</InputLabel>
                <Select
                  label="Creator"
                  labelId="select-sched-for"
                  id="select-sched-for"
                  value={inputField.creator}
                  name="creator"
                  onChange={updateField}
                  variant="outlined"
                >
                  {creatorList.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth size="small" variant="outlined">
                <InputLabel id="sched-for-label">Created Date Range</InputLabel>
                <Select
                  label="Centre"
                  labelId="select-sched-for"
                  id="select-sched-for"
                  value={inputField.createdDateRange}
                  name="centre"
                  onChange={updateField}
                  variant="outlined"
                >
                  {centreAliasList.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth size="small" variant="outlined">
                <InputLabel id="sched-for-label">Person Types</InputLabel>
                <Select
                  label="Person Types"
                  labelId="select-sched-for"
                  id="select-sched-for"
                  value={inputField.personType}
                  name="centre"
                  onChange={updateField}
                  variant="outlined"
                >
                  {personTypeList.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth size="small" variant="outlined">
                <InputLabel id="sched-for-label">Tag</InputLabel>
                <Select
                  label="Tag"
                  labelId="select-sched-for"
                  id="select-sched-for"
                  value={inputField.tag}
                  name="tag"
                  onChange={updateField}
                  variant="outlined"
                >
                  {tagList.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth size="small" variant="outlined">
                <InputLabel id="sched-for-label">
                  Checklist Date Range
                </InputLabel>
                <Select
                  label="Checklist Date Range"
                  labelId="select-sched-for"
                  id="select-sched-for"
                  value={inputField.checklistDateRange}
                  name="centre"
                  onChange={updateField}
                  variant="outlined"
                >
                  {centreAliasList.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth size="small" variant="outlined">
                <InputLabel id="sched-for-label">People</InputLabel>
                <Select
                  label="People"
                  labelId="select-sched-for"
                  id="select-sched-for"
                  value={inputField.people}
                  name="people"
                  onChange={updateField}
                  variant="outlined"
                >
                  {peopleList.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Box style={{ display: "flex", float: "right" }}>
            <ThemeProvider theme={greyTheme}>
              <Button
                variant="contained"
                color="primary"
                style={{
                  color: "white",
                }}
                size="large"
                type="submit"
              >
                <Search fontSize="small" />
                <Typography style={{ fontWeight: "bold" }} variant="body2">
                  Search
                </Typography>
              </Button>
            </ThemeProvider>
          </Box>
        </Box>
        <TableData />
      </Paper>
    </div>
  );
}
