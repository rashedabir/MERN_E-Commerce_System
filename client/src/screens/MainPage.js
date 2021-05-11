import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import Cart from "./Cart";
import Categories from "./Categories";
import CreateProduct from "./CreateProduct";
import History from "./History";
import Login from "./Login";
import NotFound from "./NotFound";
import ProductDetail from "./ProductDetail";
import Products from "./Products";
import Registration from "./Registration";
import { GlobalState } from "../GlobalState";
import HistoryDetail from "./HistoryDetail";

function MainPage() {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;

  return (
    <Switch>
      <Route path="/" exact component={Products} />
      <Route path="/login" exact component={isLogged ? NotFound : Login} />
      <Route path="/register" exact component={isLogged ? NotFound : Registration} />
      <Route path="/cart" exact component={isLogged ? Cart : NotFound} />
      <Route path="/details/:id" exact component={ProductDetail} />
      <Route path="/create_product" exact component={isAdmin ? CreateProduct : NotFound} />
      <Route path="/edit_product/:id" exact component={isAdmin ? CreateProduct : NotFound} />
      <Route path="/category" exact component={isAdmin ? Categories : NotFound} />
      <Route path="/history" exact component={isLogged ? History : NotFound} />
      <Route path="/detail_history/:id" exact component={isLogged ? HistoryDetail : NotFound} />
      <Route path="*" exact component={NotFound} />
    </Switch>
  );
}

export default MainPage;
