import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminPanel = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(storedProducts);
  }, []);

  const handleSave = () => {
    let updatedProducts = [...products];
    if (editingIndex !== null) {
      updatedProducts[editingIndex] = { name, description, price, image };
      setEditingIndex(null);
    } else {
      updatedProducts.push({ name, description, price, image });
    }
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setName(""); setDescription(""); setPrice(""); setImage("");
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    const product = products[index];
    setName(product.name);
    setDescription(product.description);
    setPrice(product.price);
    setImage(product.image);
  };

  const handleDelete = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    navigate("/login");
  };

  return (
    <div className="container-fluid p-0">
      {/* Header */}
      
      <header className="  head bg-danger text-white text-center py-3 sticky-top ">
        <div className="d-flex justify-content-between px-3">
          <button className="btn btn-light logout-btn" onClick={handleLogout}>Logout</button>
          <h2 className=" m-0">Admin Panel</h2>
          <div></div>
        </div>
      </header>
      

      {/* Main Content */}
      <div className="container mt-4">
        <div className="row">
          {/* Sticky Input Form on Left */}
          <div className="col-md-4 ">
            <div className="p-4 bg-light rounded shadow sticky-form product-list-container">
              <h4>Products List</h4>
              <input type="text" className="form-control my-2" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} />
              <input type="text" className="form-control my-2" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
              <input type="text" className="form-control my-2" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
              <input type="text" className="form-control my-2" placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} />
              <button className="btn btn-primary w-100" onClick={handleSave}>{editingIndex !== null ? "Update" : "Add"} Product</button>
            </div>
          </div>

          {/* Product List (Table) on Right */}
          <div className="col-md-8">
            <div className="p-4 bg-white rounded shadow product-list-container">
              <h4>Product List</h4>
              <table className="table table-striped">
                <thead className="table-dark">
                  <tr>
                    <th>Image</th>
                    <th>Product</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr key={index}>
                      <td><img src={product.image} alt={product.name} width="50" /></td>
                      <td>{product.name}</td>
                      <td>{product.description}</td>
                      <td>${product.price}</td>
                      <td>
                        <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(index)}>Edit</button>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(index)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
