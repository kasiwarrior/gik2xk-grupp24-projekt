import axios from './api';

export async function getAll() {
  try {
    const response = await axios.get('/products');
    if (response.status === 200) return response.data.data;
    return [];
  } catch (e) {
    e?.response ? console.log(e.response.data) : console.log(e);
    return [];
  }
}

export async function getOne(id) {
  try {
    const response = await axios.get(`/products/${id}`);
    if (response.status === 200) return response.data.data;
    return null;
  } catch (e) {
    e?.response ? console.log(e.response.data) : console.log(e);
    return null;
  }
}

export async function create(product) {
  try {
    const response = await axios.post('/products', product);
    if (response.status === 200 || response.status === 201) return response.data;
    return null;
  } catch (e) {
    e?.response ? console.log(e.response.data) : console.log(e);
    return null;
  }
}

export async function update(id, product) {
  try {
    const response = await axios.put(`/products/${id}`, product);
    if (response.status === 200) return response.data;
    return null;
  } catch (e) {
    e?.response ? console.log(e.response.data) : console.log(e);
    return null;
  }
}

export async function remove(id) {
  try {
    const response = await axios.delete(`/products/${id}`);
    return response.data;
  } catch (e) {
    console.error("Kunde inte ta bort produkt", e);
    throw e;
  }
}