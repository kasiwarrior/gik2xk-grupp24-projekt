import { useEffect, useState } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { getOne } from "../services/ProductService";
import axios from "../services/api";
import { useUser } from "../contexts/UserContext";
import { useSnackbar } from "../contexts/SnackbarContext"; // Importerade dina snygga notiser!

// MUI
import {
  Box,
  Typography,
  Button,
  TextField,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  Divider,
  Alert,
  Rating
} from "@mui/material";

function ProductDetails() {
  const { id } = useParams();
  const { currentUser } = useUser();
  const { showSnackbar } = useSnackbar(); // Hämta showSnackbar

  const [product, setProduct] = useState(null);
  const [rating, setRating] = useState("");
  const [amount, setAmount] = useState(1);

  useEffect(() => {
    async function load() {
      const data = await getOne(id);
      setProduct(data);
    }
    load();
  }, [id]);

  async function addToCart() {
    if (!currentUser) {
      showSnackbar("Vänligen logga in för att lägga till i varukorg", "warning");
      return;
    }
    
    try {
      // 1. Hämta den inloggade användarens senaste varukorg
      const cartResponse = await axios.get(`/users/${currentUser.id}/carts/latest`);
      const actualCartId = cartResponse.data.data.id; // Plocka ut det riktiga varukorgs-IDt

      // 2. Använd det riktiga varukorgs-IDt för att lägga till produkten
      await axios.post(`/carts/${actualCartId}/products`, {
        productId: Number(id),
        amount: Number(amount)
      });
      
      showSnackbar(`${amount} st lades till i kundvagnen!`, "success");
    } catch (e) {
      console.error(e?.response ? e.response.data : e);
      showSnackbar("Det gick inte att lägga till i kundvagnen", "error");
    }
  }

  async function addRating() {
    if (!currentUser) {
      showSnackbar("Vänligen logga in för att lämna ett betyg", "warning");
      return;
    }

    try {
      await axios.post(`/products/${id}/ratings`, {
        userId: currentUser.id,
        score: Number(rating)
      });

      showSnackbar("Ditt betyg har sparats!", "success");

      const updatedProduct = await getOne(id);
      setProduct(updatedProduct);
      setRating("");
    } catch (e) {
      console.error(e?.response ? e.response.data : e);
      showSnackbar("Det gick inte att spara rating", "error");
    }
  }

  if (!product) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  const averageRating =
    product.ratings && product.ratings.length > 0
      ? (
          product.ratings.reduce((sum, r) => sum + r.score, 0) /
          product.ratings.length
        ).toFixed(1)
      : null;

  return (
    <Box sx={{ maxWidth: 900, margin: "0 auto", padding: 3 }}>
      
      <Button component={RouterLink} to="/" sx={{ mb: 2 }}>
        &larr; Tillbaka till produkter
      </Button>

      {/* Produktkortet */}
      <Card sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, mb: 4, boxShadow: 3 }}>
        
        {/* Bild */}
        {product.imageUrl ? (
          <CardMedia
            component="img"
            sx={{ width: { xs: "100%", md: 400 }, objectFit: "cover" }}
            image={product.imageUrl}
            alt={product.name}
          />
        ) : (
          <Box sx={{ width: { xs: "100%", md: 400 }, minHeight: 300, backgroundColor: "grey.200", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Typography variant="caption" color="text.secondary">Ingen bild</Typography>
          </Box>
        )}

        {/* Information o Köp */}
        <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <Box>
            <Typography variant="h3" gutterBottom fontWeight="bold">
              {product.name}
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              {product.description}
            </Typography>
            <Typography variant="h4" color="success.main" fontWeight="bold" gutterBottom>
              {product.price} kr
            </Typography>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Varukorgssektionen */}
          {currentUser ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <TextField
                label="Antal"
                type="number"
                inputProps={{ min: 1 }}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                sx={{ width: 100 }}
              />
              <Button variant="contained" color="primary" size="large" onClick={addToCart}>
                Lägg i kundvagn
              </Button>
            </Box>
          ) : (
            <Alert severity="warning">Logga in för att lägga till i kundvagnen.</Alert>
          )}

        </CardContent>
      </Card>

      <Button component={RouterLink} to="/cart" variant="outlined" sx={{ mb: 4 }}>
        Gå till varukorg
      </Button>

      {/* Betygssektion */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Recensioner
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
          <Typography variant="h6">
            Snittbetyg: {averageRating ? `${averageRating} / 5` : "Inga betyg än"}
          </Typography>
          {/* MUI element */}
          {averageRating && <Rating value={Number(averageRating)} precision={0.1} readOnly />}
        </Box>

        {/* Lägg till eget betyg */}
        {currentUser ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4, p: 2, backgroundColor: "#f9f9f9", borderRadius: 2 }}>
            <TextField
              label="Ditt betyg (1-5)"
              type="number"
              inputProps={{ min: 1, max: 5 }}
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              sx={{ width: 150 }}
            />
            <Button variant="contained" color="secondary" onClick={addRating}>
              Skicka rating
            </Button>
          </Box>
        ) : (
          <Alert severity="info" sx={{ mb: 4 }}>Logga in för att lämna en recension.</Alert>
        )}

        {/* Lista med recensioner */}
        {product.ratings && product.ratings.length > 0 ? (
          product.ratings.map((r, index) => (
            <Card key={index} sx={{ mb: 2, p: 2, boxShadow: 1 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography variant="subtitle2" fontWeight="bold">
                  Av: {r.author}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {new Date(r.createdAt).toLocaleDateString()}
                </Typography>
              </Box>
              <Rating value={r.score} readOnly size="small" sx={{ mb: 1 }} />
              <Typography variant="body2">Betyg: {r.score} av 5</Typography>
            </Card>
          ))
        ) : (
          <Typography color="text.secondary">Det finns inga recensioner för denna produkt ännu.</Typography>
        )}
      </Box>

    </Box>
  );
}

export default ProductDetails;