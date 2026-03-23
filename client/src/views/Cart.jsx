<<<<<<< Updated upstream
import { useEffect, useState } from "react";
import axios from "../services/api";

function Cart() {

  const [cart, setCart] = useState(null);

  useEffect(() => {

    async function load() {

      const res = await axios.get("/users/1/carts/latest");

      setCart(res.data.data);

    }

    load();

  }, []);

  if (!cart) return <p>Laddar...</p>;

  return (
    <div>

      <h2>Kundvagn</h2>

      {cart.products.map(product => (

        <div key={product.id}>

          {product.name}

        </div>

      ))}

    </div>
=======
import { useContext } from 'react';
import {
  Container,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Box,
  Typography,
  Alert,
  TextField,
  Paper,
  Grid,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ClearIcon from '@mui/icons-material/Clear';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price) || 0;
      const quantity = item.quantity || 1;
      return total + (price * quantity);
    }, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + (item.quantity || 1), 0);
  };

  const handleQuantityChange = (productId, newQuantity) => {
    const quantity = parseInt(newQuantity);
    if (quantity > 0) {
      updateQuantity(productId, quantity);
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Your cart is empty');
      return;
    }
    alert('Thank you for your purchase! This is a demo checkout.');
    clearCart();
    navigate('/');
  };

  if (cart.length === 0) {
    return (
      <Container maxWidth="lg">
        <Card sx={{ mt: 4, textAlign: 'center', py: 6 }}>
          <CardContent>
            <ShoppingCartIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              Your cart is empty
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
              Add some products to get started!
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/')}
            >
              Continue Shopping
            </Button>
          </CardContent>
        </Card>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
          Shopping Cart
        </Typography>
        <Alert severity="info">
          You have {getTotalItems()} item{getTotalItems() !== 1 ? 's' : ''} in your cart
        </Alert>
      </Box>

      <Grid container spacing={3}>
        {/* Cart Items Table */}
        <Grid item xs={12} md={8}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Product</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>Price</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>Quantity</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>Total</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.map((item) => {
                  const itemTotal = (parseFloat(item.price) || 0) * (item.quantity || 1);
                  return (
                    <TableRow key={item.id} hover>
                      <TableCell>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {item.title || item.name}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            {item.description ? item.description.substring(0, 50) + '...' : 'No description'}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        ${parseFloat(item.price).toFixed(2)}
                      </TableCell>
                      <TableCell align="center">
                        <TextField
                          type="number"
                          size="small"
                          variant="outlined"
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                          inputProps={{ min: '1' }}
                          sx={{ width: 70 }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        ${itemTotal.toFixed(2)}
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          size="small"
                          color="error"
                          startIcon={<DeleteIcon />}
                          onClick={() => removeFromCart(item.id)}
                          variant="outlined"
                        >
                          Remove
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        {/* Order Summary */}
        <Grid item xs={12} md={4}>
          <Card sx={{ position: 'sticky', top: 20 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Order Summary
              </Typography>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Subtotal:</Typography>
                <Typography>${getTotalPrice().toFixed(2)}</Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Shipping:</Typography>
                <Typography>$0.00</Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, pb: 2, borderBottom: '1px solid #eee' }}>
                <Typography>Tax:</Typography>
                <Typography>${(getTotalPrice() * 0.1).toFixed(2)}</Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Total:
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                  ${(getTotalPrice() * 1.1).toFixed(2)}
                </Typography>
              </Box>

              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={handleCheckout}
                sx={{ mb: 1 }}
              >
                Proceed to Checkout
              </Button>

              <Button
                fullWidth
                variant="outlined"
                onClick={() => navigate('/')}
              >
                Continue Shopping
              </Button>

              <Button
                fullWidth
                variant="text"
                color="error"
                startIcon={<ClearIcon />}
                onClick={() => {
                  if (window.confirm('Clear entire cart?')) {
                    clearCart();
                  }
                }}
                sx={{ mt: 2 }}
              >
                Clear Cart
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
>>>>>>> Stashed changes
  );
}

export default Cart;