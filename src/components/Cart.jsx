import Header from "./Header";
import Footer from "./Footer";
import { useEffect, useState } from "react";

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartwithQty = cart.map(item => ({
      ...item,
      quantity : item.quantity ||  1 
    }))

    setCartItems(cartwithQty);
  }, []);

  let totalPrice = 0;
  cartItems.forEach(item => {
    totalPrice += item.price * item.quantity;
  });

  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);

    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
  const increaseQty = (index) => {
    const temp = [...cartItems];
    temp[index].quantity = temp[index].quantity + 1;
    setCartItems(temp);
    localStorage.setItem("cart", JSON.stringify(temp));
  };
  const decreaseQty = (index) => {
    const temp = [...cartItems];
    if (temp[index].quantity > 1) {
      temp[index].quantity = temp[index].quantity - 1;
      setCartItems(temp);
      localStorage.setItem("cart", JSON.stringify(temp));
    }
  };
  return (
    <>
      <Header />

      <div style={{ paddingTop: "120px", paddingBottom: "80px", textAlign: "center" }}>
        <h1>Your Cart</h1>

        {cartItems.length === 0 ? (
          <h3>No items in cart</h3>
        ) : (
          <div className="products">
            {cartItems.map((item, index) => (
              <div className="product" key={index}>
                <img src={item.thumbnail} alt={item.title} />
                <h3>{item.title}</h3>
                <p>Price: ${item.price}</p>
                 <div>
                  <button onClick={() => decreaseQty(index)}>-</button>
                  <span style={{ margin: "0 20px" }}>Item count: {item.quantity}</span>
                  <button onClick={() => increaseQty(index)}>+</button>
                </div>

                
                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    border: "none",
                    padding: "8px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    marginTop: "8px"
                  }}
                >
                  Remove
                </button>
               

              </div>
            ))}
          </div>
        )}

        <h1>totalPrice : ${totalPrice}</h1>
      </div>
    </>
  );
}

export default Cart;
