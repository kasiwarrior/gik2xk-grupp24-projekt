import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import App from './App.jsx'
import Home from './views/Home.jsx'
<<<<<<< Updated upstream
import ProductEdit from './views/ProductEdit.jsx'
import ProductDetails from './views/ProductDetails.jsx'
import Cart from './views/Cart.jsx'
import UserList from './views/UserList.jsx'
=======
import Cart from './views/Cart.jsx'
import ProductDetails from './views/ProductDetails.jsx'
import ProductEdit from './views/ProductEdit.jsx'
import { CartProvider } from './context/CartContext.jsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
>>>>>>> Stashed changes

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
<<<<<<< Updated upstream
  {
=======
  { 
>>>>>>> Stashed changes
    path: '/',
    element: <App />,
    children: [
      {
<<<<<<< Updated upstream
        index: true,
        element: <Home />
      },
      {
        path: 'products/new',
        element: <ProductEdit />
      },
      {
        path: 'products/:id/edit',
        element: <ProductEdit />
      },
      {
        path: 'products/:id',
        element: <ProductDetails />
      },
      {
        path: 'cart',
        element: <Cart />
      },
      {
        path: 'users',
        element: <UserList />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
=======
        path: '/',
        element: <Home />
      },
      {
        path: '/cart',
        element: <Cart />
      },
      {
        path: '/product/new',
        element: <ProductEdit />
      },
      {
        path: '/product/:id',
        element: <ProductDetails />
      },
      {
        path: '/product/:id/edit',
        element: <ProductEdit />
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </StrictMode>,
)

>>>>>>> Stashed changes
