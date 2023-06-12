import React, { useEffect, useState } from "react";
import {
  Typography,
  TextField,
  Box,
  Paper,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Button,
  InputAdornment,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TablePagination,
  TableCell,
  Checkbox,
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
import { blue } from "@material-ui/core/colors";
import { fetchReassignChecklist } from "../api/checklist";
import Loading from "../components/Loading";
i18n.initialise();

const useStyles = makeStyles({
  root: {
    "& .MuiFormControl-root": {
      marginTop: 0,
    },
  },
});

interface IReassign {
  label: string;
  centre: string;
  room: string;
  complete: boolean;
}

interface IReassignTblProps {
  reassignChecklist: IReassign[];
  loading: boolean;
}

export default function ChecklistReassign() {
  const classes = useStyles();
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
  const [reassignCheckList, setreassignCheckList] = useState<IReassign[]>([]);
  const [loading, setLoading] = useState(false);

  const processRows = (data: IReassign[]) => {
    const createdRows = data.map(
      ({
        centre,
        room,
        label,

        complete,
      }) => {
        return createData(
          centre,
          room,
          label,

          complete
        );
      }
    );
    setreassignCheckList(createdRows);
  };

  function createData(
    centre: string,
    room: string,
    label: string,

    complete: boolean
  ) {
    return {
      centre,
      room,
      label,

      complete,
    };
  }

  const fetchData = async () => {
    try {
      setLoading(true);
      const list = await fetchReassignChecklist();
      setreassignCheckList(list);

      processRows(list);
      setLoading(false);
    } catch (error) {
      console.log("failed to get reassign checlist");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const ReassignTable = ({ reassignChecklist, loading }: IReassignTblProps) => {
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
    const isAllSelected = selectedRows.length === reassignCheckList.length;

    const handleRowClick = (rowId: number) => {
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
        setSelectedRows([]);
      } else {
        const allRowIds = reassignCheckList.map((row, index) => index);
        setSelectedRows(allRowIds);
      }
    };
    return (
      <Box className={classes.root}>
        {reassignCheckList && (
          <TableContainer
            component={Paper}
            style={{ marginTop: "2rem", borderRadius: "5px" }}
          >
            <Table data-testid="register-table" role="table" size="small">
              <TableHead>
                <TableRow role="rowheader">
                  <StyledTableCell role="columnheader">
                    <Typography style={{ fontWeight: "bold" }}>
                      {i18n.t("label")}
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
                      {i18n.t("completed")}
                    </Typography>
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reassignCheckList &&
                  reassignCheckList
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map(
                      (
                        {
                          centre,
                          room,
                          label,

                          complete,
                        },
                        index
                      ) => (
                        <StyledTableRow
                          key={index}
                          hover
                          onClick={() => handleRowClick(index)}
                          selected={isSelected(index)}
                        >
                          <StyledTableCell
                            style={{
                              textDecoration: "none",
                              color: "blue",
                            }}
                          >
                            {label}
                          </StyledTableCell>

                          <StyledTableCell>{centre}</StyledTableCell>
                          <StyledTableCell>{room}</StyledTableCell>

                          <StyledTableCell>
                            {complete ? "True" : "False"}
                          </StyledTableCell>
                        </StyledTableRow>
                      )
                    )}
              </TableBody>
            </Table>
            {reassignCheckList && (
              <TablePagination
                rowsPerPageOptions={[10, 25]}
                component="div"
                count={reassignCheckList?.length}
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

  return (
    <React.Fragment>
      <Paper
        className={classes.root}
        elevation={3}
        style={{
          padding: "2rem",
          marginTop: "2rem",
          marginBottom: "2rem",
        }}
      >
        <Typography style={{ fontWeight: "bold", paddingBottom: "1rem" }}>
          {i18n.t("reassign_checklist")}
        </Typography>
        <ReassignTable
          reassignChecklist={reassignCheckList}
          loading={loading}
        />
      </Paper>
    </React.Fragment>
  );
}
