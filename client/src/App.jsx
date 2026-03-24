import { Link as RouterLink, Outlet } from "react-router-dom";
import { Box, AppBar, Toolbar, Typography, Button, Container } from "@mui/material";
// VIKTIGT: Jag rättade till stort 'U' i UserContext här, utifall att!
import { useUser } from "./contexts/UserContext";

function App() {
  const { currentUser } = useUser();

  return (
    <>
      <Box sx={{ flexGrow: 1, mb: 4 }}>
        {/* elevation={3} ger mer skugga */}
        <AppBar position="static" elevation={3}>
          <Toolbar>
            
            {/* Logga / Home */}
            <Typography 
              variant="h6" 
              component={RouterLink} 
              to="/" 
              sx={{ 
                flexGrow: 1, 
                textDecoration: "none", 
                color: "inherit", 
                fontWeight: "bold",
                letterSpacing: 1
              }}
            >
              SkruvLagret 
            </Typography>

            {/* Navigationslänkar */}
            <Button color="inherit" component={RouterLink} to="/cart" sx={{ fontWeight: 'medium' }}>
              Kundvagn
            </Button>

            <Button color="inherit" component={RouterLink} to="/users" sx={{ fontWeight: 'medium' }}>
              Användare
            </Button>

            <Button color="inherit" component={RouterLink} to="/products/new" sx={{ fontWeight: 'medium' }}>
              Skapa produkt
            </Button>

            {/* VISUALISERA VEM SOM ÄR INLOGGAD */}
            <Box 
              sx={{ 
                ml: 2, 
                px: 2, 
                py: 0.5, 
                // byter färg basserat på om inloggad eller inte
                backgroundColor: currentUser ? "rgba(255,255,255,0.2)" : "transparent",
                border: currentUser ? "none" : "1px solid rgba(255,255,255,0.5)",
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                {currentUser ? `${currentUser.firstName}` : "Ej inloggad"}
              </Typography>
            </Box>
            
          </Toolbar>
        </AppBar>
      </Box>

      {/* Container ramar in alla sidor (Outlet) så innehållet inte trycks mot skärmkanterna */}
      <Container maxWidth="lg" sx={{ pb: 5 }}>
        <Outlet />
      </Container>
    </>
  );
}

export default App;