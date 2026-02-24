import { HashRouter, Route, Routes } from "react-router-dom"
import Layout from "./components/Layout" 
import Home from "./components/Home"
import "./components/styles.css"
import Products from "./components/products"
import Login from "./components/Login"
import Cart from "./components/Cart"
import Products1 from "./components/Products1"
import Signup from "./components/Signup"
import Admin from "./components/Admin"
function App(){
  return(
    <>
<HashRouter>
  <Routes>
    <Route element={<Layout />}>
      <Route path="/" element={<Home />} />
      {/* <Route path="products" element={<Products />} /> */}
      <Route path="products" element={<Products1 />} /> 
      <Route path="login" element={<Login/>}/>
      <Route path="cart" element={<Cart/>}/>
      <Route path="signup" element={<Signup/>}/>
      <Route path= "admin" element={<Admin/>}/>
    </Route>
  </Routes>
</HashRouter>

    </>
  )
}
export default App