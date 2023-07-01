import axios from "axios";

const BASE_URL = "http://localhost:8080";

const CATEGORY_BASE_URL = BASE_URL + "/api/v1/categories";
const SUPPLIER_BASE_URL = BASE_URL + "/api/v1/suppliers";
const PRODUCT_BASE_URL = BASE_URL + "/api/v1/products";
const CARTITEM_BASE_URL = BASE_URL + "/api/v1/cartitems";
const ORDER_BASE_URL = BASE_URL + "/api/v1/orders";
const USER_BASE_URL = BASE_URL + "/api/v1/users";
const REVIEW_BASE_URL = BASE_URL + "/api/v1/reviews";

// Category API calls
export const getCategories = (userInfo) => {
  console.log("get request made");
  return axios.get(CATEGORY_BASE_URL, { auth: userInfo });
};

export const addCategory = (data, userInfo) => {
  console.log("post request made");
  return axios.post(CATEGORY_BASE_URL, data, { auth: userInfo });
};

export const deleteCategory = (categoryId, userInfo) => {
  console.log("delete request made");
  return axios.delete(CATEGORY_BASE_URL + "/" + categoryId, { auth: userInfo });
};

export const updateCategory = (data, categoryId, userInfo) => {
  console.log("put request made");
  return axios.put(CATEGORY_BASE_URL + "/" + categoryId, data, {
    auth: userInfo,
  });
};

// Supplier API calls
export const getSuppliers = (userInfo) => {
  console.log("get request made");
  return axios.get(SUPPLIER_BASE_URL, { auth: userInfo });
};

export const addSupplier = (data, userInfo) => {
  console.log("post request made");
  return axios.post(SUPPLIER_BASE_URL, data, { auth: userInfo });
};

export const deleteSupplier = (supplierId, userInfo) => {
  console.log("delete request made");
  return axios.delete(SUPPLIER_BASE_URL + "/" + supplierId, {
    auth: userInfo,
  });
};

export const updateSupplier = (data, supplierId, userInfo) => {
  console.log("put request made");
  return axios.put(SUPPLIER_BASE_URL + "/" + supplierId, data, {
    auth: userInfo,
  });
};

// Product API calls
export const getProducts = (userInfo) => {
  console.log("get request made");
  return axios.get(PRODUCT_BASE_URL, { auth: userInfo });
};

export const getProductById = (productId, userInfo) => {
  console.log("get request made");
  return axios.get(PRODUCT_BASE_URL + "/" + productId, { auth: userInfo });
};

export const addProduct = (formData, categoryId, supplierId, userInfo) => {
  console.log("post request made");
  return axios.post(
    PRODUCT_BASE_URL + "/category/" + categoryId + "/supplier/" + supplierId,
    formData,
    { auth: userInfo }
  );
};

export const deleteProduct = (productId, userInfo) => {
  console.log("delete request made");
  return axios.delete(PRODUCT_BASE_URL + "/" + productId, { auth: userInfo });
};

export const updateProduct = (data, productId, userInfo) => {
  console.log("put request made");
  return axios.put(PRODUCT_BASE_URL + "/" + productId, data, {
    auth: userInfo,
  });
};

// cart items API calls
export const getCartItems = (userInfo) => {
  console.log("get request made");
  return axios.get(CARTITEM_BASE_URL, { auth: userInfo });
};

export const getCartItemsByUser = (userInfo) => {
  console.log("get request made");
  return axios.get(CARTITEM_BASE_URL + "/user/" + userInfo.username, {
    auth: userInfo,
  });
};

export const addCartItem = (data, productId, userInfo) => {
  console.log("post request made");
  console.log(data);
  if (userInfo == null) {
    alert("You must login first");
  }
  return axios.post(
    CARTITEM_BASE_URL + "/product/" + productId + "/user/" + userInfo.username,
    data,
    { auth: userInfo }
  );
};

export const updateCartItem = (data, cartItemId, userInfo) => {
  console.log("put request made");
  return axios.put(CARTITEM_BASE_URL + "/" + cartItemId, data, {
    auth: userInfo,
  });
};

export const deleteCartItem = (cartItemId, userInfo) => {
  return axios.delete(CARTITEM_BASE_URL + "/" + cartItemId, { auth: userInfo });
};

export const clearCart = (cartItems, userInfo) => {
  cartItems.forEach((element) => {
    deleteCartItem(element.cartItemId, userInfo);
  });
};

// Order API calls
export const addOrder = (data, userInfo) => {
  console.log("post request made");
  return axios.post(
    ORDER_BASE_URL + "/user/" + userInfo.username,
    data,
    userInfo
  );
};

export const getOrders = (userInfo) => {
  console.log("get request made");
  return axios.get(ORDER_BASE_URL, { auth: userInfo });
};

export const getOrdersByUser = (userInfo) => {
  console.log("get request made");
  return axios.get(ORDER_BASE_URL + "/user/" + userInfo.username, {
    auth: userInfo,
  });
};

export const getOrdersByDeliveryPerson = (userInfo) => {
  console.log("get request made");
  return axios.get(ORDER_BASE_URL + "/deliveryPerson/" + userInfo.username, {
    auth: userInfo,
  });
};

export const updateOrder = (data, orderId, userInfo) => {
  console.log("put request made");
  return axios.put(ORDER_BASE_URL + "/" + orderId, data, { auth: userInfo });
};

export const deleteOrder = (orderId, userInfo) => {
  console.log("delete request made");
  return axios.delete(ORDER_BASE_URL + "/" + orderId, { auth: userInfo });
};

// User API calls
export const getUserByEmail = (userInfo) => {
  console.log("get request made");
  return axios.get(USER_BASE_URL + "/user/" + userInfo.username, {
    auth: userInfo,
  });
};

export const getUsers = (userInfo) => {
  console.log("get request made");
  return axios.get(USER_BASE_URL, {
    auth: userInfo,
  });
};

export const updateUser = (userId, data, userInfo) => {
  console.log("put request made");
  console.log(data);
  return axios.put(USER_BASE_URL + "/" + userId, data, {
    auth: userInfo,
  });
};

export const assignDelivery = (orderId, deliveryPersonId, userInfo) => {
  console.log("get request made");
  return axios.get(
    ORDER_BASE_URL + "/assign/" + orderId + "/delivery/" + deliveryPersonId,
    {
      auth: userInfo,
    }
  );
};

export const updateDelivery = (orderId, data, userInfo) => {
  console.log("get request made");
  return axios.put(ORDER_BASE_URL + "/update/" + orderId, data, {
    auth: userInfo,
  });
};

// Review API calls
export const addReview = (productId, data, userInfo) => {
  console.log("post request made");
  return axios.post(
    REVIEW_BASE_URL + "/product/" + productId + "/user/" + userInfo.username,
    data,
    userInfo
  );
};

export const deleteReview = (reviewId, userInfo) => {
  console.log("delete request made");
  return axios.delete(REVIEW_BASE_URL + "/" + reviewId, { auth: userInfo });
};
