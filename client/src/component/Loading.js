import React from "react";
import Skeleton from "react-loading-skeleton";

function Loading() {
  return (
    <div className="products">
      <div className="product-card">
        <Skeleton height={365} width={282} className="mb-2" />
        <Skeleton height={25} width={282} count={3} className="mb-2" />
      </div>
      <div className="product-card">
        <Skeleton height={365} width={282} className="mb-2" />
        <Skeleton height={25} width={282} count={3} className="mb-2" />
      </div>
      <div className="product-card">
        <Skeleton height={365} width={282} className="mb-2" />
        <Skeleton height={25} width={282} count={3} className="mb-2" />
      </div>
      <div className="product-card">
        <Skeleton height={365} width={282} className="mb-2" />
        <Skeleton height={25} width={282} count={3} className="mb-2" />
      </div>
      <div className="product-card">
        <Skeleton height={365} width={282} className="mb-2" />
        <Skeleton height={25} width={282} count={3} className="mb-2" />
      </div>
      <div className="product-card">
        <Skeleton height={365} width={282} className="mb-2" />
        <Skeleton height={25} width={282} count={3} className="mb-2" />
      </div>
    </div>
  );
}

export default Loading;
