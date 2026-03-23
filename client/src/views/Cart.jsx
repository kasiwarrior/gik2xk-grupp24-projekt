import { useEffect, useState } from "react";
import axios from "../services/api";

function Cart() {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    async function load() {
      const res = await axios.get("/users/1/getCart");
      setCart(res.data);
    }

    load();
  }, []);

  if (!cart) return <p>Laddar...</p>;

  return (
    <div>
      <h2>Kundvagn</h2>

      {cart.cart_rows.map(row => (
        <div key={row.id}>
          {row.product.title} — {row.amount}
        </div>
      ))}
    </div>
  );
}

export default Cart;