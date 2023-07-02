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
  getOrdersByDeliveryPerson,
  getUserByEmail,
  getOrders,
  getUsers,
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
import Account from "./components/Account";
import axios from "axios";
import { BASE_URL } from "./services/ServerBaseURL";

const App = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [message, setMessage] = useState("");
  const [currentUser, setCurrentUser] = useState({
    userId: "",
    name: "",
    email: "",
    role: "",
    phoneNo: "",
    password: "",
    address: "",
  });
  const [userList, setUserList] = useState([]);
  const [currentOrder, setCurrentOrder] = useState();
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");

  const loadCategories = () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo == null) {
      // setCategories([]);
      // return;
    }
    getCategories(userInfo)
      .then((res) => {
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
        setSuppliers(res.data);
      })
      .catch((err) => console.log(err));
  };

  const loadProducts = () => {
    setLoading(true);
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo == null) {
      // setProducts([]);
      // return;
    }
    getProducts(userInfo)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
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
        setCartItems(res.data);
      })
      .catch((err) => console.log(err));
  };

  const loadOrders = () => {
    setLoading(true);
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo == null || currentUser.userId === "") {
      setOrders([]);
      return;
    }

    let promise = null;
    if (currentUser.role === "ROLE_ADMIN") {
      promise = getOrders(userInfo);
    } else if (currentUser.role === "ROLE_USER") {
      promise = getOrdersByUser(userInfo);
    } else if (currentUser.role === "ROLE_DELIVERY") {
      promise = getOrdersByDeliveryPerson(userInfo);
    }

    promise
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const loadCurrentUser = () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo != null) {
      getUserByEmail(userInfo).then((res) => {
        setCurrentUser(res.data);
      });
    }
  };

  const loadUserList = () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    getUsers(userInfo).then((res) => {
      setUserList(res.data);
    });
  };

  useEffect(() => {
    loadCurrentUser();
  }, []);

  useEffect(() => {
    console.log(currentUser);

    loadUserList();
    loadCategories();
    loadSuppliers();
    loadProducts();
    loadCartitems();
    loadOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, loggedIn, selectedProductId]);

  const signup = (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    const name = e.target.elements.name.value;
    const address = e.target.elements.address.value;
    const phoneNo = e.target.elements.phoneNo.value;
    const role = e.target.elements.role.value;

    axios
      .post(BASE_URL + "/api/v1/users", {
        name,
        email,
        password,
        address,
        phoneNo,
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
      .get(BASE_URL + "/api/v1/products", {
        auth: { username: uname, password: pwd },
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          console.log(currentUser);
          localStorage.setItem("userInfo", JSON.stringify(credential));
          setLoggedIn(true);
          loadCurrentUser();
          setMessage("");
          setKeyword("");
          navigate("/");
        }
      })
      .catch(() => {
        setMessage("Invalid username or password.");
        console.log("login Failed");
      });
  };

  const logout = () => {
    localStorage.clear();
    setLoggedIn(false);
    setSelectedProductId(0);
    setCurrentUser({
      userId: "",
      name: "",
      email: "",
      role: "",
      phoneNo: "",
      password: "",
      address: "",
    });
    setMessage("");
    setKeyword("");
    navigate("/login");
  };

  const handleSearch = (kwd) => {
    setKeyword(kwd);
  };

  return (
    <div className="container-fluid m-0 p-0">
      <Header logout={logout} currentUser={currentUser} />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Homepage
              products={products.filter(
                (product) =>
                  product.productName
                    .toLowerCase()
                    .includes(keyword.toLowerCase()) ||
                  product.productDesc
                    .toLowerCase()
                    .includes(keyword.toLowerCase())
              )}
              setProducts={setProducts}
              categories={categories}
              selectedProductId={selectedProductId}
              setSelectedProductId={setSelectedProductId}
              quantity={quantity}
              setQuantity={setQuantity}
              cartItems={cartItems}
              loadCartitems={loadCartitems}
              loadProducts={loadProducts}
              handleSearch={handleSearch}
            />
          }
        />
        <Route
          exact
          path="/login"
          element={
            <Login sendLoginRequest={sendLoginRequest} message={message} />
          }
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
              loading={loading}
              setLoading={setLoading}
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
          element={
            <Order
              orders={orders}
              loadOrders={loadOrders}
              currentUser={currentUser}
              setCurrentOrder={setCurrentOrder}
              loading={loading}
              setLoading={setLoading}
            />
          }
        />
        <Route
          exact
          path="/payment"
          element={
            <Payment
              cartItems={cartItems}
              currentOrder={currentOrder}
              loadOrders={loadOrders}
            />
          }
        />
        <Route
          exact
          path="/customerOrders"
          element={
            <ListOrders
              cartItems={cartItems}
              orders={orders}
              loadOrders={loadOrders}
              userList={userList}
              loading={loading}
            />
          }
        />
        <Route
          exact
          path="/account"
          element={
            <Account
              currentUser={currentUser}
              loadCurrentUser={loadCurrentUser}
              loading={loading}
            />
          }
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
