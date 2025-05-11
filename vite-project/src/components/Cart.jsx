import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const Cart = ({ isOpen, toggleCart }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const navigate = useNavigate();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = () => {
    if (!cartItems.length || !currentUser) return;
    const newOrder = {
      orderId: uuidv4(),
      userId: currentUser.id,
      items: cartItems,
      totalPrice: cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      ),
      date: new Date().toLocaleDateString("he-IL"),
    };

    dispatch({ type: "ADD_ORDER", payload: newOrder });

    dispatch({
      type: "UPDATE_STOCK",
      payload: {
        items: cartItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
        showOrdersToOthers: currentUser?.showOrdersToOthers ?? false,
      },
    });

    dispatch({ type: "CLEAR_CART" });
    alert(
      "The order was placed successfully. You are being redirected to the home page."
    );
    dispatch({ type: "LOGOUT" });

    navigate("/");
  };

  return (
    <div>
      <button onClick={toggleCart} className="btn btn-outline-dark w-100 mb-3">
        {isOpen ? "✖ Close Cart" : "🛒 Open Cart"}
      </button>

      {isOpen && (
        <>
          <h4>Your Cart</h4>

          {cartItems.length === 0 ? (
            <p className="text-muted">Cart is empty</p>
          ) : (
            <>
              <ul className="list-group">
                {cartItems.map((item) => (
                  <li
                    key={item.productId}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <strong>{item.name}</strong>
                      <br />
                      <small>
                        {item.quantity} × {item.price.toLocaleString()} ₪
                      </small>
                    </div>
                    <div className="d-flex align-items-center">
                      <span className="me-2">
                        {item.price * item.quantity} ₪
                      </span>
                      <button
                        onClick={() =>
                          dispatch({
                            type: "REMOVE_FROM_CART",
                            payload: item.productId,
                          })
                        }
                        className="btn btn-link p-0 border-0 text-danger"
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <hr />
              <h5>Total: {total.toLocaleString()} ₪</h5>
              <button
                className="btn btn-success mt-3 w-100"
                onClick={handlePlaceOrder}
              >
                Place Order
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
};
export default Cart;
