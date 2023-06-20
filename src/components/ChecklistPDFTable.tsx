import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TablePagination,
  TableCell,
  Checkbox,
  Button,
} from "@material-ui/core";
import {
  Theme,
  ThemeProvider,
  createStyles,
  createTheme,
  makeStyles,
  withStyles,
} from "@material-ui/core/styles";
import { i18n } from "../i18n";

import { useHistory } from "react-router-dom";
import Loading from "./Loading";
import { FormControl } from "@mui/material";
import { blue, grey } from "@mui/material/colors";

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

const greyTheme = createTheme({
  palette: {
    primary: {
      main: grey[600],
    },
  },
});

interface IReportTable {
  id: number;
  centre: string;
  room: string;
  checklist_name: string;
  template: string;
}

interface ISelectInputProps {
  type?: number | null;
  centre: string;
  room: string;
}

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: "white",
    },
    body: {
      fontSize: 14,
      verticalAlign: "top",
      alignItems: "center",
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

const blueTheme = createTheme({
  palette: {
    primary: {
      main: blue[500],
    },
  },
});

interface IReportTableProps {
  checklist_name: string;
  template: string;
  centre: string;
  room: string;
}

interface IChecklistReportProps {
  reportDataTable: IReportTableProps[];
  loading: boolean;
  setAllSelected?: any;
}

export default function ChecklistPDFTable() {
  const classes = useStyles();
  const history = useHistory();
  const [reportTable, setReportTable] = useState<IReportTable[]>([]);
  const [loading, setLoading] = useState(false);

  const processRows = (data: IReportTable[]) => {
    const createdRows = data.map(
      ({ id, centre, room, checklist_name, template }) => {
        return createData(id, centre, room, checklist_name, template);
      }
    );
    setReportTable(createdRows);
  };

  function createData(
    id: number,
    centre: string,
    room: string,
    checklist_name: string,
    template: string
  ) {
    return {
      id,
      centre,
      room,
      checklist_name,
      template,
    };
  }

  const fetchData = async () => {
    const list = [
      {
        id: 1,
        checklist_name: "Juan Dela Cruz",
        template: "Conditional question",
        centre: "Co working",
        room: "Bloom Indoors",
      },
    ];
    try {
      setLoading(true);

      setReportTable(list);

      processRows(list);
      setLoading(false);
    } catch (error) {
      console.log("failed to get register");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const RegisterTable = ({
    reportDataTable,
    loading,
  }: IChecklistReportProps) => {
    const classes = useStyles();
    const DEFAULT_ROWS_PAGE = 10;
    const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PAGE);
    const [page, setPage] = useState(0);

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

    // * start
    const [selectedRows, setSelectedRows] = useState<number[]>([]);
    // const [selectedList, setSelectedList] = useState<IRegisterList[]>([]);
    const isAllSelected = selectedRows.length === reportDataTable.length;

    // useEffect(() => {
    //   setAllSelected(selectedList);
    // }, [selectedList]);

    const handleRowClick = (rowId: number, data: IReportTableProps) => {
      // const findSelectedIfExist = selectedList.findIndex(
      //   ({ id }) => id === data.id
      // );
      // let copySelectList = [...selectedList];
      // if (findSelectedIfExist >= 0) {
      //   copySelectList.splice(findSelectedIfExist, 1);
      //   setSelectedList(copySelectList);
      // } else {
      //   copySelectList.push(data);
      //   setSelectedList(copySelectList);
      // }

      const selectedIndex = selectedRows.indexOf(rowId);
      let newSelected: number[] = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selectedRows, rowId);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selectedRows.slice(1));
      } else if (selectedIndex === selectedRows.length - 1) {
        newSelected = newSelected.concat(selectedRows.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selectedRows.slice(0, selectedIndex),
          selectedRows.slice(selectedIndex + 1)
        );
      }

      setSelectedRows(newSelected);
    };
    const isSelected = (rowId: number) => selectedRows.indexOf(rowId) !== -1;
    const handleSelectAllClick = () => {
      if (isAllSelected) {
        // setSelectedList([]);
        setSelectedRows([]);
      } else {
        // setSelectedList(registerList);
        const allRowIds = reportDataTable.map((row, index) => index);
        setSelectedRows(allRowIds);
      }
    };

    return (
      <Box className={classes.root}>
        {reportDataTable && (
          <TableContainer component={Paper} style={{ borderRadius: "5px" }}>
            <Table data-testid="register-table" role="table" size="small">
              <TableHead>
                <TableRow role="rowheader">
                  <StyledTableCell role="columnheader" align="center">
                    <Checkbox
                      role="checkbox-header"
                      style={{ color: "white" }}
                      checked={selectedRows.length === reportDataTable.length}
                      onClick={handleSelectAllClick}
                    />
                  </StyledTableCell>
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
                      {i18n.t("actions")}
                    </Typography>
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reportDataTable &&
                  reportDataTable
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((data, index) => {
                      const { centre, room, checklist_name, template } = data;
                      return (
                        <StyledTableRow
                          role="row"
                          key={index}
                          hover
                          onClick={() => handleRowClick(index, data)}
                          selected={isSelected(index)}
                        >
                          <StyledTableCell
                            style={{
                              textAlignLast: "center",
                            }}
                          >
                            <ThemeProvider theme={blueTheme}>
                              <Box>
                                <FormControl>
                                  <Checkbox
                                    role="checkbox"
                                    color="primary"
                                    checked={isSelected(index)}
                                    inputProps={{
                                      // @ts-ignore
                                      "data-testid": "checkbox-component",
                                    }}
                                  />
                                </FormControl>
                              </Box>
                            </ThemeProvider>
                          </StyledTableCell>
                          <StyledTableCell>{checklist_name}</StyledTableCell>
                          <StyledTableCell>{template}</StyledTableCell>
                          <StyledTableCell>{centre}</StyledTableCell>
                          <StyledTableCell>{room}</StyledTableCell>
                          <StyledTableCell>
                            <ThemeProvider theme={blueTheme}>
                              <Box
                                style={{
                                  display: "flex",
                                  gap: 5,
                                }}
                              >
                                <Button
                                  variant="outlined"
                                  color="primary"
                                  size="small"
                                  style={{
                                    textTransform: "none",
                                  }}
                                >
                                  {i18n.t("print")}
                                </Button>
                              </Box>
                            </ThemeProvider>
                          </StyledTableCell>
                        </StyledTableRow>
                      );
                    })}
              </TableBody>
            </Table>
            {reportDataTable && (
              <TablePagination
                rowsPerPageOptions={[10, 25]}
                component="div"
                count={reportDataTable?.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            )}
          </TableContainer>
        )}
        <Loading loading={loading} />
      </Box>
    );
  };

  function backBtn() {
    return history.goBack();
  }
  return (
    <Box style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <RegisterTable loading={loading} reportDataTable={reportTable} />
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
              {i18n.t("cancel")}
            </Typography>
          </Button>
        </ThemeProvider>
        <ThemeProvider theme={blueTheme}>
          <Button variant="contained" color="primary" onClick={backBtn}>
            <Typography style={{ fontWeight: "bold" }} variant="body2">
              {i18n.t("print")}
            </Typography>
          </Button>
        </ThemeProvider>
      </Box>
    </Box>
  );
}
