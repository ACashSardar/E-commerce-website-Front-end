import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { clearCart, updateOrder } from "../services/EcommerceServices";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Payment = ({ cartItems, loadOrders, currentOrder, loadCartitems }) => {
  const navigate = useNavigate();

  const handlePayment = (e, order) => {
    e.preventDefault();
    const data = {
      transaction: "Successful",
    };
    updateOrder(data, order.orderId).then(() => {
      clearCart(cartItems);
      loadCartitems();
      loadOrders();
      toast("payment successful ✅");
      navigate("/");
    });
  };

  return (
    <div className="bg-canvas p-5 d-flex justify-content-center">
      <form
        action=""
        className="bg-light rounded-1 shadow rounded-1 p-5 mt-5"
        style={{ height: "20rem", width: "28rem" }}
        onSubmit={(e) => handlePayment(e, currentOrder)}
      >
        <div className="d-flex justify-content-between">
          <b className="fs-4">Grand Total: </b>
          <b className="fs-4">₹ {currentOrder.totalAmount}</b>
        </div>
        <br />
        <div className="d-flex justify-content-around mb-1">
          <input
            type="text"
            className="form-control rounded-1 me-1"
            placeholder="Enter First Name"
          />
          <input
            type="text"
            className="form-control rounded-1 me-1"
            placeholder="Enter Last Name"
          />
        </div>
        <div className="d-flex justify-content-around mb-1">
          <input
            type="text"
            className="form-control rounded-1 me-1"
            placeholder="Enter Card Number"
          />
          <input
            type="text"
            className="form-control rounded-1 me-1"
            placeholder="Enter CVV"
          />
        </div>
        <div className="d-flex justify-content-around mb-1">
          <span className="badge text-dark fs-5">
            <b>Valid until: </b>
          </span>
          <input
            type="text"
            className="form-control rounded-1 me-1"
            placeholder="Month"
          />
          <input
            type="text"
            className="form-control rounded-1 me-1"
            placeholder="Year"
          />
        </div>
        <div className="d-flex justify-content-between mb-1 pe-2">
          <Link
            to="/order"
            className="custom-btn2 text-decoration-none me-1 rounded-2"
          >
            Cancel
          </Link>
          <button className="custom-btn1 rounded-2" style={{ width: "90%" }}>
            Pay ₹ {currentOrder.totalAmount}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Payment;
