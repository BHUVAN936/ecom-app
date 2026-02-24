import axios from "axios";
import { useEffect, useState } from "react";
import Header from "./Header";

function Admin() {

  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState([]);
  const [deleted, setDeleted] = useState([]);

  
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    axios.get("https://dummyjson.com/products")
      .then(res => {

        const apiProducts = res.data.products;
        const adminProducts =
          JSON.parse(localStorage.getItem("adminProducts")) || [];

        const savedVisible =
          JSON.parse(localStorage.getItem("visibleProducts")) || [];

        const savedDeleted =
          JSON.parse(localStorage.getItem("deletedProducts")) || [];

        const merged = [...apiProducts, ...adminProducts];

     
        const filtered = merged.filter(
          p => !savedDeleted.includes(p.id)
        );

        setProducts(filtered);
        setSelected(savedVisible);
        setDeleted(savedDeleted);
      });
  }, []);

 
  const handleAddProduct = () => {
    if (!title || !price || !category || !image) {
      alert("Fill all fields");
      return;
    }

    const newProduct = {
      id: Date.now(),   // unique id
      title,
      price,
      category,
      thumbnail: image
    };

    const existing =
      JSON.parse(localStorage.getItem("adminProducts")) || [];

    const updated = [...existing, newProduct];
    localStorage.setItem("adminProducts", JSON.stringify(updated));

    setProducts([...products, newProduct]);

  
    setTitle("");
    setPrice("");
    setCategory("");
    setImage("");
  };

  
  const handleSelect = (id) => {
    let updated;

    if (selected.includes(id)) {
      updated = selected.filter(p => p !== id);
    } else {
      updated = [...selected, id];
    }

    setSelected(updated);
    localStorage.setItem("visibleProducts", JSON.stringify(updated));
  };

  const handleDelete = (id) => {
    const updatedDeleted = [...deleted, id];
    setDeleted(updatedDeleted);
    localStorage.setItem("deletedProducts", JSON.stringify(updatedDeleted));

    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <>
      <Header />

      <h2 style={{textAlign:"center"}}>Admin Panel</h2>

    
      <div style={{textAlign:"center", marginBottom:"30px"}}>
        <h3>Add Product</h3>

        <input
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <br /><br />

        <input
          placeholder="Price"
          value={price}
          onChange={e => setPrice(e.target.value)}
        />
        <br /><br />

        <input
          placeholder="Category"
          value={category}
          onChange={e => setCategory(e.target.value)}
        />
        <br /><br />

        <input
          placeholder="Image URL"
          value={image}
          onChange={e => setImage(e.target.value)}
        />
        <br /><br />

        <button onClick={handleAddProduct}>
          Add Product
        </button>
      </div>

    
      <section className="products">
        {products.map(p => (
          <div className="product" key={p.id}>
            <img src={p.thumbnail} alt={p.title} />
            <h4>{p.title}</h4>
            <p>${p.price}</p>

            <label>
              <input
                type="checkbox"
                checked={selected.includes(p.id)}
                onChange={() => handleSelect(p.id)}
              />
              Show to users
            </label>

            <br />

            <button
              style={{background:"red", color:"white", marginTop:"8px"}}
              onClick={() => handleDelete(p.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </section>
    </>
  );
}

export default Admin;
