import React from "react";

function Error({ error }) {
  return (
    <div className="alert alert-danger alert-box" role="alert">
      {error}
    </div>
  );
}

export default Error;
