import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import App from './App.jsx'
import Home from './views/Home.jsx'
import ProductEdit from './views/ProductEdit.jsx'
import ProductDetails from './views/ProductDetails.jsx'
import Cart from './views/Cart.jsx'
import UserList from './views/UserList.jsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
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