import { useEffect, useState } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { getOne } from "../services/ProductService";
import axios from "../services/api";
import {
  Grid,
  Paper,
  Typography,
  Button,
  Stack,
  TextField,
  Box,
  Divider,
} from "@mui/material";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [rating, setRating] = useState("");

  useEffect(() => {
    async function load() {
      const data = await getOne(id);
      setProduct(data);
    }

    load();
  }, [id]);

  async function addToCart() {
    try {
      await axios.post("/carts/1/products", {
        productId: Number(id),
        amount: 1,
      });

      alert("Produkten lades till i kundvagnen");
    } catch (e) {
      alert("Det gick inte att lägga till i kundvagnen");
    }
  }

  async function addRating() {
    try {
      await axios.post(`/products/${id}/ratings`, {
        userId: 1,
        score: Number(rating),
      });

      const updatedProduct = await getOne(id);
      setProduct(updatedProduct);
      setRating("");
      alert("Betyg sparat");
    } catch (e) {
      alert("Det gick inte att spara betyget");
    }
  }

  if (!product) return <Typography>Laddar...</Typography>;

  const averageRating =
    product.ratings && product.ratings.length > 0
      ? (
          product.ratings.reduce((sum, r) => sum + r.score, 0) /
          product.ratings.length
        ).toFixed(1)
      : null;

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={5}>
        <Paper sx={{ p: 2, borderRadius: 3 }}>
          {product.imageUrl ? (
            <Box
              component="img"
              src={product.imageUrl}
              alt={product.name}
              sx={{ width: "100%", borderRadius: 2 }}
            />
          ) : (
            <Box
              sx={{
                height: 320,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "#eee",
                borderRadius: 2,
              }}
            >
              <Typography>Ingen bild</Typography>
            </Box>
          )}
        </Paper>
      </Grid>

      <Grid item xs={12} md={7}>
        <Paper sx={{ p: 4, borderRadius: 3 }}>
          <Stack spacing={3}>
            <Typography variant="h4" fontWeight={700}>
              {product.name}
            </Typography>

            <Typography variant="h5" color="primary" fontWeight={700}>
              {product.price} kr
            </Typography>

            <Typography variant="body1">
              {product.description || "Ingen beskrivning"}
            </Typography>

            <Stack direction="row" spacing={2}>
              <Button variant="contained" onClick={addToCart}>
                Lägg i kundvagn
              </Button>

              <Button variant="outlined" component={RouterLink} to="/cart">
                Gå till varukorg
              </Button>
            </Stack>

            <Divider />

            <Typography variant="h6" fontWeight={700}>
              Snittbetyg
            </Typography>

            <Typography>
              {averageRating ? `${averageRating} / 5` : "Inga betyg än"}
            </Typography>

            <Typography variant="h6" fontWeight={700}>
              Lägg betyg
            </Typography>

            <Stack direction="row" spacing={2}>
              <TextField
                type="number"
                inputProps={{ min: 1, max: 5 }}
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                label="Betyg 1-5"
              />
              <Button variant="contained" onClick={addRating}>
                Skicka
              </Button>
            </Stack>

            <Divider />

            <Typography variant="h6" fontWeight={700}>
              Ratings
            </Typography>

            {product.ratings && product.ratings.length > 0 ? (
              <Stack spacing={2}>
                {product.ratings.map((r, index) => (
                  <Paper key={index} variant="outlined" sx={{ p: 2 }}>
                    <Typography fontWeight={700}>{r.score} / 5</Typography>
                    <Typography variant="body2">Av: {r.author}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {new Date(r.createdAt).toLocaleDateString()}
                    </Typography>
                  </Paper>
                ))}
              </Stack>
            ) : (
              <Typography>Inga ratings än</Typography>
            )}
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default ProductDetails;