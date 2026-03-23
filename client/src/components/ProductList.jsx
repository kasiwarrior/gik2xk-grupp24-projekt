import { useEffect, useState } from "react";
import { getAll } from "../services/ProductService";
import { Link } from "react-router-dom";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      const data = await getAll();

      console.log("Produkter från backend:", data);

      setProducts(data);
    }

    loadProducts();
  }, []);

  return (
    <div>
      {products.length === 0 && <p>Inga produkter hittades</p>}

      {products.map(product => (
        <div key={product.id}>

          <h3>{product.name}</h3>

          <p>{product.price} kr</p>

          <Link to={`/products/${product.id}`}>
            Visa produkt
          </Link>

          <br />

          <Link to={`/products/${product.id}/edit`}>
            Ändra produkt
          </Link>

          <hr />

        </div>
      ))}
    </div>
  );
}

export default ProductList;