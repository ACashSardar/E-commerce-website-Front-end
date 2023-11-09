import React from "react";
import { Link } from "react-router-dom";
import {
  updateOrder,
  deleteOrder,
  updateDelivery,
} from "../services/EcommerceServices";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Order = ({
  orders,
  loadOrders,
  currentUser,
  setCurrentOrder,
  loading,
  setLoading,
}) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const handleSubmit = (e, orderId, userInfo) => {
    e.preventDefault();
    setLoading(true);
    const shipAddr = e.target.elements.shippingAddress.value;
    e.target.elements.shippingAddress.value = "";
    const data = {
      shippingAddress: shipAddr,
    };
    updateOrder(data, orderId, userInfo).then((res) => {
      loadOrders();
      toast("Shipping address updated, proceed to payment.");
      setLoading(false);
    });
  };

  const handleDeleteOrder = (orderId, userInfo) => {
    setLoading(true);
    deleteOrder(orderId, userInfo).then((res) => {
      loadOrders();
      setLoading(false);
    });
  };

  const handleUpdateOrder = (orderId, e, userInfo) => {
    e.preventDefault();
    const deliveryStatus = e.target.elements.deliveryStatus.value;
    const deliveryDate = e.target.elements.deliveryDate.value;
    console.log(deliveryStatus);
    if (deliveryStatus === "" || deliveryDate === "") {
      return;
    }
    setLoading(true);
    const data = {
      deliveryStatus: deliveryStatus,
      deliveryDate: deliveryDate,
    };

    updateDelivery(orderId, data, userInfo).then((res) => {
      setLoading(false);
      loadOrders();
    });
  };
  return (
    <div className="bg-canvas d-flex justify-content-center p-5">
      {loading ? (
        <div
          className="text-center text-light"
          style={{ width: "100%" }}
          disabled
        >
          Loading...
          <span
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
        </div>
      ) : (
        <div style={{ width: "70%" }}>
          {orders.length > 0 ? (
            <div>
              {orders.map((order, index) => (
                <div className="shadow bg-light rounded-1 p-4 mb-3">
                  <div className="row">
                    <div className="col-md-6">
                      <b className="fs-5">Order ID: ECOD{order.orderId}</b>
                    </div>
                    <div className="col-md-6 text-end">
                      <b className="fs-5">₹ {order.totalAmount}</b>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-md-6">
                      <h6>
                        Order date: {new Date(order.orderDate).toLocaleString()}
                      </h6>
                      <h6>Recipient: {order.user.name}</h6>
                      <h6>Email: {order.user.email}</h6>
                      <h6>Phone: {order.user.phoneNo} </h6>
                      {order.transaction === "Successful" ? (
                        <>
                          <h6>
                            Delivery Status:{" "}
                            {order.deliveryStatus == null
                              ? "Pending"
                              : order.deliveryStatus}
                          </h6>
                          <h6>Shipping Address: {order.shippingAddress}</h6>
                          <h6>
                            Expected Delivery Date:{" "}
                            {order.deliveryDate == null
                              ? "Pending"
                              : new Date(order.deliveryDate).toDateString()}
                          </h6>
                          <h6>
                            Delivery Person:{" "}
                            {order.deliveryPerson == null
                              ? "Pending"
                              : order.deliveryPerson.name}
                          </h6>
                          <h6>
                            Delivery Person Phone:{" "}
                            {order.deliveryPerson == null
                              ? "Pending"
                              : order.deliveryPerson.phoneNo}
                          </h6>
                        </>
                      ) : (
                        <></>
                      )}
                      {order.transaction !== "Successful" &&
                      currentUser.role === "ROLE_USER" ? (
                        <div>
                          {order.shippingAddress === "" ||
                          order.shippingAddress === null ? (
                            <h6 className="text-danger">
                              Add shipping address.
                            </h6>
                          ) : (
                            <h6>Shipping Address: {order.shippingAddress}</h6>
                          )}
                          <form
                            onSubmit={(e) =>
                              handleSubmit(e, order.orderId, userInfo)
                            }
                            className="d-flex flex-row mb-1"
                          >
                            <input
                              type="text"
                              className="form-control border-secondary rounded-1 me-1"
                              name="shippingAddress"
                              placeholder="Enter Shipping Address"
                              style={{ width: "15rem" }}
                            />
                            <button className="custom-btn3 px-3">Update</button>
                          </form>
                          <button
                            className="custom-btn2 me-1"
                            onClick={() =>
                              handleDeleteOrder(order.orderId, userInfo)
                            }
                            style={{ width: "10rem" }}
                          >
                            Delete
                          </button>
                          {order.shippingAddress === "" ||
                          order.shippingAddress === null ? (
                            <></>
                          ) : (
                            <Link to="/payment">
                              <button
                                className="custom-btn1"
                                onClick={() => {
                                  setCurrentOrder(order);
                                }}
                                style={{ width: "10rem" }}
                              >
                                Purchase now
                              </button>
                            </Link>
                          )}
                        </div>
                      ) : (
                        <div>
                          {currentUser.role === "ROLE_DELIVERY" ? (
                            <form
                              className="d-flex"
                              onSubmit={(e) =>
                                handleUpdateOrder(order.orderId, e, userInfo)
                              }
                            >
                              <select
                                className="form-select rounded-1 me-1"
                                name="deliveryStatus"
                                id=""
                              >
                                <option value="">Delivery Status</option>
                                <option value="🏠In office">In office</option>
                                <option value="🚵🏻‍♂️On the way">On the way</option>
                                <option value="✅Delivered">Delivered</option>
                              </select>
                              <input
                                className="form-control rounded-1 me-1"
                                type="date"
                                name="deliveryDate"
                                required
                              />
                              <button className="custom-btn3 px-3">
                                Update
                              </button>
                            </form>
                          ) : (
                            <></>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="col-md-6">
                      <ul>
                        {order.orderItems.map((orderItem, index) => (
                          <li>
                            <span className="d-flex">
                              <h6 className="text-secondary fw-bold me-1">
                                {orderItem.quantity} x{" "}
                              </h6>
                              <h6>{orderItem.product.productName}</h6>
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-light">
              <h5>Order list is currently empty.</h5>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Order;
