import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import App from "./App.jsx";
import Home from "./views/Home.jsx";
import ProductEdit from "./views/ProductEdit.jsx";
import ProductDetails from "./views/ProductDetails.jsx";
import Cart from "./views/Cart.jsx";
import UserList from "./views/UserList.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { UserProvider } from "./contexts/UserContext.jsx";
import { SnackbarProvider } from "./contexts/SnackbarContext";

import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/theme";

//Router för frontendens olika vyer.
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "products/new",
        element: <ProductEdit />,
      },
      {
        path: "products/:id/edit",
        element: <ProductEdit />,
      },
      {
        path: "products/:id",
        element: <ProductDetails />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "users",
        element: <UserList />,
      },
      {
        path: "users/:id/cart",
        element: <Cart />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <ThemeProvider theme={theme}>
        <SnackbarProvider>
          <RouterProvider router={router} />
        </SnackbarProvider>
      </ThemeProvider>
    </UserProvider>
  </StrictMode>
);