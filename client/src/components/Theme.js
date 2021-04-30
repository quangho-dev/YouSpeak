import { createMuiTheme } from '@material-ui/core/styles'

const speakGreen = '#4AB428'
const speakOrange = '#FFC300'

export default createMuiTheme({
  palette: {
    common: {
      green: speakGreen,
    },
    primary: {
      main: speakGreen,
    },
    secondary: {
      main: speakOrange,
    },
  },
  typography: {
    tab: {
      fontFamily: 'Raleway',
      textTransform: 'none',
      fontWeight: 700,
      color: 'white',
      fontSize: '1rem',
    },
    h1: {
      color: '#333',
    },
    h2: {
      color: '#333',
    },
    h3: {
      color: '#333',
    },
    h4: {
      color: '#333',
    },
  },
  overrides: {
    MuiLink: {
      root: {
        color: '#fff',
      },
    },
    MuiInputLabel: {
      root: {
        fontWeight: 400,
        fontSize: '1rem',
      },
    },
    MuiInput: {
      underline: {
        '&:before': {
          borderBottom: `2px solid ${speakGreen}`,
        },
        '&:hover:not($disabled):not($focused):not($error):before': {
          borderBottom: `2px solid ${speakGreen}`,
        },
      },
    },
    backgroundTheme: {
      backgroundColor: '#F0F2F5',
    },
  },
  breakpoints: {
    values: {
      zero: 0,
      xs: 320,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
})
