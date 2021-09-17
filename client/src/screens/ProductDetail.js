import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GlobalState } from "../GlobalState";
import Product from "../component/Product";

function ProductDetail() {
  const params = useParams();
  const state = useContext(GlobalState);
  const [isAdmin] = state.userAPI.isAdmin;
  const [isLogged] = state.userAPI.isLogged;
  const [products] = state.productsAPI.products;
  const addCart = state.userAPI.addCart;
  const [details, setDetails] = useState([]);
  const [image, setImage] = useState([]);

  useEffect(() => {
    if (params.id) {
      products.forEach((product) => {
        if (product._id === params.id) {
          setDetails(product);
          setImage(product.images.url);
        }
      });
    }
  }, [params.id, products]);
  return (
    <>
      <div className="details">
        <img src={image} alt={details.title} />
        <div className="detail-box">
          <div className="row-title">
            <h2> {details.title} </h2>
            <h6> #id: {details.product_id} </h6>
          </div>
          <span> ৳ {details.price} </span>
          <br />
          <br></br>
          <p className="description"> {details.description} </p>
          <p className="sold"> sold : {details.sold} </p>
          {isAdmin ? null : (
            <div className="row-btn">
              <Link
                onClick={() => {
                  if (isLogged) {
                    addCart(details);
                  }
                }}
                id="buy-btn"
                to={isLogged ? "/cart" : "/login"}
              >
                {isLogged ? "buy now" : "login to buy product"}
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="releated_products">
        <h3>releated</h3>
        <div className="releated_products-list">
          {products.map((product) => {
            return product.category === details.category ? (
              <Product key={product._id} product={product} />
            ) : null;
          })}
        </div>
      </div>
    </>
  );
}

export default ProductDetail;
