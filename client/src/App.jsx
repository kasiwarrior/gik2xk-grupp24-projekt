import { Link, Outlet } from "react-router-dom";
import { Box, AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useUser } from "./contexts/userContext";

function App() {
  const { currentUser } = useUser();
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

            {/* VISUALISERA VEM SOM ÄR INLOGGAD */}
            <Typography variant="body1" sx={{ marginLeft: 2, fontWeight: "bold" }}>
              {currentUser ? `Inloggad: ${currentUser.firstName}` : "Ej inloggad"}
            </Typography>
            
          </Toolbar>
        </AppBar>
      </Box>

      <Outlet />
    </>
  );
}

export default App;
