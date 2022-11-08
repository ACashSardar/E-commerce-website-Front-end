import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import { Routes, Route, useNavigate } from "react-router-dom";
import ListCategories from "./components/ListCategories";
import {
  getCategories,
  getSuppliers,
  getProducts,
  getCartItemsByUser,
  getOrdersByUser,
} from "./services/EcommerceServices";
import Footer from "./components/Footer";
import ListSuppliers from "./components/ListSuppliers";
import ListProducts from "./components/ListProducts";
import Homepage from "./components/Homepage";
import Cart from "./components/Cart";
import Order from "./components/Order";
import Payment from "./components/Payment";
import ListOrders from "./components/ListOrders";
import Login from "./components/Login";
import Signup from "./components/Signup";
import axios from "axios";

const App = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [userRole, setUserRole] = useState("ROLE_USER");
  const [loggedIn, setLoggedIn] = useState(false);

  const loadCategories = () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo == null) {
      setCategories([]);
      return;
    }
    getCategories(userInfo)
      .then((res) => {
        console.log(res.data);
        setCategories(res.data);
      })
      .catch((err) => console.log(err));
  };

  const loadSuppliers = () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo == null) {
      setSuppliers([]);
      return;
    }
    getSuppliers(userInfo)
      .then((res) => {
        console.log(res.data);
        setSuppliers(res.data);
      })
      .catch((err) => console.log(err));
  };

  const loadProducts = () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo == null) {
      setProducts([]);
      return;
    }
    getProducts(userInfo)
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  };

  const loadCartitems = () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo == null) {
      setCartItems([]);
      return;
    }
    getCartItemsByUser(userInfo)
      .then((res) => {
        console.log(res.data);
        setCartItems(res.data);
      })
      .catch((err) => console.log(err));
  };

  const loadOrders = () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo == null) {
      setOrders([]);
      return;
    }
    getOrdersByUser(userInfo)
      .then((res) => {
        console.log(res.data);
        setOrders(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadCategories();
    loadSuppliers();
    loadProducts();
    loadCartitems();
    loadOrders();
    console.log("yo bro wtf");
  }, [loggedIn, selectedProductId]);

  const signup = (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    const name = e.target.elements.name.value;
    const address = e.target.elements.address.value;
    const role = e.target.elements.role.value;

    console.log(name, email, password, address, role);
    axios
      .post("http://localhost:8080/api/v1/users", {
        name,
        email,
        password,
        address,
        role,
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          console.log("Registration success");
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const sendLoginRequest = (e) => {
    e.preventDefault();
    const uname = e.target.elements.email.value;
    const pwd = e.target.elements.password.value;

    const credential = { username: uname, password: pwd };

    axios
      .get("http://localhost:8080/api/v1/products", {
        auth: { username: uname, password: pwd },
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          console.log("login success");
          localStorage.setItem("userInfo", JSON.stringify(credential));
          setLoggedIn(true);
          navigate("/");
        }
      })
      .catch(() => {
        console.log("login Failed");
      });
  };

  const logout = () => {
    localStorage.clear();
    setLoggedIn(false);
    setUserRole("ROLE_USER");
    setSelectedProductId(0);
    navigate("/login");
  };

  return (
    <div className="container-fluid m-0 p-0">
      <Header logout={logout} userRole={userRole} />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Homepage
              products={products}
              setProducts={setProducts}
              categories={categories}
              selectedProductId={selectedProductId}
              setSelectedProductId={setSelectedProductId}
              quantity={quantity}
              setQuantity={setQuantity}
              loadCartitems={loadCartitems}
            />
          }
        />
        <Route
          exact
          path="/login"
          element={<Login sendLoginRequest={sendLoginRequest} />}
        />
        <Route exact path="/signup" element={<Signup signup={signup} />} />
        <Route
          exact
          path="/category"
          element={
            <ListCategories
              categories={categories}
              loadCategories={loadCategories}
            />
          }
        />
        <Route
          exact
          path="/supplier"
          element={
            <ListSuppliers
              suppliers={suppliers}
              loadSuppliers={loadSuppliers}
            />
          }
        />
        <Route
          exact
          path="/product"
          element={
            <ListProducts
              products={products}
              loadProducts={loadProducts}
              categories={categories}
              suppliers={suppliers}
            />
          }
        />
        <Route
          exact
          path="/product/:id"
          element={<h2>{selectedProductId}</h2>}
        />
        <Route
          exact
          path="/cart"
          element={
            <Cart
              cartItems={cartItems}
              loadCartitems={loadCartitems}
              loadOrders={loadOrders}
            />
          }
        />
        <Route
          exact
          path="/order"
          element={<Order orders={orders} loadOrders={loadOrders} />}
        />
        <Route
          exact
          path="/payment"
          element={<Payment cartItems={cartItems} orders={orders} />}
        />
        <Route
          exact
          path="/customerOrders"
          element={<ListOrders cartItems={cartItems} orders={orders} />}
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
