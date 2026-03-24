import { useEffect, useState } from "react";
import axios from "../services/api";
import { useUser } from "../contexts/UserContext";
import { useSnackbar } from "../contexts/SnackbarContext"; // Importera vår nya Snackbar!

// MUI
import { 
  Box, 
  Typography, 
  Card, 
  CardMedia, 
  CardContent, 
  Divider, 
  CircularProgress, 
  Alert,
  Button
} from "@mui/material";

function Cart() {
  const { currentUser } = useUser();
  const { showSnackbar } = useSnackbar(); // Hämta funktionen för att visa notiser
  const [cart, setCart] = useState(null);

  // Vi bryter ut laddningen till en egen funktion så vi kan anropa den igen efter betalning
  async function loadCart() {
    try {
      const res = await axios.get(`/users/${currentUser.id}/carts/latest`);
      setCart(res.data.data);
    } catch (e) {
      console.error("Kunde inte hämta kundvagn:", e);
    }
  }

  useEffect(() => {
    if (!currentUser) return;
    loadCart();
  }, [currentUser]);

  // --- NY FUNKTION FÖR ATT BETALA ---
  async function handleCheckout() {
    if (!cart || cart.products.length === 0) return;

    try {
      //Markera den nuvarande varukorgen som betald i databasen
      await axios.put(`/carts/${cart.id}/pay`);

      //Skapa en ny, tom varukorg åt användaren
      await axios.post(`/users/${currentUser.id}/carts`);

      // Visa ett success meddelande
      showSnackbar("Köp genomfört! Tack för din beställning.", "success");

      // Ladda om kundvagnen
      loadCart();

    } catch (e) {
      console.error(e);
      showSnackbar("Något gick fel vid betalningen.", "error");
    }
  }

  // Felmeddelande om man inte är inloggad
  if (!currentUser) {
    return (
      <Box sx={{ p: 4, maxWidth: 600, margin: "auto" }}>
        <Alert severity="warning">Vänligen logga in för att se din varukorg.</Alert>
      </Box>
    );
  }

  // Laddningssnurra
  if (!cart) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  const totalPrice = cart.products.reduce(
    (sum, product) => sum + product.price * product.cartRow.amount,
    0
  );

  return (
    <Box sx={{ maxWidth: 800, margin: "0 auto", padding: 3 }}>
      
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Kundvagn
      </Typography>

      {cart.products.length === 0 ? (
        <Alert severity="info">Din varukorg är tom.</Alert>
      ) : (
        cart.products.map(product => (
          <Card 
            key={product.id} 
            sx={{ 
              display: "flex", 
              alignItems: "center",
              marginBottom: 2, 
              boxShadow: 2,
              borderRadius: 2
            }}>

            {product.imageUrl ? (
              <CardMedia
                component="img"
                sx={{ width: 120, height: 120, objectFit: "cover" }}
                image={product.imageUrl}
                alt={product.name}
              />
            ) : (
              <Box 
                sx={{ width: 120, height: 120, backgroundColor: "grey.200", display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <Typography variant="caption" color="text.secondary">Ingen bild</Typography>
              </Box>
            )}

            <CardContent sx={{ flex: 1 }}>
              <Typography variant="h6" component="div">
                {product.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Pris: {product.price} kr / st
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                Antal: {product.cartRow.amount} st
              </Typography>
            </CardContent>

            <Box sx={{ paddingRight: 3 }}>
              <Typography variant="h6" color="success.main" fontWeight="bold">
                {product.price * product.cartRow.amount} kr
              </Typography>
            </Box>

          </Card>
        ))
      )}

      <Divider sx={{ my: 3 }} />

      {/* Box som lägger Totalsumma och Betala-knappen brevid varandra */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h5" fontWeight="bold">
          Totalsumma: {totalPrice} kr
        </Typography>

        {/* Visa bara Betala-knappen om det faktiskt finns produkter i varukorgen */}
        {cart.products.length > 0 && (
          <Button 
            variant="contained" 
            color="success" 
            size="large" 
            onClick={handleCheckout}
            sx={{ px: 4, py: 1.5, fontSize: "1.1rem", fontWeight: "bold" }}
          >
            Betala nu
          </Button>
        )}
      </Box>
      
    </Box>
  );
}

export default Cart;