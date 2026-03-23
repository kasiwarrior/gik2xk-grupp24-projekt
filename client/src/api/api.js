const API_BASE_URL = 'http://localhost:5000/api';

// Product API calls
export const productAPI = {
  getAllProducts: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/products`);
      if (!response.ok) throw new Error('Failed to fetch products');
      return await response.json();
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  getProductById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`);
      if (!response.ok) throw new Error('Failed to fetch product');
      return await response.json();
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  },

  createProduct: async (productData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
      if (!response.ok) throw new Error('Failed to create product');
      return await response.json();
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  },

  updateProduct: async (id, productData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
      if (!response.ok) throw new Error('Failed to update product');
      return await response.json();
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },

  deleteProduct: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete product');
      return await response.json();
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  },

  addRating: async (id, ratingData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}/ratings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ratingData),
      });
      if (!response.ok) throw new Error('Failed to add rating');
      return await response.json();
    } catch (error) {
      console.error('Error adding rating:', error);
      throw error;
    }
  },
};

// Cart API calls
export const cartAPI = {
  getCart: async (cartId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/carts/${cartId}`);
      if (!response.ok) throw new Error('Failed to fetch cart');
      return await response.json();
    } catch (error) {
      console.error('Error fetching cart:', error);
      throw error;
    }
  },

  addProductToCart: async (cartId, productId, amount = 1) => {
    try {
      const response = await fetch(`${API_BASE_URL}/carts/${cartId}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, amount }),
      });
      if (!response.ok) throw new Error('Failed to add product to cart');
      return await response.json();
    } catch (error) {
      console.error('Error adding product to cart:', error);
      throw error;
    }
  },
};
