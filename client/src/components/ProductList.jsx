import { useEffect, useState } from "react";
import { getAll } from "../services/ProductService";
import { Link as RouterLink } from "react-router-dom";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Stack,
  CardActions,
} from "@mui/material";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      const data = await getAll();
      setProducts(data);
    }

    loadProducts();
  }, []);

  if (products.length === 0) {
    return <Typography>Inga produkter hittades</Typography>;
  }

  return (
    <Grid container spacing={3}>
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={4} key={product.id}>
          <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
            {product.imageUrl && (
              <CardMedia
                component="img"
                height="220"
                image={product.imageUrl}
                alt={product.name}
              />
            )}

            <CardContent sx={{ flexGrow: 1 }}>
              <Stack spacing={1}>
                <Typography variant="h5" fontWeight={700}>
                  {product.name}
                </Typography>

                <Typography variant="h6" color="primary">
                  {product.price} kr
                </Typography>
              </Stack>
            </CardContent>

            <CardActions sx={{ px: 2, pb: 2 }}>
              <Stack direction="row" spacing={1}>
                <Button
                  variant="contained"
                  component={RouterLink}
                  to={`/products/${product.id}`}
                >
                  Visa
                </Button>

                <Button
                  variant="outlined"
                  component={RouterLink}
                  to={`/products/${product.id}/edit`}
                >
                  Ändra
                </Button>
              </Stack>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default ProductList;