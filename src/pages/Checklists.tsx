import React from 'react';
import {
  Theme,
  ThemeProvider,
  createStyles,
  createTheme,
  makeStyles,
  withStyles,
} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import grey from '@material-ui/core/colors/grey';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import lightGreen from '@material-ui/core/colors/lightGreen';
import StarIcon from '@material-ui/icons/Star';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';
import { Menu, MenuItem, TablePagination } from '@material-ui/core';

export default function CheckLists() {
  return <CenteredTabs />;
}

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    marginTop: '1rem',
  },
  tabs: {
    background: grey[100],
  },
  tab: {
    margin: '2rem',
  },
});

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

interface IChecklist {
  name: string;
  schedule: any;
  actions: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
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
        <Typography>&nbsp;/ Health & Safety</Typography>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
        }}
      >
        <Typography variant='caption'>
          Create new checklist template in this folder:
        </Typography>
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
                NEW TEMPLATE
              </Typography>
            </Button>
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
}

/**
 * Table
 */

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
    },
  })
)(TableRow);

function createData(
  name: string,
  schedule: React.ReactNode,
  actions: React.ReactNode
) {
  return {
    name,
    schedule,
    actions,
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

interface ICheckListData {
  title: string;
  schedules: number;
}

const mockData: ICheckListData[] = [
  {
    title: '1Place Standard Centre Closing Procedure // v1.1',
    schedules: 3,
  },
  {
    title: '2Place Standard Centre Closing Procedure // v1.1',
    schedules: 4,
  },
  {
    title: '3Place Standard Centre Closing Procedure // v1.1',
    schedules: 5,
  },
  {
    title: '4Place Standard Centre Closing Procedure // v1.1',
    schedules: 1,
  },
  {
    title: '4Place Standard Centre Closing Procedure // v1.1',
    schedules: 1,
  },
  {
    title: '4Place Standard Centre Closing Procedure // v1.1',
    schedules: 1,
  },
  {
    title: '4Place Standard Centre Closing Procedure // v1.1',
    schedules: 1,
  },
  {
    title: '4Place Standard Centre Closing Procedure // v1.1',
    schedules: 1,
  },
  {
    title: '4Place Standard Centre Closing Procedure // v1.1',
    schedules: 1,
  },
  {
    title: '4Place Standard Centre Closing Procedure // v1.1',
    schedules: 1,
  },
  {
    title: '4Place Standard Centre Closing Procedure // v1.1',
    schedules: 1,
  },
  {
    title: '4Place Standard Centre Closing Procedure // v1.1',
    schedules: 1,
  },
  {
    title: '4Place Standard Centre Closing Procedure // v1.1',
    schedules: 1,
  },
  {
    title: '4Place Standard Centre Closing Procedure // v1.1',
    schedules: 1,
  },
  {
    title: '4Place Standard Centre Closing Procedure // v1.1',
    schedules: 1,
  },
  {
    title: '4Place Standard Centre Closing Procedure // v1.1',
    schedules: 1,
  },
];

function CheckListsTable() {
  const [checkLists, setCheckLists] = React.useState<IChecklist[]>();
  const processRows = () => {
    const createdRows = mockData.map(({ title, schedules }) => {
      return createData(
        title,
        <ThemeProvider theme={redTheme}>
          <Button variant='outlined' color='primary' size='small'>
            {schedules}
          </Button>
        </ThemeProvider>,
        <ThemeProvider theme={blueTheme}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Button
              variant='contained'
              color='primary'
              size='small'
              style={{ textTransform: 'none' }}
            >
              Start
            </Button>
            <Button
              variant='outlined'
              color='primary'
              size='small'
              style={{ textTransform: 'none' }}
            >
              Edit
            </Button>
            <Button
              variant='outlined'
              color='primary'
              size='small'
              style={{ textTransform: 'none' }}
              id='menu-btn'
              aria-controls='menu'
              onClick={handleClick}
            >
              More
            </Button>
          </div>
        </ThemeProvider>
      );
    });
    setCheckLists(createdRows);
  };
  const DEFAULT_ROWS_PAGE = 5;
  const menuRef = React.useRef(null);
  // * handle dropdown menu
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [open, setOpen] = React.useState(false);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };
  const [rowsPerPage, setRowsPerPage] = React.useState(DEFAULT_ROWS_PAGE);
  const [page, setPage] = React.useState(0);
  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  React.useEffect(() => {
    processRows();
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

  return (
    <TableContainer component={Paper} style={{ marginTop: '2rem' }}>
      <Table size='small'>
        <TableHead>
          <Menu
            id='menu'
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            ref={menuRef}
            MenuListProps={{
              'aria-labelledby': 'menu-btn',
            }}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
          <TableRow>
            <StyledTableCell>
              <Typography style={{ fontWeight: 'bold' }}>Name</Typography>
            </StyledTableCell>
            <StyledTableCell align='center'>
              <Typography style={{ fontWeight: 'bold' }}>
                Current Schedules
              </Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography style={{ fontWeight: 'bold' }}>Actions</Typography>
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
                    {row.schedule}
                  </StyledTableCell>
                  <StyledTableCell>{row.actions}</StyledTableCell>
                </StyledTableRow>
              ))}
        </TableBody>
      </Table>
      {checkLists && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
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
}

function CenteredTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const tabs = [
    'Checklist Templates',
    'To-Do List',
    'Schedules & Surveys',
    'Register',
    'Settings',
  ];

  return (
    <div>
      <Paper className={classes.root}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor='primary'
          textColor='primary'
          centered
          className={classes.tabs}
        >
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              label={
                <Typography style={{ textTransform: 'none' }}>{tab}</Typography>
              }
              {...a11yProps(index)}
            />
          ))}
        </Tabs>
      </Paper>
      <Paper className={classes.tab}>
        <TabPanel value={value} index={0}>
          <ChecklistTemplates />
          <CheckListsTable />
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
    </div>
  );
}
