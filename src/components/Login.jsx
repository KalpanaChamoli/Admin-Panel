import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
   const[isSignup,setIsSignup] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    const user = JSON.parse(localStorage.getItem("admin"));
    if (user && user.username === username && user.password === password) {
      localStorage.setItem("loggedIn", "true");
      navigate("/admin");
    } else {
      alert("Invalid credentials! Please try again.");
    }
  };

  const handleSignup = () => {
    localStorage.setItem("admin", JSON.stringify({ username, password }));
    alert("Signup successful! Now, log in.");
    setIsSignup(false);
  };

  return (
    
      <div className="login-container d-flex flex-column align-items-center justify-content-centerbg-light">
        <div className="header-container">
          <header className="header">
          <h2>{isSignup?"Signup" : "Login"}</h2>
          </header>
        </div>
      
      <div className="card p-4 shadow-sm text-center mt-5 pt-5">
      <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button  className={isSignup? "btn btn-success" : "btn btn-primary"} onClick={isSignup? handleSignup : handleLogin}>{isSignup ? "Signup" : "Login"}</button>

      <button className="btn btn-success mt-2" 
      onClick={() => setIsSignup(!isSignup)}> {isSignup ? "Already have an account? Login" : "Don't have an account? Signup"}</button>
    </div>
    </div>
  );
};

export default Login;