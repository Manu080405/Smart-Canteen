import React, { useContext } from "react";
import "./CartItems.css";
import cross_icon from "../Assets/cart_cross_icon.png";
import { ShopContext } from "../../Context/ShopContext";
import { backend_url, currency } from "../../App";

const CartItems = () => {
  const { products, cartItems, removeFromCart, getTotalCartAmount, clearCart } = useContext(ShopContext);

  // Function to handle order submission
  const handleProceedToCheckout = async () => {
  try {
    const token = localStorage.getItem("auth-token"); // Get JWT token from localStorage

    if (!token) {
      alert("You must be logged in to place an order.");
      return;
    }

    const items = products
      .filter((e) => cartItems[e.id] > 0)
      .map((e) => ({
        productId: e.id,
        quantity: cartItems[e.id],
        price: e.new_price,
      }));

    if (items.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const totalPrice = getTotalCartAmount();

    const response = await fetch(`${backend_url}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token, // Add the auth-token header
      },
      body: JSON.stringify({ items, totalPrice }), // No userId in body
    });

    const data = await response.json();

    if (response.ok) {
      alert("Order placed successfully!");
      clearCart();
    } else {
      alert(data.error || "Failed to place order.");
    }
  } catch (error) {
    console.error("Error placing order:", error);
    alert("Something went wrong. Please try again.");
  }
};

  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {products.map((e) => {
        if (cartItems[e.id] > 0) {
          return (
            <div key={e.id}>
              <div className="cartitems-format-main cartitems-format">
                <img className="cartitems-product-icon" src={backend_url + e.image} alt="" />
                <p className="cartitems-product-title">{e.name}</p>
                <p>{currency}{e.new_price}</p>
                <button className="cartitems-quantity">{cartItems[e.id]}</button>
                <p>{currency}{e.new_price * cartItems[e.id]}</p>
                <img onClick={() => removeFromCart(e.id)} className="cartitems-remove-icon" src={cross_icon} alt="" />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}

      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>{currency}{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>{currency}{getTotalCartAmount()}</h3>
            </div>
          </div>
          <button onClick={handleProceedToCheckout}>PROCEED TO CHECKOUT</button>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
