# 🛍️ Shopfy - Quick Start Guide

## Start Backend Server

```bash
cd server
npm install
npm start
```
Server runs on `http://localhost:3000`

## Start Frontend (in another terminal)

```bash
cd client
npm install
npm run dev
```
Frontend runs on `http://localhost:5173`

## Access the App
Open `http://localhost:5173` in your browser

---

## 📱 User Guide

### Browse Products
- Visit home page to see all products
- Use search bar to filter by name/description
- Click "View" to see product details

### Shopping Cart
1. Click "Add to Cart" on any product
2. Click cart icon (🛒) in navbar to view cart
3. Update quantities or remove items
4. Click "Proceed to Checkout"

### Manage Products (Admin)
- **Add**: Click "Add Product" button
- **Edit**: Click "Edit" on product card
- **Delete**: Click "Delete" on product card
- **View Details**: Click "View" button

---

## 🎯 Key Features

✅ **Product Management**: Create, read, update, delete products  
✅ **Shopping Cart**: Add items, manage quantities, calculate totals  
✅ **Search**: Find products by name or description  
✅ **Persistent Cart**: Cart saved to browser storage  
✅ **Responsive UI**: Works on desktop, tablet, mobile  
✅ **Professional Design**: Material-UI components  

---

## 📞 Troubleshooting

| Problem | Solution |
|---------|----------|
| Frontend can't connect to backend | Ensure backend is running on port 3000 |
| CORS error | Check `server/app.js` has CORS enabled |
| Cart not saving | Check browser allows localStorage |
| Products not loading | Verify database is initialized |

---

## 📚 Documentation

- **[SETUP.md](SETUP.md)** - Detailed setup and features guide
- **[IMPLEMENTATION.md](IMPLEMENTATION.md)** - What was implemented and how

---

**Created with ❤️ using React, Material-UI, Express & SQLite**
