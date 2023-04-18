import { createTheme } from "@material-ui/core/styles";

const oneplaceTheme = createTheme({
  palette: {
    primary: {
      main: "#223d79",
      light: "#5567a8",
      dark: "#00184c",
      contrastText: "#fff",
    },
    secondary: {
      main: "#f50057",
      light: "#ff5983",
      dark: "#bb002f",
      contrastText: "#fff",
    },
    error: {
      main: "#f44336",
      light: "#e57373",
      dark: "#d32f2f",
      contrastText: "#fff",
    },
    warning: {
      main: "#ff9800",
      light: "#ffb74d",
      dark: "#f57c00",
      contrastText: "#fff",
    },
    info: {
      main: "#979797",
      light: "#979797",
      dark: "#979797",
      contrastText: "#fff",
    },
    success: {
      main: "#92b765",
      light: "#81c784",
      dark: "#388e3c",
      contrastText: "#fff",
    },
  },
  typography: {
    fontFamily: [
      '"Open Sans"',
      '"Segoe UI"',
      "Roboto",
      "Oxygen",
      "Ubuntu",
      "Cantarell",
      '"Fira Sans"',
      '"Droid Sans"',
      '"Helvetica Neue"',
      "sans-serif",
    ].join(","),
    h1: {
      fontSize: "1.25rem",
      fontWeight: 700,
    },
    h2: {
      fontSize: "1.125rem",
      fontWeight: 700,
    },
    h3: {
      fontSize: "1rem",
      fontWeight: 700,
    },

    h4: {
      fontSize: "0.875rem",
      fontWeight: 700,
    },
    h5: {
      fontSize: "0.75rem",
      fontWeight: 700,
    },
    h6: {
      fontSize: "0.625rem",
      fontWeight: 700,
    },
  },
  // fix up margin for keyboardDatePicker picker
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          WebkitFontSmoothing: "antialiased",
          fontFamily: [
            '"Open Sans"',
            '"Segoe UI"',
            "Roboto",
            "Oxygen",
            "Ubuntu",
            "Cantarell",
            '"Fira Sans"',
            '"Droid Sans"',
            '"Helvetica Neue"',
            "sans-serif",
          ].join(","),
          fontSize: "1rem",
        },
      },
    },
    MuiFormControl: {
      root: {
        marginTop: "16px",
      },
    },
    MuiCard: {
      root: {
        border: "1px solid rgba(0, 0, 0, 0.25)",
        borderBottom: "none",
      },
    },
    MuiCardHeader: {
      root: {
        backgroundColor: "#00317d",
        color: "white",
      },
      title: {
        fontSize: "1rem",
      },
    },
    MuiCardContent: {
      root: {
        backgroundColor: "#F0F3F7",
      },
    },
    MuiOutlinedInput: {
      root: {
        backgroundColor: "white",
        "& $notchedOutline": {
          //borderColor: 'green'
        },
        "&:hover $notchedOutline": {
          // borderColor: 'red'
        },
        "&$focused $notchedOutline": {
          //borderColor: 'purple'
        },
      },
      // notchedOutline : {
      //     backgroundColor: 'white'
      // }
    },
    // MuiDataGrid: {
    //     root: {
    //         '& .MuiDataGrid-columnHeader':{
    //             background: '#00317d',
    //             color: 'white',
    //         },
    //         '& .MuiDataGrid-sortIcon' : {
    //             color: 'white',
    //         },
    //         '& .MuiDataGrid-menuIconButton' : {
    //             color: 'white',
    //         }
    //     }
    // }
  },
});

export default oneplaceTheme;
