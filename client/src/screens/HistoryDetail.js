import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { GlobalState } from "../GlobalState";

function HistoryDetail() {
  const state = useContext(GlobalState);
  const [history] = state.userAPI.history;
  const [historyDetail, setHistoryDetail] = useState([]);

  const params = useParams();

  useEffect(() => {
    if (params.id) {
      history.forEach((history) => {
        if (history._id === params.id) {
          setHistoryDetail(history);
        }
      });
    }
  }, [params.id, history]);

  if(historyDetail.length === 0){
      return null
  }

  return (
    <div>
      <div className="history_page-box">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Phone</th>
              <th>District</th>
            </tr>
          </thead>
          <tbody>
            <tr key={historyDetail._id}>
              <td> {historyDetail.name} </td>
              <td> {historyDetail.address} </td>
              <td>{historyDetail.phone}</td>
              <td>{historyDetail.district}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="history_page-box">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Picture</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {historyDetail.cart.length === 0 ? null : historyDetail.cart.map((items) => (
              <tr key={items._id}>
                <td> <img width="80px" height="90px" src={items.images.url} alt={items.title} /> </td>
                <td> {items.title} </td>
                <td>{items.quantity}</td>
                <td>৳ {items.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HistoryDetail;
