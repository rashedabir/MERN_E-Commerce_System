import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../GlobalState";

function Product({ product, deleteProduct, handleCheck }) {
  const state = useContext(GlobalState);
  const [isAdmin] = state.userAPI.isAdmin;
  const addCart = state.userAPI.addCart;
  

  return (
    <div className="product-card">
      {isAdmin ? (
        <input
          type="checkbox"
          checked={product.checked}
          className="form-check-input"
          onChange={() => {handleCheck(product._id)}}
        />
      ) : (
        ""
      )}
      <img src={product.images.url} alt={product.title} />
      <div className="product-box">
        <h2 title={product.title}>
          {" "}
          <Link to={`/details/${product._id}`}>{product.title}</Link>{" "}
        </h2>
        <span>৳ {product.price} </span>
        <p> {product.description} </p>
      </div>
      {isAdmin ? (
        <div className="row_btn">
          <Link
            id="btn-delete"
            to="/"
            onClick={() => {deleteProduct(product._id, product.images.public_id)}}
          >
            delete
          </Link>
          <Link id="btn-edit" to={`/edit_product/${product._id}`}>
            edit
          </Link>
        </div>
      ) : (
        <div className="row_btn">
          <button
            id="btn-buy"
            onClick={() => {
              addCart(product);
            }}
          >
            buy
          </button>
          <Link id="btn-view" to={`/details/${product._id}`}>
            view
          </Link>
        </div>
      )}
    </div>
  );
}

export default Product;
