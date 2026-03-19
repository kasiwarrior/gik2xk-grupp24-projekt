import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Home from './views/Home.jsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import ProductEdit from './views/ProductEdit.jsx';


const router = createBrowserRouter([
  { 
  path: '/',
  element: <App />,
  children: [
    {
    path: '/',
    element: <Home />
    },
    {
    path: '/product/new',
    element: <ProductEdit/>
    }
  ]
},
  
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
