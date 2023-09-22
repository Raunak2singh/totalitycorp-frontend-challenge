import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#000",

    },
    secondary: {
      main: "#000",
    },
    
    danger :{
      main:red[500]
    }
  },
  typography: {
    fontFamily: "sans-serif",
  },
});

export default theme;
