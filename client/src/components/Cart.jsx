import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../services/api";

function Cart() {
  const { id } = useParams();

  const userId = id || 1;

  const [cart, setCart] = useState(null);

  //Hämtar senaste varukorgen för vald användare.
  useEffect(() => {
    async function load() {
      try {
        const res = await axios.get(`/users/${userId}/carts/latest`);
        setCart(res.data.data);
      } catch (e) {
        e?.response ? console.log(e.response.data) : console.log(e);
      }
    }

    load();
  }, [userId]);

  if (!cart) return <p>Laddar...</p>;

  //Räknar ut totalsumman.
  const totalPrice = cart.products.reduce(
    (sum, product) => sum + product.price * product.cartRow.amount,
    0
  );

  return (
    <div>
      <h2>Kundvagn för användare {userId}</h2>

      {cart.products.length === 0 && <p>Varukorgen är tom</p>}

      {cart.products.map((product) => (
        <div key={product.id}>
          <strong>{product.name}</strong>
          <br />
          Pris: {product.price} kr
          <br />
          Antal: {product.cartRow.amount}
          <br />
          Radpris: {product.price * product.cartRow.amount} kr
          <hr />
        </div>
      ))}

      <h3>Totalsumma: {totalPrice} kr</h3>
    </div>
  );
}

export default Cart;