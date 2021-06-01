import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../GlobalState";
import axios from "axios";

function Header() {
  const state = useContext(GlobalState);
  const [isLogged, setIsLogged] = state.userAPI.isLogged;
  const [isAdmin, setIsAdmin] = state.userAPI.isAdmin;
  const [menu, setMenu] = useState(false);
  const [cart] = state.userAPI.cart;

  const logOut = async () => {
    await axios.get("/user/logout");
    localStorage.clear();
    setIsAdmin(false);
    setIsLogged(false);
    window.location.href = "/";
  };

  const styleMenu = {
    left: menu ? 0 : "-100%",
  };

  const adminRouter = () => {
    return (
      <>
        <li onClick={() => setMenu(!menu)}>
          <Link to="/create_product">Create Product</Link>
        </li>
        <li onClick={() => setMenu(!menu)}>
          <Link to="/category">Categories</Link>
        </li>
      </>
    );
  };

  const loggedRouter = () => {
    return (
      <>
        <li onClick={() => setMenu(!menu)}>
          {isAdmin ? (
            <Link to="/history">orders</Link>
          ) : (
            <Link to="/history">History</Link>
          )}
        </li>
        <li onClick={() => setMenu(!menu)}>
          <Link onClick={logOut} to="/">
            Log Out
          </Link>
        </li>
      </>
    );
  };

  return (
    <div>
      <header>
        <div className="menu" onClick={() => setMenu(!menu)}>
          <i className="fas fa-bars icon"></i>
        </div>
        {isAdmin ? (
          <div className="logo">
            <Link to="/">
              <i className="fas fa-users-cog"></i> ADMIN
            </Link>
          </div>
        ) : (
          <div className="logo">
            <Link to="/">
              <i className="fab fa-weebly"></i>EE SHOP
            </Link>
          </div>
        )}
        <ul style={styleMenu}>
          <li onClick={() => setMenu(!menu)}>
            <Link to="/"> {isAdmin ? "Products" : "Shop"} </Link>
          </li>

          {isAdmin && adminRouter()}
          {isLogged ? (
            loggedRouter()
          ) : (
            <li onClick={() => setMenu(!menu)}>
              <Link to="/login">
                login <i className="fas fa-arrows-alt"></i> registation
              </Link>
            </li>
          )}
          <li className="menu cross" onClick={() => setMenu(!menu)}>
            <i className="fas fa-times"></i>
          </li>
        </ul>
        {isAdmin ? (
          ""
        ) : (
          <div className="cart-icon">
            <span> {cart.length} </span>
            <Link to="/cart">
              <i className="fas fa-shopping-cart"></i>
            </Link>
          </div>
        )}
      </header>
    </div>
  );
}

export default Header;
