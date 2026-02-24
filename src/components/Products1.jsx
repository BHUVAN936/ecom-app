import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useEffect, useState } from "react";

function Products1() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
  axios.get("https://dummyjson.com/products")
    .then(res => {

      const apiProducts = res.data.products;
      const adminProducts =
        JSON.parse(localStorage.getItem("adminProducts")) || [];

      const visible =
        JSON.parse(localStorage.getItem("visibleProducts")) || [];

      const deleted =
        JSON.parse(localStorage.getItem("deletedProducts")) || [];

      const merged = [...apiProducts, ...adminProducts];

      const filtered = merged
        .filter(p => visible.includes(p.id))
        .filter(p => !deleted.includes(p.id));

      setProducts(filtered);
    });
}, []);

  const handleAddtoCart = (p) => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn === "true") {
      const cartData = JSON.parse(localStorage.getItem("cart")) || [];
      cartData.push(p);
      localStorage.setItem("cart", JSON.stringify(cartData));
      navigate("/cart");
    } else {
      alert("Please Login first !!!");
      navigate("/Login");
    }
  };

  return (
    <>
      <Header />

      <section className="products">
        {products.length === 0 ? (
          <h2 style={{textAlign:"center"}}>
            No products available (Admin has not selected any)
          </h2>
        ) : (
          products.map((p) => (
            <div className="product" key={p.id}>
              <img src={p.thumbnail} alt={p.title} />
              <h3>{p.title}</h3>
              <p>Category: {p.category}</p>
              <p>Price: ${p.price}</p>
              <button onClick={() => handleAddtoCart(p)}>
                Add to Cart
              </button>
            </div>
          ))
        )}
      </section>

      <Footer />
    </>
  );
}

export default Products1;
