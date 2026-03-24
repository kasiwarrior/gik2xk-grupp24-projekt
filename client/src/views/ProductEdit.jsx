import { useEffect, useState } from "react";
import { create, getOne, update } from "../services/ProductService";
import { useNavigate, useParams } from "react-router-dom";
import {
  Paper,
  Stack,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";

function ProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  //Samma komponent både för att skapa och ändra produkter.
  const isEditMode = Boolean(id);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    async function loadProduct() {
      if (!isEditMode) return;

      //Hämtar befintlig produkt om användaren redigerar.
      const product = await getOne(id);
      if (product) {
        setTitle(product.name ?? "");
        setDescription(product.description ?? "");
        setPrice(product.price ?? "");
        setImageUrl(product.imageUrl ?? "");
      }
    }

    loadProduct();
  }, [id, isEditMode]);

  async function handleSubmit(e) {
    e.preventDefault();

    const productData = {
      name: title,
      description,
      price: Number(price),
      imageUrl,
    };

    if (isEditMode) {
      await update(id, productData);
      alert("Produkt uppdaterad");
    } else {
      await create(productData);
      alert("Produkt skapad");
    }

    navigate("/");
  }

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 700, mx: "auto", borderRadius: 3 }}>
      <Stack spacing={3} component="form" onSubmit={handleSubmit}>
        <Typography variant="h4" fontWeight={700}>
          {isEditMode ? "Ändra produkt" : "Skapa produkt"}
        </Typography>

        <TextField
          label="Titel"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />

        <TextField
          label="Beskrivning"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          minRows={4}
          fullWidth
        />

        <TextField
          label="Pris"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          fullWidth
        />

        <TextField
          label="Bild-URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          fullWidth
        />

        {imageUrl && (
          <Box>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Förhandsvisning
            </Typography>
            <Box
              component="img"
              src={imageUrl}
              alt="Förhandsvisning"
              sx={{
                width: 220,
                borderRadius: 2,
                border: "1px solid #ddd",
              }}
            />
          </Box>
        )}

        <Button type="submit" variant="contained" size="large">
          {isEditMode ? "Spara ändringar" : "Skapa produkt"}
        </Button>
      </Stack>
    </Paper>
  );
}

export default ProductEdit;