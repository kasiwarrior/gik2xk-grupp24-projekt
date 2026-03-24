import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../services/api";
import {
  Paper,
  Stack,
  Typography,
  Divider,
  Box,
} from "@mui/material";

function Cart() {
  const { id } = useParams();
  const userId = id || 1;

  const [cart, setCart] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await axios.get(`/users/${userId}/carts/latest`);
        setCart(res.data.data);
      } catch (e) {
        console.log(e);
      }
    }

    load();
  }, [userId]);

  if (!cart) return <Typography>Laddar...</Typography>;

  const totalPrice = cart.products.reduce(
    (sum, product) => sum + product.price * product.cartRow.amount,
    0
  );

  return (
    <Stack spacing={3}>
      <Typography variant="h4" fontWeight={700}>
        Kundvagn
      </Typography>

      {cart.products.length === 0 ? (
        <Typography>Varukorgen är tom</Typography>
      ) : (
        cart.products.map((product) => (
          <Paper key={product.id} sx={{ p: 3, borderRadius: 3 }}>
            <Stack spacing={1}>
              <Typography variant="h6" fontWeight={700}>
                {product.name}
              </Typography>
              <Typography>Pris: {product.price} kr</Typography>
              <Typography>Antal: {product.cartRow.amount}</Typography>
              <Typography>
                Radpris: {product.price * product.cartRow.amount} kr
              </Typography>
            </Stack>
          </Paper>
        ))
      )}

      <Divider />

      <Box>
        <Typography variant="h5" fontWeight={700}>
          Totalsumma: {totalPrice} kr
        </Typography>
      </Box>
    </Stack>
  );
}

export default Cart;