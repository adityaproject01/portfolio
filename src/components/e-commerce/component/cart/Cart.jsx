import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import cartStyles from "./cart.module.css";

const Cart = () => {
  const token = localStorage.getItem("token");
  const [cartDetails, setCartDetails] = useState([]);
  const navigate = useNavigate();

  const fetchCart = useCallback(async () => {
    try {
      const response = await axios.get(
        "http://ecommercebackend-1-fwcd.onrender.com/api/cart",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setCartDetails(response.data);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  }, [token]); // token is dependency

  useEffect(() => {
    fetchCart();
  }, [fetchCart]); 

  useEffect(() => {
    if (cartDetails.length) {
      console.log("Cart items count:", cartDetails.length);
    }
  }, [cartDetails]);

  const handleBuyNow = () => {
    navigate("/ecommerce/home/place-order", { state: { cartItems: cartDetails } });
  };

  const handleQuantityChange = async (productId, newQuantity) => {
    try {
      await axios.put(
        `http://ecommercebackend-1-fwcd.onrender.com/api/cart/update/${productId}`,
        { quantity: newQuantity },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      fetchCart();
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  };

  const handleRemove = async (productId) => {
    try {
      await axios.delete(
        `http://ecommercebackend-1-fwcd.onrender.com/api/cart/remove/${productId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      fetchCart();
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  };

  const totalPrice = cartDetails.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className={cartStyles.cartBody}>
      <div className={cartStyles.cartContainer}>
        <div className={cartStyles.cartContainerNav}>
          <h2 className={cartStyles.heading}>Your Shopping Cart</h2>
        </div>

        {cartDetails.length === 0 ? (
          <div className={cartStyles.emptyMessage}>
            <p>Your cart is empty</p>
            <button
              className={cartStyles.cnt}
              onClick={() => navigate("/ecommerce/home")}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className={cartStyles.main}>
            <div className={cartStyles.cartContainer}>
              <div className={cartStyles.cartItems}>
                {cartDetails.map((item, index) => (
                  <div key={index} className={cartStyles.cartItem}>
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className={cartStyles.productImage}
                    />
                    <div className={cartStyles.itemDetails}>
                      <h4>{item.name}</h4>
                      <p>Price: ₹{item.price}</p>
                      <div className={cartStyles.quantity}>
                        <label>Qty: </label>
                        <select
                          value={item.quantity}
                          onChange={(e) =>
                            handleQuantityChange(
                              item.id,
                              parseInt(e.target.value)
                            )
                          }
                        >
                          {[...Array(10)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>
                              {i + 1}
                            </option>
                          ))}
                        </select>
                        <button
                          className={cartStyles.remove}
                          onClick={() => handleRemove(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className={cartStyles.cartSummary}>
                <div className={cartStyles.summaryItem}>
                  <p>Shipping Estimate</p>
                  <p>4 Days</p>
                </div>
                <div className={cartStyles.summaryItem}>
                  <p>Tax</p>
                  <p>₹100</p>
                </div>
                <div
                  className={`${cartStyles.summaryItem} ${cartStyles.discount}`}
                >
                  <p>Discount</p>
                  <p>-₹100</p>
                </div>
                <div className={cartStyles.grandTotal}>
                  <p>Total: ₹{totalPrice.toFixed(2)}</p>
                </div>

                <div className={cartStyles.cartButtons}>
                  <button
                    onClick={() => navigate("/ecommerce/home")}
                    className={cartStyles.continueShopping}
                  >
                    Continue Shopping
                  </button>
                  <button onClick={handleBuyNow} className={cartStyles.checkout}>
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
