import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOne } from "../services/ProductService";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function load() {
      const data = await getOne(id);
      setProduct(data);
    }

    load();
  }, [id]);

  if (!product) return <p>Laddar...</p>;

  return (
    <div>
      <h2>{product.title}</h2>

      <p>{product.description}</p>

      <p>{product.price} kr</p>
    </div>
  );
}

export default ProductDetails;