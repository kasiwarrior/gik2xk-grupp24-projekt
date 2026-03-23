<<<<<<< Updated upstream
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOne } from "../services/ProductService";
import axios from "../services/api";
import { Link } from "react-router-dom";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [rating, setRating] = useState("");

  useEffect(() => {
    async function load() {
      const data = await getOne(id);
      setProduct(data);
    }

    load();
  }, [id]);

  async function addToCart() {
    try {
      await axios.post("/carts/1/products", {
        productId: Number(id),
        amount: 1
      });

      alert("Produkten lades till i kundvagnen");
    } catch (e) {
      e?.response ? console.log(e.response.data) : console.log(e);
      alert("Det gick inte att lägga till i kundvagnen");
    }
  }

  async function addRating() {
    try {
      await axios.post(`/products/${id}/ratings`, {
        userId: 1,
        score: Number(rating)
      });

      alert("Rating sparad");

      const updatedProduct = await getOne(id);
      setProduct(updatedProduct);
      setRating("");
    } catch (e) {
      e?.response ? console.log(e.response.data) : console.log(e);
      alert("Det gick inte att spara rating");
    }
  }

  if (!product) return <p>Laddar...</p>;

  const averageRating =
    product.ratings && product.ratings.length > 0
      ? (
          product.ratings.reduce((sum, r) => sum + r.score, 0) /
          product.ratings.length
        ).toFixed(1)
      : null;

  return (
    <div>
      <h2>{product.name}</h2>

      <p>{product.description}</p>

      <p>{product.price} kr</p>

      {product.imageUrl && (
        <img
          src={product.imageUrl}
          alt={product.name}
          width="200"
        />
      )}

      <div style={{ marginTop: "1rem" }}>
        <button onClick={addToCart}>Lägg i kundvagn</button>
      </div>

      <Link to="/cart">Gå till varukorg</Link>

      <h3>Snittbetyg</h3>
      {averageRating ? (
        <p>{averageRating} / 5</p>
      ) : (
        <p>Inga betyg än</p>
      )}

      <h3>Ratings</h3>

      {product.ratings && product.ratings.length > 0 ? (
        product.ratings.map((r, index) => (
          <div key={index}>
            <strong>{r.score} / 5</strong>
            <br />
            Av: {r.author}
            <br />
            {new Date(r.createdAt).toLocaleDateString()}
            <hr />
          </div>
        ))
      ) : (
        <p>Inga ratings än</p>
      )}

      <h3>Lägg betyg</h3>

      <input
        type="number"
        min="1"
        max="5"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      />

      <button onClick={addRating}>Skicka rating</button>
    </div>
=======
import { useState, useEffect, useContext } from 'react';
import {
  Container,
  Card,
  CardContent,
  Button,
  Box,
  Typography,
  CircularProgress,
  Alert,
  TextField,
  Grid,
  Rating,
  Divider,
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useParams, useNavigate } from 'react-router-dom';
import { productAPI } from '../api/api';
import { CartContext } from '../context/CartContext';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await productAPI.getProductById(id);
      setProduct(response.data);
    } catch (err) {
      setError('Failed to load product details');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (quantity > 0 && product) {
      addToCart(product, quantity);
      alert(`${product.title || product.name} added to cart!`);
      setQuantity(1);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="600px">
        <CircularProgress />
      </Box>
    );
  }

  if (error || !product) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error">{error || 'Product not found'}</Alert>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
          sx={{ mt: 2 }}
        >
          Back to Products
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/')}
        sx={{ mb: 3, mt: 2 }}
      >
        Back to Products
      </Button>

      <Grid container spacing={4}>
        {/* Product Image/Icon */}
        <Grid item xs={12} sm={6}>
          <Card sx={{ textAlign: 'center', p: 3, backgroundColor: '#f5f5f5' }}>
            <Box sx={{ fontSize: 120, mb: 2 }}>📦</Box>
            <Typography variant="body2" color="textSecondary">
              Product Image
            </Typography>
          </Card>
        </Grid>

        {/* Product Details */}
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                {product.title || product.name}
              </Typography>

              <Box sx={{ my: 2 }}>
                <Rating value={4.5} readOnly precision={0.5} />
                <Typography variant="body2" color="textSecondary">
                  (42 reviews)
                </Typography>
              </Box>

              <Typography variant="h5" color="primary" sx={{ my: 2, fontWeight: 'bold' }}>
                ${parseFloat(product.price).toFixed(2)}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Description
              </Typography>
              <Typography variant="body1" color="textSecondary" paragraph>
                {product.description || 'No description available'}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ mb: 3 }}>
                {product.stock !== undefined && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      Stock: <span style={{ color: product.stock > 0 ? 'green' : 'red' }}>
                        {product.stock > 0 ? `${product.stock} available` : 'Out of Stock'}
                      </span>
                    </Typography>
                  </Box>
                )}

                <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
                  Quantity:
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <TextField
                    type="number"
                    inputProps={{ min: '1', max: product.stock || 100 }}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    sx={{ width: 100 }}
                    variant="outlined"
                    size="small"
                  />
                </Box>
              </Box>

              <Button
                fullWidth
                variant="contained"
                size="large"
                startIcon={<AddShoppingCartIcon />}
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                Add to Cart
              </Button>

              <Button
                fullWidth
                variant="outlined"
                size="large"
                onClick={() => navigate(`/product/${id}/edit`)}
                sx={{ mt: 2 }}
              >
                Edit Product
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Product Specifications */}
      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
            Product Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="textSecondary">
                <strong>SKU:</strong> {product.id}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="textSecondary">
                <strong>Category:</strong> Electronics
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="textSecondary">
                <strong>Availability:</strong> {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="textSecondary">
                <strong>Shipping:</strong> Free Shipping
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
>>>>>>> Stashed changes
  );
}

export default ProductDetails;