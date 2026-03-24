import ProductList from "../components/ProductList";
import { Box, Typography } from "@mui/material";


//Startsidan 
function Home() {
  return (
    <Box sx={{ maxWidth: 1200, margin: "0 auto", padding: 3 }}>
      <Typography 
        variant="h3" 
        component="h1" 
        gutterBottom 
        fontWeight="bold" 
        align="center" 
        sx={{ mb: 5, mt: 2 }}
      >
        Produkter
      </Typography>
      
      <ProductList />
    </Box>
  );
}

export default Home;