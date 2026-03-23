<<<<<<< Updated upstream
import { useEffect, useState } from "react";
import { create, getOne, update } from "../services/ProductService";
import { useNavigate, useParams } from "react-router-dom";
=======
import { useState, useEffect } from 'react';
import {
  Container,
  Card,
  CardContent,
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  CircularProgress,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { useParams, useNavigate } from 'react-router-dom';
import { productAPI } from '../api/api';
>>>>>>> Stashed changes

function ProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
<<<<<<< Updated upstream
  const isEditMode = Boolean(id);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    async function loadProduct() {
      if (!isEditMode) return;

      const product = await getOne(id);
      if (product) {
        setTitle(product.title ?? "");
        setDescription(product.description ?? "");
        setPrice(product.price ?? "");
      }
    }

    loadProduct();
  }, [id, isEditMode]);

  async function handleSubmit(e) {
    e.preventDefault();

    const productData = {
      name: title,
      description,
      price: Number(price)
    };

    if (isEditMode) {
      await update(id, productData);
      alert("Produkt uppdaterad");
    } else {
      await create(productData);
      alert("Produkt skapad");
    }

    navigate("/");
  }

  return (
    <div>
      <h2>{isEditMode ? "Ändra produkt" : "Skapa produkt"}</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Titel"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <textarea
            placeholder="Beskrivning"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <input
            type="number"
            placeholder="Pris"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <button type="submit">
          {isEditMode ? "Spara ändringar" : "Skapa produkt"}
        </button>
      </form>
    </div>
=======
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    stock: '',
  });
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (id && id !== 'new') {
      loadProduct();
    }
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await productAPI.getProductById(id);
      const product = response.data;
      setFormData({
        title: product.title || product.name || '',
        description: product.description || '',
        price: product.price || '',
        stock: product.stock || '',
      });
    } catch (err) {
      setError('Failed to load product');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Validation
    if (!formData.title.trim()) {
      setError('Product title is required');
      return;
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      setError('Valid price is required');
      return;
    }
    if (!formData.stock || parseInt(formData.stock) < 0) {
      setError('Valid stock quantity is required');
      return;
    }

    try {
      setLoading(true);
      
      const submitData = {
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
      };

      if (id && id !== 'new') {
        // Update existing product
        await productAPI.updateProduct(id, submitData);
        setSuccess('Product updated successfully!');
      } else {
        // Create new product
        await productAPI.createProduct(submitData);
        setSuccess('Product created successfully!');
        // Reset form
        setFormData({
          title: '',
          description: '',
          price: '',
          stock: '',
        });
      }

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      setError(err.message || 'Failed to save product');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && id && id !== 'new') {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="sm">
      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
            {id && id !== 'new' ? 'Edit Product' : 'Create New Product'}
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              fullWidth
              label="Product Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              variant="outlined"
            />

            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              multiline
              rows={4}
              variant="outlined"
            />

            <TextField
              fullWidth
              label="Price ($)"
              name="price"
              type="number"
              inputProps={{ step: '0.01', min: '0' }}
              value={formData.price}
              onChange={handleChange}
              required
              variant="outlined"
            />

            <TextField
              fullWidth
              label="Stock Quantity"
              name="stock"
              type="number"
              inputProps={{ min: '0' }}
              value={formData.stock}
              onChange={handleChange}
              required
              variant="outlined"
            />

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 3 }}>
              <Button
                variant="outlined"
                startIcon={<CancelIcon />}
                onClick={() => navigate('/')}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                startIcon={<SaveIcon />}
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save Product'}
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
>>>>>>> Stashed changes
  );
}

export default ProductEdit;