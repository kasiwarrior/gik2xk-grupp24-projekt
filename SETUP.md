# Shopfy - E-Commerce Application

A full-stack e-commerce application built with React (Vite) frontend and Node.js/Express backend, featuring a complete shopping cart system with CRUD operations.

## Features

### Frontend (React + MUI)
- 🛍️ **Product Listing** - Browse all products with search functionality
- 🔍 **Product Details** - View detailed information about each product
- 🛒 **Shopping Cart** - Add/remove items, update quantities, view totals
- ➕ **Add Products** - Create new products with title, description, price, and stock
- ✏️ **Edit Products** - Modify existing product information
- 🗑️ **Delete Products** - Remove products from the catalog
- 💾 **Persistent Cart** - Cart data saved to localStorage
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile devices
- 🎨 **Material-UI Components** - Professional and modern UI

### Backend (Express + SQLite)
- ✅ **CRUD Operations** - Create, Read, Update, Delete for products
- 🏠 **Cart Management** - Add products to cart with quantities
- 🌐 **CORS Enabled** - Cross-origin requests from frontend
- 📊 **SQLite Database** - Persistent data storage
- 🔌 **RESTful API** - Standard HTTP operations (GET, POST, PUT, DELETE)

## Project Structure

```
.
├── client/              # React frontend (Vite)
│   ├── src/
│   │   ├── components/
│   │   ├── views/
│   │   │   ├── Home.jsx          # Product listing with search
│   │   │   ├── ProductDetails.jsx# Product detail view
│   │   │   ├── ProductEdit.jsx   # Create/Edit product form
│   │   │   └── Cart.jsx          # Shopping cart
│   │   ├── context/
│   │   │   └── CartContext.jsx   # Cart state management
│   │   ├── api/
│   │   │   └── api.js            # API calls
│   │   ├── App.jsx               # Main app with navigation
│   │   └── main.jsx              # Entry point with routing
│   └── package.json
│
├── server/              # Node.js/Express backend
│   ├── routes/
│   │   ├── productRoute.js       # Product endpoints
│   │   └── userRoute.js
│   ├── controllers/
│   │   └── productController.js  # Product logic
│   ├── services/
│   │   └── productService.js     # Business logic
│   ├── models/                   # Database models
│   ├── app.js                    # Express app setup
│   └── package.json
│
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Start the server (runs on port 3000):
```bash
npm start
```

The server will start at `http://localhost:3000`

### Frontend Setup

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server (runs on port 5173):
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## Usage Guide

### Viewing Products
1. Navigate to the home page to see all products
2. Use the search bar to find products by name or description
3. Click "View" to see detailed product information

### Adding Products to Cart
1. Click "Add to Cart" on any product card or detail page
2. Adjust quantity if needed
3. Cart count updates in the navbar

### Managing Cart
1. Click the cart icon in the navbar to view shopping cart
2. Update quantities directly in the cart table
3. Remove individual items or clear entire cart
4. See order summary with subtotal, tax, and total
5. Proceed to checkout (demo checkout)

### Product Management (CRUD)

#### Create Product
1. Click "Add Product" in navbar
2. Fill in product details:
   - Title (required)
   - Description
   - Price (required)
   - Stock Quantity (required)
3. Click "Save Product"

#### Read Product
1. Click "View" button on product card
2. See detailed product information

#### Update Product
1. Click "Edit" button on product card or in product details
2. Modify product information
3. Click "Save Product"

#### Delete Product
1. Click "Delete" button on product card
2. Confirm deletion in dialog

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `POST /api/products/:id/ratings` - Add product rating

### Cart
- `GET /api/carts/:id` - Get cart by ID
- `POST /api/carts/:cartId/products` - Add product to cart

## Cart Features

- **Add Items**: Add products with selected quantity
- **Update Quantity**: Change item quantities in cart
- **Remove Items**: Delete individual items from cart
- **Clear Cart**: Remove all items at once
- **Persistent Storage**: Cart saved to localStorage
- **Price Calculation**: Automatic calculation of subtotal, tax (10%), and total

## Technologies Used

### Frontend
- React 19.x with Vite
- Material-UI (MUI) for components
- React Router v7 for navigation
- Context API for state management

### Backend
- Express.js
- SQLite3
- Sequelize ORM
- CORS support
- Morgan logging

## Notes

### Default API URL
- Frontend expects backend at: `http://localhost:3000/api`
- This is configured in [client/src/api/api.js](client/src/api/api.js)

### CORS Configuration
- Enabled for `http://localhost:5173` (Vite dev server)
- Configured in [server/app.js](server/app.js)

### Data Persistence
- **Cart**: Saved to browser localStorage
- **Products**: Stored in SQLite database

## Example Product Data

When creating products, use data like:
```json
{
  "title": "Wireless Headphones",
  "description": "High-quality wireless headphones with noise cancellation",
  "price": 99.99,
  "stock": 50
}
```

## Troubleshooting

### Frontend can't connect to backend
- Ensure backend is running on port 3000
- Check CORS is enabled in server/app.js
- Verify API URL in client/src/api/api.js

### Cart not persisting
- Check browser localStorage is enabled
- Clear localStorage if experiencing issues: `localStorage.clear()`

### Products not loading
- Ensure database is initialized
- Check server console for errors
- Verify database connection in config/config.json

## Future Enhancements

- User authentication and authorization
- Product images/uploads
- Advanced filtering and sorting
- Product reviews and ratings
- Order history
- Payment integration
- Wishlist functionality
- Product inventory management

## License

This project is part of a web development course assignment.

---

**Happy Shopping!** 🛍️
