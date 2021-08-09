import React, { useContext, useState } from "react";
import { GlobalState } from "../GlobalState";
import axios from "axios";
import Error from "./Error";

function BkashOrderBox({ total, fetchCart }) {
  const state = useContext(GlobalState);
  const [token] = state.token;
  const [calback, setCallback] = state.userAPI.callback;
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [phone, setPhone] = useState("");
  const [trxid, setTrxid] = useState("");
  const [error, setError] = useState("");
  const [cart, setCart] = state.userAPI.cart;

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
      alert("Order Completed");
      setCart([]);
      fetchCart([]);
      setCallback(!calback);
    } catch (error) {
      setError(error.response.data.msg);
    }
  };

  return (
    <>
      <div style={{ marginTop: "10px" }}>
        {error === "" ? " " : <Error error={error} />}
      </div>
      <div className="order_detail-box">
        <p>
          নাম্বারটিতে "সেন্ড মানি" তে টাকা পাঠিয়ে নিচের ফর্মটি ফিলাপ করে সাবমিট
          করুন...
        </p>
        <p>
          <strong>bKash Personal No: 01920204036</strong>
        </p>
        <div className="order_detail-form">
          <form onSubmit={order}>
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
                placeholder="Bkash Number"
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="bkash transaction id"
                onChange={(e) => {
                  setTrxid(e.target.value);
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

export default BkashOrderBox;
