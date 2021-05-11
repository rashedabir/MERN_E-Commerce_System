import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../GlobalState";

function History() {
  const state = useContext(GlobalState);
  const [history] = state.userAPI.history;
  const [isAdmin] = state.userAPI.isAdmin;
  return (
    <div className="history_page">
      <h4> {isAdmin ? "order lists" : "history"} </h4>
      <h6>
        {isAdmin ? (
          <h6>You have {history.length} Orders</h6>
        ) : (
          <h6>You have {history.length} Orderd</h6>
        )}
      </h6>
      <div className="history_page-box table-responsive">
        <table className="table table-bordered table-sm">
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {history.map((items) => (
              <tr key={items._id}>
                <td>{items.trxid === "" ? "Cash on Delivary" : items.trxid}</td>
                <td> {new Date(items.updatedAt).toLocaleDateString()} </td>
                <td>
                  <Link to={`/detail_history/${items._id}`}>View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default History;
