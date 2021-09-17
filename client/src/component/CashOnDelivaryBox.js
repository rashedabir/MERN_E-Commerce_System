import React, { useContext, useState } from "react";
import { GlobalState } from "../GlobalState";
import axios from "axios";
import { toast } from "react-toastify";

function CashOnDelivaryBox({ total, fetchCart }) {
  const state = useContext(GlobalState);
  const [token] = state.token;
  const [cart, setCart] = state.userAPI.cart;
  const [calback, setCallback] = state.userAPI.callback;
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [phone, setPhone] = useState("");
  const trxid = "";

  const order = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://weshopbd.herokuapp.com/api/order",
        {
          cart: cart,
          district: district,
          address: address,
          phone: phone,
          price: total,
          trxid: trxid,
        },
        {
          headers: { Authorization: token },
        }
      );
      toast.success("Order Completed");
      setCart([]);
      fetchCart([]);
      setCallback(!calback);
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };
  return (
    <>
      <div style={{ marginTop: "10px" }}></div>
      <div className="order_detail-box">
        <div className="order_detail-form">
          <form onSubmit={order}>
            <h5 style={{ textAlign: "center" }}>Cash on Delivary</h5>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="District Name"
                onChange={(e) => {
                  setDistrict(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Address"
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Phone Number"
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
            </div>
            <button type="submit" className="category_add-btn">
              submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default CashOnDelivaryBox;
