import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#30a9c1",   // navbar-färg
    },
    secondary: {
      main: "#2563eb",   // knappar & accent
    },
    background: {
      default: "#f5f7fb",
    },
  },
  shape: {
    borderRadius: 10,
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});

export default theme;