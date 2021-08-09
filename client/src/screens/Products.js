import React, { useContext, useState } from "react";
import Product from "../component/Product";
import { GlobalState } from "../GlobalState";
import axios from "axios";
import LoadMore from "../component/LoadMore";
import Filters from "../component/Filters";

function Products() {
  const state = useContext(GlobalState);
  const [products, setProducts] = state.productsAPI.products;
  const [callback, setCallback] = state.productsAPI.callback;
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;
  const [loading, setLoading] = useState(false);
  const [isCheck, setIsCheck] = useState(false);

  const handleCheck = (id) => {
    products.forEach((product) => {
      if (product._id === id) product.checked = !product.checked;
    });
    setProducts([...products]);
  };

  const deleteProduct = async (id, public_id) => {
    try {
      setLoading(true);
      const deleteImg = axios.post(
        "https://weshopbd.herokuapp.com/api/destroy",
        { public_id },
        {
          headers: { Authorization: token },
        }
      );
      const deleteProduct = axios.delete(
        `https://weshopbd.herokuapp.com/api/products/${id}`,
        {
          headers: { Authorization: token },
        }
      );
      await deleteImg;
      await deleteProduct;
      setCallback(!callback);
      setLoading(false);
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  const checkAll = () => {
    products.forEach((product) => {
      product.checked = !isCheck;
    });
    setProducts([...products]);
    setIsCheck(!isCheck);
  };

  const deleteAll = () => {
    products.forEach((product) => {
      if (product.checked) deleteProduct(product._id, product.images.public_id);
    });
  };

  if (loading) {
    return <h6>Loading...</h6>;
  }

  return (
    <>
      <Filters />
      {isAdmin && (
        <div className="delete-all">
          <span>Select all</span>
          <input type="checkbox" checked={isCheck} onChange={checkAll} />
          <button onClick={deleteAll}>Delete ALL</button>
        </div>
      )}
      <div className="products">
        {products.map((product) => {
          return (
            <Product
              deleteProduct={deleteProduct}
              key={product._id}
              product={product}
              handleCheck={handleCheck}
            />
          );
        })}
      </div>
      <LoadMore />
      {products.length === 0 && "Loading..."}
    </>
  );
}

export default Products;
