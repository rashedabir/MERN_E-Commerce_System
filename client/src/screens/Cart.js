import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../GlobalState";
import axios from "axios";
import BkashOrderBox from "../component/BkashOrderBox";
import CashOnDelivaryBox from "../component/CashOnDelivaryBox";

function Cart() {
  const state = useContext(GlobalState);
  const [token] = state.token;
  const [cart, setCart] = state.userAPI.cart;
  const [total, setTotal] = useState("0");
  const [subTotal, setSubTotal] = useState("0");
  const [showcod, setShowcod] = useState(false);
  const [showop, setShowop] = useState(false);
  const delivaryCharge = 75;

  useEffect(() => {
    const getSubTotal = () => {
      const stotal = cart.reduce((prev, item) => {
        return prev + item.price * item.quantity;
      }, 0);

      setTotal(stotal + delivaryCharge);
      setSubTotal(stotal);
    };
    getSubTotal();
  }, [cart]);

  const increament = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity += 1;
      }
    });
    setCart([...cart]);
    fetchCart(cart);
  };

  const decrement = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity === 1 ? (item.quantity = 1) : (item.quantity -= 1);
      }
    });
    setCart([...cart]);
    fetchCart(cart);
  };

  const removeCart = (id) => {
    if (window.confirm("Do you want to Delete this cart?")) {
      cart.forEach((item, index) => {
        if (item._id === id) {
          cart.splice(index, 1);
        }
      });
      setCart([...cart]);
      fetchCart(cart);
    }
  };

  const fetchCart = async (cart) => {
    await axios.patch(
      "https://weshopbd.herokuapp.com/user/addcart",
      { cart: cart },
      {
        headers: { Authorization: token },
      }
    );
  };

  if (cart.length === 0) {
    return (
      <h2 style={{ textAlign: "center", margin: "20px auto" }}>
        Cart is Empty
      </h2>
    );
  }

  return (
    <>
      <div className="cart">
        <div className="cart-box mt-4">
          {cart.map((product) => {
            return (
              <div key={product._id} className="cart_item">
                <Link to={`/details/${product._id}`}>
                  <img src={product.images.url} alt={cart.title} />
                </Link>
                <div className="cart_detail-box">
                  <h5>
                    <Link to={`/details/${product._id}`}>{product.title}</Link>
                  </h5>
                  <span> ৳ {product.price} </span>
                  <div className="quantity-box">
                    <button
                      className="btn minus_btn"
                      onClick={() => {
                        decrement(product._id);
                      }}
                    >
                      -
                    </button>
                    {product.quantity}
                    <button
                      className="btn plus_btn"
                      onClick={() => {
                        increament(product._id);
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
                <span
                  className="delete_cart"
                  onClick={() => {
                    removeCart(product._id);
                  }}
                >
                  <i class="far fa-times-circle"></i>
                </span>
              </div>
            );
          })}
        </div>
        <div className="mt-4 checkout">
          <div className="total-box">
            <h4>total : </h4>
            <h3> ৳ {total}</h3>
          </div>
          <div className="subtotal_delivary">
            <div className="subtotal">
              <h5 style={{ color: "#323232" }}>subtotal : </h5>
              <h5> ৳ {subTotal} </h5>
            </div>
            <div className="delivary">
              <h5 style={{ color: "#323232" }}>delivary : </h5>
              <h5> ৳ {delivaryCharge} </h5>
            </div>
          </div>
          <div>
            <button
              onClick={() => {
                setShowcod(!showcod);
              }}
              className="btn"
            >
              order
            </button>

            {showcod ? (
              <CashOnDelivaryBox total={total} fetchCart={fetchCart} />
            ) : null}
            <button
              style={{
                marginTop: "10px",
                backgroundColor: "#fff",
                border: "1px solid #000",
                color: "#000",
              }}
              onClick={() => {
                setShowop(!showop);
              }}
              className="btn"
            >
              bkash
            </button>
            {showop ? (
              <BkashOrderBox total={total} fetchCart={fetchCart} />
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
