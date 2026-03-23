import { useEffect, useState } from "react";
import axios from "../services/api";

function Cart() {

  const [cart, setCart] = useState(null);

  useEffect(() => {

    async function load() {

      const res = await axios.get("/users/1/carts/latest");

      setCart(res.data.data);

    }

    load();

  }, []);


  if (!cart) return <p>Laddar...</p>;


  const totalPrice = cart.products.reduce(
    (sum, product) =>
      sum + product.price * product.cartRow.amount,
    0
  );


  return (
    <div>

      <h2>Kundvagn</h2>


      {cart.products.length === 0 && (
        <p>Varukorgen är tom</p>
      )}


      {cart.products.map(product => (

        <div key={product.id}>

          <strong>{product.name}</strong>

          <br />

          Pris: {product.price} kr

          <br />

          Antal: {product.cartRow.amount}

          <br />

          Radpris:
          {product.price * product.cartRow.amount} kr

          <hr />

        </div>

      ))}


      <h3>Totalsumma: {totalPrice} kr</h3>


    </div>
  );

}

export default Cart;