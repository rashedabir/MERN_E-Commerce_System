import React, { useContext, useEffect, useState } from "react";
import { GlobalState } from "../GlobalState";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

function CreateProduct() {
  const state = useContext(GlobalState);
  const [token] = state.token;
  const [categories] = state.categoryAPI.category;
  const [image, setImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [productId, setProductId] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState();
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [callback, setCallback] = state.productsAPI.callback;
  const [products] = state.productsAPI.products;
  const [onEdit, setOnEdit] = useState(false);
  const [_id, setId] = useState("");

  const history = useHistory();
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      products.forEach((product) => {
        if (product._id === params.id) {
          setOnEdit(true);
          setId(product._id);
          setProductId(product.product_id);
          setTitle(product.title);
          setPrice(product.price);
          setDescription(product.description);
          setImage(product.images);
          setCategory(product.category);
        }
      });
    } else {
      setOnEdit(false);
      setId("");
      setProductId("");
      setTitle("");
      setPrice();
      setDescription("");
      setImage(false);
      setCategory("");
    }
  }, [params.id, products]);

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];
      let formData = new FormData();
      formData.append("file", file);
      setLoading(true);
      const res = await axios.post(
        "https://weshopbd.herokuapp.com/api/upload",
        formData,
        {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: token,
          },
        }
      );
      setLoading(false);
      setImage(res.data);
    } catch (error) {
      setError(error.response.data.msg);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (onEdit) {
        await axios.put(
          `https://weshopbd.herokuapp.com/api/products/${_id}`,
          {
            product_id: productId,
            title: title,
            price: price,
            description: description,
            images: image,
            category: category,
          },
          { headers: { Authorization: token } }
        );
      } else {
        await axios.post(
          "https://weshopbd.herokuapp.com/api/products",
          {
            product_id: productId,
            title: title,
            price: price,
            description: description,
            images: image,
            category: category,
          },
          { headers: { Authorization: token } }
        );
      }
      setCallback(!callback);
      history.push("/");
    } catch (error) {
      setError(error.response.data.msg);
    }
  };

  const styleUpload = {
    display: image ? "block" : "none",
  };

  const handleDestroy = async () => {
    try {
      setLoading(true);
      await axios.post(
        "https://weshopbd.herokuapp.com/api/destroy",
        { public_id: image.public_id },
        {
          headers: { Authorization: token },
        }
      );
      setLoading(false);
      setImage(false);
    } catch (err) {
      setError(err.response.data.msg);
    }
  };

  return (
    <>
      {error === "" ? (
        " "
      ) : (
        <div className="alert alert-danger alert-box mt-3" role="alert">
          {error}
        </div>
      )}
      <div className="create_product">
        <div className="upload">
          <input type="file" name="file" id="file_up" onChange={handleUpload} />
          {loading ? (
            "Uploading..."
          ) : (
            <div id="file_img" style={styleUpload}>
              <img src={image ? image.url : ""} alt="" />
              <span onClick={handleDestroy}>X</span>
            </div>
          )}
        </div>
        <div className="create_product-box">
          <h4> {onEdit ? "update product" : "Create Product"} </h4>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3 mt-4">
              <label>product id</label>
              <input
                type="text"
                disabled={onEdit}
                className="form-control"
                value={productId}
                placeholder="Product ID"
                onChange={(e) => {
                  setProductId(e.target.value);
                }}
              />
            </div>
            <div className="form-group mb-3">
              <label>title</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                placeholder="Title"
                value={title}
              />
            </div>
            <div className="form-group mb-3">
              <label>price</label>
              <input
                type="number"
                min="0"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                className="form-control"
                placeholder="Price"
              />
            </div>
            <div className="form-group mb-3">
              <label>description</label>
              <textarea
                type="type"
                className="form-control"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                placeholder="Description"
                rows="5"
              />
            </div>
            <div className="form-group mb-3">
              <label>Category</label>
              <select
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                value={category}
                className="form-control"
              >
                <option>Choose</option>
                {categories.length === 0
                  ? null
                  : categories.map((category) => (
                      <option value={category._id} key={category._id}>
                        {category.name}
                      </option>
                    ))}
              </select>
            </div>
            <div className="btnholder">
              <button type="submit" className="btn">
                {onEdit ? "update" : "save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateProduct;
