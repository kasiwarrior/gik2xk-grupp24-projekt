<<<<<<< Updated upstream
import ProductList from "../components/ProductList";

function Home() {
  return (
    <div>
      <h1>Produkter</h1>
      <ProductList />
    </div>
=======
import { useEffect, useState, useContext } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  CircularProgress,
  Box,
  Alert,
  TextField,
  InputAdornment,
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { productAPI } from '../api/api';
import { CartContext } from '../context/CartContext';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await productAPI.getAllProducts();
      setProducts(response.data || []);
    } catch (err) {
      setError('Failed to load products. Please try again later.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productAPI.deleteProduct(id);
        setProducts(products.filter(p => p.id !== id));
      } catch (err) {
        setError('Failed to delete product');
      }
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    alert(`${product.title || product.name} added to cart!`);
  };

  const filteredProducts = products.filter(product =>
    (product.title || product.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.description || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
          Our Products
        </Typography>

        <TextField
          fullWidth
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
          sx={{ mb: 3 }}
        />

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
      </Box>

      {filteredProducts.length === 0 ? (
        <Box textAlign="center" py={4}>
          <Typography variant="h6" color="textSecondary">
            {searchTerm ? 'No products found matching your search.' : 'No products available.'}
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: 2,
                  transition: 'transform 0.3s ease, boxShadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4,
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                    {product.title || product.name}
                  </Typography>

                  <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                    {product.description}
                  </Typography>

                  <Typography variant="h6" color="primary" sx={{ my: 1 }}>
                    ${parseFloat(product.price).toFixed(2)}
                  </Typography>

                  {product.stock !== undefined && (
                    <Typography variant="body2" color={product.stock > 0 ? 'success.main' : 'error'}>
                      Stock: {product.stock > 0 ? product.stock : 'Out of Stock'}
                    </Typography>
                  )}
                </CardContent>

                <CardActions sx={{ justifyContent: 'space-between' }}>
                  <Button
                    size="small"
                    startIcon={<VisibilityIcon />}
                    onClick={() => navigate(`/product/${product.id}`)}
                    variant="outlined"
                  >
                    View
                  </Button>

                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      size="small"
                      startIcon={<EditIcon />}
                      onClick={() => navigate(`/product/${product.id}/edit`)}
                      color="warning"
                      variant="outlined"
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDeleteProduct(product.id)}
                      color="error"
                      variant="outlined"
                    >
                      Delete
                    </Button>
                  </Box>
                </CardActions>

                <CardActions>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<AddShoppingCartIcon />}
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stock === 0}
                  >
                    Add to Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
>>>>>>> Stashed changes
  );
}

export default Home;