import { createTheme } from "@mui/material";
import { blue, grey, red } from "@mui/material/colors";

export const darkTheme  = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#163A5F' },
    secondary: { main: '#19857b' },
    error: { main: red.A400 },
  },
  components: {
    MuiAppBar: {
      defaultProps: {},
      styleOverrides: {
        root: {
          backgroundColor: '#000',
          boxShadow: '5px 5px 20px #76CB1A',
          marginBottom: '15px',
        }
      }
    },
  }
})