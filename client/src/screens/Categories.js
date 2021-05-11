import React, { useContext, useState } from "react";
import { GlobalState } from "../GlobalState";
import axios from "axios";
import Error from "../component/Error";

function Categories() {
  const state = useContext(GlobalState);
  const [token] = state.token;
  const isAdmin = state.userAPI.isAdmin;
  const [categories] = state.categoryAPI.category;
  const [callback, setCallback] = state.categoryAPI.callback;
  const [error, setError] = useState("");
  const [category, setCategory] = useState("");
  const [id, setId] = useState("");
  const [edit, setEdit] = useState(false);

  const addCategory = async (e) => {
    e.preventDefault();
    try {
      if (edit) {
        await axios.put(
          `/api/category/${id}`,
          { name: category },
          { headers: { Authorization: token } }
        );
        alert("Category Updated");
      } else {
        await axios.post(
          "/api/category",
          { name: category },
          { headers: { Authorization: token } }
        );
        alert("Created a Category");
      }
      setError("");
      setEdit(false);
      setCategory("");
      setCallback(!callback);
    } catch (error) {
      setError(error.response.data.msg);
    }
  };

  const editCategory = async (id, name) => {
    setId(id);
    setCategory(name);
    setEdit(true);
  };
  const deleteCategory = async (id) => {
    setId(id);
    try {
      if(window.confirm("Do you want to Delete this Category?")){
        await axios.delete(
          `/api/category/${id}`,
          { headers: { Authorization: token } }
        );
      }
      setCallback(!callback)
    } catch (error) {
      setError(error.response.data.msg);
    }
  };

  return (
    <div className="category">
      <div className="category_list">
        <h4>Category</h4>
        {isAdmin
          ? categories.map((category) => (
              <div className="category_item">
                <h5> {category.name} </h5>
                <div className="category_list-action">
                  <button
                    className="btn category_edit"
                    onClick={() => {
                      editCategory(category._id, category.name);
                    }}
                  >
                    edit
                  </button>
                  <button className="btn category_delete" onClick={() => {deleteCategory(category._id)}}>delete</button>
                </div>
              </div>
            ))
          : ""}
      </div>
      <div className="create_category">
        <h4>{edit ? "Update Category" : "Create Category"}</h4>
        {isAdmin ? (
          <div>
            <form onSubmit={addCategory}>
              <div className="mb-3">
                <input
                  type="text"
                  value={category}
                  className="form-control"
                  placeholder="Category Name"
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                />
              </div>
              <button type="submit" className="category_add-btn">
                {edit ? "update" : "create"}
              </button>
            </form>
            <div style={{ marginTop: "20px" }}>
              {error === "" ? (
                " "
              ) : (
                <Error error={error} />
              )}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Categories;
