import React from 'react';
import {
  TableContainer,
  Table,
  Button,
  Paper,
  TableHead,
  TableRow,
  Typography,
  TableBody,
  Menu,
  MenuItem,
  TablePagination,
  TableCell,
  Box,
} from '@material-ui/core';
import {
  Theme,
  ThemeProvider,
  createStyles,
  createTheme,
  makeStyles,
  withStyles,
} from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import { red, blue, lightGreen } from '@material-ui/core/colors';

interface IChecklist {
  name: string;
  start_date: string;
  show_over_due: string;
  sched_freq: string;
  for_user: string;
}

interface IScheduleData {
  name: string;
  start_date: string;
  show_over_due: string;
  sched_freq: string;
  for_user: string;
}

const Schedules = () => {
  return (
    <Box style={{ padding: '4rem' }}>
      <ScheduleHeader />
      <ScheduleTable />
    </Box>
  );
};

const buttonTheme = createTheme({
  palette: {
    primary: {
      main: lightGreen[600],
    },
  },
});

const ScheduleHeader = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        marginTop: '3rem',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Typography style={{ fontWeight: 'bold' }}>
          Checklist Templates
        </Typography>
        <Typography>&nbsp;/ Schedules</Typography>
      </div>
    </div>
  );
};

const ScheduleTable = () => {
  const mockData: IScheduleData[] = [
    {
      name: 'Documentation 1',
      start_date: '04-24-2023',
      show_over_due: '04-26-2023',
      sched_freq: 'daily',
      for_user: 'Ben',
    },
    {
      name: 'Documentation 2',
      start_date: '01-04-2023',
      show_over_due: '02-07-2023',
      sched_freq: 'monthly',
      for_user: 'Ben',
    },
    {
      name: 'Documentation 3',
      start_date: '05-11-2023',
      show_over_due: '06-12-2023',
      sched_freq: 'yearly',
      for_user: 'Ben',
    },
    {
      name: 'Documentation 4',
      start_date: '04-24-2023',
      show_over_due: '04-26-2023',
      sched_freq: 'daily',
      for_user: 'Ben',
    },
    {
      name: 'Documentation 5',
      start_date: '05-14-2023',
      show_over_due: '04-26-2023',
      sched_freq: 'monthly',
      for_user: 'Ben',
    },
    {
      name: 'Documentation 6',
      start_date: '01-21-2023',
      show_over_due: '04-26-2023',
      sched_freq: 'daily',
      for_user: 'Ben',
    },
    {
      name: 'Documentation 7',
      start_date: '04-24-2023',
      show_over_due: '04-26-2023',
      sched_freq: 'monthly',
      for_user: 'Ben',
    },
    {
      name: 'Documentation 8',
      start_date: '01-24-2023',
      show_over_due: '08-26-2023',
      sched_freq: 'monthly',
      for_user: 'Ben',
    },
    {
      name: 'Documentation 9',
      start_date: '03-24-2023',
      show_over_due: '09-26-2023',
      sched_freq: 'yearly',
      for_user: 'Ben',
    },
    {
      name: 'Documentation 10',
      start_date: '04-24-2023',
      show_over_due: '06-26-2023',
      sched_freq: 'monthly',
      for_user: 'Ben',
    },
    {
      name: 'Documentation 11',
      start_date: '01-24-2023',
      show_over_due: '02-26-2023',
      sched_freq: 'yearly',
      for_user: 'Ben',
    },
    {
      name: 'Documentation 12',
      start_date: '01-14-2023',
      show_over_due: '04-26-2023',
      sched_freq: 'monthly',
      for_user: 'Ben',
    },
    {
      name: 'Documentation 13',
      start_date: '04-04-2023',
      show_over_due: '04-11-2023',
      sched_freq: 'yearly',
      for_user: 'Ben',
    },
    {
      name: 'Documentation 14',
      start_date: '04-24-2023',
      show_over_due: '06-26-2023',
      sched_freq: 'daily',
      for_user: 'Ben',
    },
    {
      name: 'Documentation 15',
      start_date: '04-21-2023',
      show_over_due: '04-26-2023',
      sched_freq: 'yearly',
      for_user: 'Ben',
    },
  ];

  function createData(
    name: string,
    start_date: string,
    show_over_due: string,
    sched_freq: string,
    for_user: string
  ) {
    return {
      name,
      start_date,
      show_over_due,
      sched_freq,
      for_user,
    };
  }

  const redTheme = createTheme({
    palette: {
      primary: {
        main: red[500],
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

  const [checkLists, setCheckLists] = React.useState<IChecklist[]>();
  const processRows = (data: IScheduleData[]) => {
    const createdRows = data.map(
      ({ name, start_date, show_over_due, sched_freq, for_user }) => {
        return createData(
          name,
          start_date,
          show_over_due,
          sched_freq,
          for_user
        );
      }
    );
    setCheckLists(createdRows);
  };
  const DEFAULT_ROWS_PAGE = 10;
  const [rowsPerPage, setRowsPerPage] = React.useState(DEFAULT_ROWS_PAGE);
  const [page, setPage] = React.useState(0);

  React.useEffect(() => {
    processRows(mockData);
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
      .toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
      .split(' ')
      .join('-')
      .toUpperCase();
  };
  return (
    <TableContainer component={Paper} style={{ marginTop: '2rem' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          padding: '1rem',
        }}
      >
        <div>
          <ThemeProvider theme={buttonTheme}>
            <Button
              variant='contained'
              color='primary'
              style={{
                color: 'white',
              }}
            >
              <AddIcon fontSize='small' />
              <Typography style={{ fontWeight: 'bold' }} variant='body2'>
                NEW SCHEDULE
              </Typography>
            </Button>
          </ThemeProvider>
        </div>
      </div>
      {/* <ChecklistFilter mockData={mockData} processRows={processRows} /> */}
      <Table size='small'>
        <TableHead>
          <TableRow>
            <StyledTableCell>
              <Typography style={{ fontWeight: 'bold' }}>
                Schedule Name
              </Typography>
            </StyledTableCell>
            <StyledTableCell align='center'>
              <Typography style={{ fontWeight: 'bold' }}>Start Date</Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography style={{ fontWeight: 'bold' }}>
                Show when over due
              </Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography style={{ fontWeight: 'bold' }}>
                Schedule Frequency
              </Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography style={{ fontWeight: 'bold' }}>For</Typography>
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {checkLists &&
            checkLists
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell>{row.name}</StyledTableCell>
                  <StyledTableCell align='center'>
                    {formatDate(row.start_date)}
                  </StyledTableCell>
                  <StyledTableCell>
                    {formatDate(row.show_over_due)}
                  </StyledTableCell>
                  <StyledTableCell>{row.sched_freq}</StyledTableCell>
                  <StyledTableCell>{row.for_user}</StyledTableCell>
                </StyledTableRow>
              ))}
        </TableBody>
      </Table>
      {checkLists && (
        <TablePagination
          rowsPerPageOptions={[10, 25]}
          component='div'
          count={checkLists.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </TableContainer>
  );
};

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: 'white',
    },
    body: {
      fontSize: 14,
    },
  })
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
      height: '40px',
    },
  })
)(TableRow);

export default Schedules;
