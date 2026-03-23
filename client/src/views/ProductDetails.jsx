import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOne } from "../services/ProductService";
import axios from "../services/api";
import { Link } from "react-router-dom";
import { useUser } from "../contexts/userContext";

function ProductDetails() {
  const { id } = useParams();
  const { currentUser } = useUser();

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
      await axios.post(`/carts/${currentUser.id}/products`, {
        productId: Number(id),
        amount: 1
      });

      alert("Produkten lades till i kundvagnen");
    } catch (e) {
      e?.response ? console.log(e.response.data) : console.log(e);
      alert("Det gick inte att lägga till i kundvagnen");
    }
  }

  async function addRating() {
    try {
      await axios.post(`/products/${id}/ratings`, {
        userId: currentUser.id,
        score: Number(rating)
      });

      alert("Rating sparad");

      const updatedProduct = await getOne(id);
      setProduct(updatedProduct);
      setRating("");
    } catch (e) {
      e?.response ? console.log(e.response.data) : console.log(e);
      alert("Det gick inte att spara rating");
    }
  }

  if (!product) return <p>Laddar...</p>;

  const averageRating =
    product.ratings && product.ratings.length > 0
      ? (
          product.ratings.reduce((sum, r) => sum + r.score, 0) /
          product.ratings.length
        ).toFixed(1)
      : null;

  return (
    <div>
      <h2>{product.name}</h2>

      <p>{product.description}</p>

      <p>{product.price} kr</p>

      {product.imageUrl && (
        <img
          src={product.imageUrl}
          alt={product.name}
          width="200"
        />
      )}

      <div style={{ marginTop: "1rem" }}>
        <button onClick={addToCart}>Lägg i kundvagn</button>
      </div>

      <Link to="/cart">Gå till varukorg</Link>

      <h3>Snittbetyg</h3>
      {averageRating ? (
        <p>{averageRating} / 5</p>
      ) : (
        <p>Inga betyg än</p>
      )}

      <h3>Ratings</h3>

      {product.ratings && product.ratings.length > 0 ? (
        product.ratings.map((r, index) => (
          <div key={index}>
            <strong>{r.score} / 5</strong>
            <br />
            Av: {r.author}
            <br />
            {new Date(r.createdAt).toLocaleDateString()}
            <hr />
          </div>
        ))
      ) : (
        <p>Inga ratings än</p>
      )}

      <h3>Lägg betyg</h3>

      <input
        type="number"
        min="1"
        max="5"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      />

      <button onClick={addRating}>Skicka rating</button>
    </div>
  );
}

export default ProductDetails;