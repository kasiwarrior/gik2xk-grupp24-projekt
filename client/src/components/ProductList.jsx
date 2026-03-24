import { useEffect, useState } from "react";
import { getAll, remove } from "../services/ProductService"; 
import { Link as RouterLink } from "react-router-dom";
import { useSnackbar } from "../contexts/SnackbarContext";

// MUI
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Grid,
  CircularProgress,
  Alert
} from "@mui/material";

function ProductList() {
  const [products, setProducts] = useState(null);
  const { showSnackbar } = useSnackbar(); // Hämta showSnackbar

  useEffect(() => {
    async function loadProducts() {
      const data = await getAll();
      setProducts(data || []);
    }

    loadProducts();
  }, []);

  async function handleDelete(productId) {
    // Fråga användaren om de är säkra 
    const isConfirmed = window.confirm("Är du säker på att du vill ta bort den här produkten?");
    if (!isConfirmed) return;

    try {
      // Anropa backend för att radera produkten
      await remove(productId);
      
      // Uppdatera listan på skärmen direkt
      setProducts(products.filter(product => product.id !== productId));
      
      // Visa bekräftelse
      showSnackbar("Produkten har tagits bort!", "success");
    } catch (error) {
      showSnackbar("Det gick inte att ta bort produkten.", "error");
    }
  }

  if (products === null) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (products.length === 0) {
    return <Alert severity="info">Inga produkter hittades i databasen.</Alert>;
  }

  return (
    <Grid container spacing={4}>
      {products.map(product => (
        <Grid item xs={12} sm={6} md={4} key={product.id}>
          <Card 
            sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              boxShadow: 2,
              transition: '0.3s',
              '&:hover': { boxShadow: 6, transform: 'translateY(-4px)' } 
            }}
          >
            {product.imageUrl ? (
              <CardMedia
                component="img"
                height="200"
                image={product.imageUrl}
                alt={product.name}
                sx={{ objectFit: 'cover' }}
              />
            ) : (
              <Box sx={{ height: 200, backgroundColor: "grey.200", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Typography variant="caption" color="text.secondary">Ingen bild</Typography>
              </Box>
            )}
            
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h6" component="h2" fontWeight="bold">
                {product.name}
              </Typography>
              <Typography variant="h6" color="success.main" fontWeight="bold">
                {product.price} kr
              </Typography>
            </CardContent>
            
            <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
              <Button 
                component={RouterLink} 
                to={`/products/${product.id}`} 
                variant="contained" 
                color="primary" 
                size="small"
              >
                Visa
              </Button>
              <Button 
                component={RouterLink} 
                to={`/products/${product.id}/edit`} 
                variant="outlined" 
                color="secondary" 
                size="small"
              >
                Ändra
              </Button>


              <Button 
                variant="outlined" 
                color="error" 
                size="small"
                onClick={() => handleDelete(product.id)}
              >
                Ta bort
              </Button>
            </CardActions>
            
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default ProductList;