import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import AdminPanel from "./components/AdminPanel";
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  const isAuthenticated = localStorage.getItem("loggedIn") === "true";

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={isAuthenticated ? <AdminPanel /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;