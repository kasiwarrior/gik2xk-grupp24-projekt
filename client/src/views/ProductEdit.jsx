import { useEffect, useState } from "react";
import { create, getOne, update } from "../services/ProductService";
import { useNavigate, useParams } from "react-router-dom";

function ProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    async function loadProduct() {
      if (!isEditMode) return;

      const product = await getOne(id);
      if (product) {
        setTitle(product.name ?? "");
        setDescription(product.description ?? "");
        setPrice(product.price ?? "");
        setImageUrl(product.imageUrl ?? "");
      }
    }

    loadProduct();
  }, [id, isEditMode]);

  async function handleSubmit(e) {
    e.preventDefault();

    const productData = {
      name: title,
      description,
      price: Number(price),
      imageUrl,
    };

    if (isEditMode) {
      await update(id, productData);
      alert("Produkt uppdaterad");
    } else {
      await create(productData);
      alert("Produkt skapad");
    }

    navigate("/");
  }

  return (
    <div>
      <h2>{isEditMode ? "Ändra produkt" : "Skapa produkt"}</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Titel"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <textarea
            placeholder="Beskrivning"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <input
            type="number"
            placeholder="Pris"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="Bild-URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>

        {imageUrl && (
          <div>
            <p>Förhandsvisning:</p>
            <img src={imageUrl} alt="Förhandsvisning" width="200" />
          </div>
        )}

        <button type="submit">
          {isEditMode ? "Spara ändringar" : "Skapa produkt"}
        </button>
      </form>
    </div>
  );
}

export default ProductEdit;