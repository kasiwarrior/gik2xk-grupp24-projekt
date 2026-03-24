import { Typography, Stack } from "@mui/material";
import ProductList from "../components/ProductList";

function Home() {
  return (
    <Stack spacing={3}>
      <Typography variant="h3" fontWeight={700}>
        Produkter
      </Typography>

      <ProductList />
    </Stack>
  );
}

export default Home;