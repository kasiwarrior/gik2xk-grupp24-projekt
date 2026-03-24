import { Link as RouterLink, Outlet } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Stack,
  Box,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import AddBoxIcon from "@mui/icons-material/AddBox";
import StorefrontIcon from "@mui/icons-material/Storefront";

function App() {
  return (
    <>
      <AppBar position="sticky" elevation={2}>
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ py: 1 }}>
            <Typography
              variant="h6"
              component={RouterLink}
              to="/"
              sx={{
                color: "inherit",
                textDecoration: "none",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                gap: 1,
                flexGrow: 1,
              }}
            >
              <StorefrontIcon />
              Webbshop
            </Typography>

            <Stack direction="row" spacing={1}>
              <Button
                color="inherit"
                component={RouterLink}
                to="/cart"
                startIcon={<ShoppingCartIcon />}
              >
                Varukorg
              </Button>

              <Button
                color="inherit"
                component={RouterLink}
                to="/users"
                startIcon={<PeopleIcon />}
              >
                Användare
              </Button>

              <Button
                color="inherit"
                component={RouterLink}
                to="/products/new"
                startIcon={<AddBoxIcon />}
              >
                Skapa produkt
              </Button>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      <Box sx={{ py: 4, minHeight: "100vh", bgcolor: "#f5f7fb" }}>
        <Container maxWidth="lg">
          <Outlet />
        </Container>
      </Box>
    </>
  );
}

export default App;