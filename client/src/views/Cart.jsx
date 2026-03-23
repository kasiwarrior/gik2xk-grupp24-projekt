import { useEffect, useState } from "react";
import axios from "../services/api";
import { useUser } from "../contexts/userContext";

function Cart() {
  const { currentUser } = useUser();

  const [cart, setCart] = useState(null);

  useEffect(() => {

    async function load() {

      const res = await axios.get(`/users/${currentUser.id}/carts/latest`);

      setCart(res.data.data);

    }

    load();

  }, []);

  if (!cart) return <p>Laddar...</p>;

  return (
    <div>

      <h2>Kundvagn</h2>

      {cart.products.map(product => (

        <div key={product.id}>

          {product.name}
          {product.description}

        </div>

      ))}

    </div>
  );
}

export default Cart;