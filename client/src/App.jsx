import { Link, Outlet } from "react-router-dom";
import { Box, AppBar, Toolbar, Typography, Button } from "@mui/material";

function App() {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography sx={{ flexGrow: 1 }}>
              <Link to="/">Home</Link>
            </Typography>

            <Button color="inherit">
              <Link to="/cart">Varukorg</Link>
            </Button>

            <Button color="inherit">
              <Link to="/users">Användare</Link>
            </Button>

            <Button color="inherit">
              <Link to="/products/new">Skapa produkt</Link>
            </Button>
            
          </Toolbar>
        </AppBar>
      </Box>

      <Outlet />
    </>
  );
}

export default App;
