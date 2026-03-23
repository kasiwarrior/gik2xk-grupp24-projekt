<<<<<<< Updated upstream
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
=======
import { Link, Outlet } from 'react-router-dom';
import { Box, AppBar, Toolbar, Typography, Button, Badge, Container } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { CartContext } from './context/CartContext';
import { useContext } from 'react';

function App() {
  const { cart } = useContext(CartContext);
  
  const getTotalItems = () => {
    return cart.reduce((total, item) => total + (item.quantity || 1), 0);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
          <Toolbar>
            <Typography 
              variant="h6" 
              component="div" 
              sx={{ flexGrow: 1, fontWeight: 'bold' }}
            >
              <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
                🛍️ Shopfy
              </Link>
            </Typography>
            
            <Button 
              color="inherit" 
              component={Link} 
              to="/"
              sx={{ mr: 2 }}
            >
              Products
            </Button>
            
            <Button 
              color="inherit" 
              component={Link} 
              to="/product/new"
              sx={{ mr: 2 }}
            >
              Add Product
            </Button>
            
            <Button 
              color="inherit" 
              component={Link} 
              to="/cart"
              sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
            >
              <Badge badgeContent={getTotalItems()} color="error">
                <ShoppingCartIcon />
              </Badge>
              Cart
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Outlet />
      </Container>
>>>>>>> Stashed changes
    </>
  );
}

export default App;
