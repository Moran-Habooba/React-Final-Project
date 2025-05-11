import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const [stockLimitReached, setStockLimitReached] = useState(false);

  const cartItem = useSelector((state) =>
    state.cart.cartItems.find((item) => item.productId === product.productId)
  );

  const selectedQty = cartItem ? cartItem.quantity : 0;

  const increase = () => {
    if (selectedQty < product.quantity) {
      setStockLimitReached(false);
      dispatch({
        type: "ADD_TO_CART",
        payload: {
          productId: product.productId,
          name: product.name,
          price: product.price,
          quantity: selectedQty + 1,
        },
      });
    } else {
      setStockLimitReached(true);
    }
  };

  const decrease = () => {
    if (selectedQty > 0) {
      const newQty = selectedQty - 1;

      if (newQty === 0) {
        dispatch({
          type: "REMOVE_FROM_CART",
          payload: product.productId,
        });
      } else {
        dispatch({
          type: "ADD_TO_CART",
          payload: {
            productId: product.productId,
            name: product.name,
            price: product.price,
            quantity: newQty,
          },
        });
      }
    }
  };

  return (
    <div>
      <div className="card" style={{ width: "18rem" }}>
        {product.image && (
          <img
            src={product.image}
            alt={product.name}
            style={{ height: "200px", objectFit: "cover" }}
          />
        )}

        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>
        </div>
        {product.description && (
          <p className="card-text">{product.description}</p>
        )}

        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            Price: {product.price.toLocaleString()}
          </li>
          <li className="list-group-item">In Stock: {product.quantity}</li>
          <li className="list-group-item"> Bought: {product.unitsSold}</li>
        </ul>
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between mt-3">
            <button className="btn btn-outline-secondary" onClick={decrease}>
              −
            </button>
            <span>{selectedQty}</span>
            <button className="btn btn-outline-primary" onClick={increase}>
              +
            </button>
          </div>
        </div>
        {stockLimitReached && (
          <p className="text-danger small mt-1">No more stock available</p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
