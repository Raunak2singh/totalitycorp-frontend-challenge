import { createTheme } from '@mui/material/styles';


const theme = createTheme({
  palette: {
    mode: 'light',
    primary:{
      main : '#48CB8E',
      dark :  "#000"
    },
    secondary :{
      main :"#5400FF",
    },
  
  },

    typography:{
      fontFamily: 'sans-serif'
    }


  
 
});

export default theme;