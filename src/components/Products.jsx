import mobile1 from"../Images/download (1).jpg"
import mobile2 from"../Images/download (2).jpg"
import mobile3 from"../Images/download.jpg"
import mobile4 from"../Images/images.jpg"
import mobile5 from "../Images/image1.jpg"
import { useNavigate } from "react-router-dom"
function Products(){
    const navigate = useNavigate();
    const handleAddtoCart = () =>{
        const isLoggedIn = localStorage.getItem("is Logged in");
        if(isLoggedIn == "true"){
            navigate("/cart");
        }else{
            alert("Please Login first !!!");
            navigate("/Login");
        }
    };
    return (
        <>
          <div className="products-page">
        <div className="products-container">
            <div className="product-card">
                <img src = {mobile1} alt= "Iphone 15"/>
                <h3> Iphone 15 </h3>
                <p> Rs . 69,999/-</p>
                <button onClick={handleAddtoCart}>Add to Cart </button>
            </div>
      
            <div className="product-card">
                <img src = {mobile2} alt= "Vivo v60"/>
                <h3> Vivo v60</h3>
                <p> Rs . 39,999/-</p>
                <button onClick={handleAddtoCart}>Add to Cart </button>
            </div>
    
            <div className="product-card">
                <img src = {mobile3} alt="OnePlus"/>
                <h3> OnePlus CE</h3>
                <p> Rs . 59,999/-</p>
                <button onClick={handleAddtoCart}> Add to Cart</button>
            </div>
       
            <div className="product-card">
                <img src = {mobile4} alt="IQOO 15"/>
                <h3> IQOO 15 5G</h3>
                <p> Rs . 89,999/-</p>
                <button onClick={handleAddtoCart}> Add to Cart</button>
            </div>
             <div className="product-card">
                <img src = {mobile5} alt="OnePlus Nord CE"/>
                <h3> OnePlus Nord CE</h3>
                <p> Rs . 29,999/-</p>
                <button onClick={handleAddtoCart}> Add to Cart</button>
            </div>
        </div>
        </div>
        </>
    )
}
export default Products