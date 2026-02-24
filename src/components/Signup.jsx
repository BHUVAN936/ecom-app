import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = () => {
    if (!username  || !password) {
      alert("All fields are required");
      return;
    }

    // get existing users
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // check if user already exists
    const userExists = users.find(u => u.username === username);
    if (userExists) {
      alert("User already exists!");
      return;
    }

    // save new user
    users.push({ username, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful! Please login.");
    navigate("/login");
  };

  return (
    <>
      <Header />
      <div style={{ textAlign: "center", padding: "120px" }}>
        <h2>Signup</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        /><br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br /><br />

        <button onClick={handleSignup}>Signup</button>
      </div>
      <Footer />
    </>
  );
}

export default Signup;